<template>
  <div class="mt-10 lg:mt-15">
    <div class="flex items-center justify-between">
      <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">
        Entrypoints
      </div>

      <BaseSecondaryButton class="h-[52px]" @click="onShowModalAddEntrypoint">
        <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/plus.svg?raw`)"></div>
        Add Entrypoint
      </BaseSecondaryButton>
    </div>

    <div class="mt-3 lg:mt-4">
      <BaseTable :columns.sync="columns" :data-source="_entrypoints">
        <template #status="{ item }">
          <div>
            <div
              v-if="parseInt(item) === 1"
              class="
                w-[63px]
                inline-flex
                items-center
                rounded
                justify-center
                text-caption
                bg-accent-green
                text-white
                font-semibold
                py-1
              "
            >
              Enable
            </div>

            <div
              v-else
              class="
                w-[63px]
                inline-flex
                items-center
                rounded
                justify-center
                text-caption
                bg-accent-red
                text-white
                font-semibold
                py-1
              "
            >
              Disable
            </div>
          </div>
        </template>

        <template #action="{ record }">
          <div class="w-full inline-flex gap-3 items-center justify-end">
            <BasePopover class="flex items-center" content="Change entrypoint information" contentClass="w-[197px]">
              <BaseIconButton class="w-[36px] h-[36px]" icon="edit" @click="onShowModalUpdateEntrypoint(record)" />
            </BasePopover>

            <BasePopover
              class="flex items-center"
              content="Delete this entrypoint, if you don’t need it anymore."
              contentClass="w-[197px]"
            >
              <BaseIconButton class="w-[36px] h-[36px]" icon="delete" @click="onShowModalRemoveEntrypoint(record)" />
            </BasePopover>
          </div>
        </template>
      </BaseTable>
    </div>

    <DashboardModalAddEntrypoint
      :isAddNew="isAddNew"
      :loading.sync="loading"
      :visible.sync="showModalAddEntrypoint"
      :form.sync="form"
      @onSave="onSave"
    />

    <DashboardModalRemoveEntrypoint
      @onRemove="onRemoveEntrypoint"
      :loading.sync="loadingRemoveEntrypoint"
      :visible.sync="showModalRemoveEntrypoint"
      :id.sync="idRemoveEntrypoint"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-semibold',
    filter: 'text',
    filterInput: '',
    sort: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-semibold',
    filter: 'select',
    filterInput: 'all',
    filterSelectSource: [
      {
        name: 'All',
        value: 'all',
      },
    ],
    sort: true,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-semibold',
    filter: 'text',
    filterInput: '',
    sort: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '180px',
    slotScope: 'status',
    filter: 'select',
    filterInput: 'all',
    filterSelectSource: [
      {
        name: 'All',
        value: 'all',
      },
      {
        name: 'Enable',
        value: '1',
      },
      {
        name: 'Disable',
        value: '0',
      },
    ],
    sort: true,
  },
  {
    title: '',
    slotScope: 'action',
    width: '180px',
    sort: false,
  },
];
export default {
  name: 'DashboardApiEntrypoints',

  data() {
    return {
      columns,
      showModalAddEntrypoint: false,
      showModalRemoveEntrypoint: false,
      isAddNew: false,
      loading: false,
      loadingRemoveEntrypoint: false,
      idRemoveEntrypoint: null,
      form: {
        type: 'INFURA',
        priority: 0,
        status: 1,
      },
    };
  },

  created() {
    if (this.columns && this._providers.length > 0) {
      this.columns[1].filterSelectSource = [
        {
          name: 'All',
          value: 'all',
        },
        ...this._providers,
      ];
    }
  },

  computed: {
    ...mapGetters({
      api: 'api/value',
      getBlockchainByID: 'blockchains/getBlockchainByID',
      providers: 'providers/list',
    }),

    _blockchain() {
      return this.getBlockchainByID(this.api.blockchain) || null;
    },

    _entrypoints() {
      if (this.api && this.api.entrypoints && Array.isArray(this.api.entrypoints)) {
        return _.cloneDeep(this.api.entrypoints);
      }

      return [];
    },

    _providers() {
      return this.providers.map((item) => new Object({ value: item.type, name: item.type }));
    },
  },

  methods: {
    onShowModalAddEntrypoint() {
      this.isAddNew = true;
      this.showModalAddEntrypoint = true;
    },

    onShowModalUpdateEntrypoint(record) {
      this.form = { ...record };
      this.isAddNew = false;
      this.showModalAddEntrypoint = true;
    },

    onShowModalRemoveEntrypoint(record) {
      this.idRemoveEntrypoint = record.id;
      this.showModalRemoveEntrypoint = true;
    },

    async onRemoveEntrypoint(id) {
      this.loadingRemoveEntrypoint = true;

      let _api = _.cloneDeep(this.api);
      let _entrypoints = _.cloneDeep(_api.entrypoints);
      let index = _entrypoints.findIndex((item) => item.id === id);
      if (index !== -1) {
        _entrypoints.splice(index, 1);
        _api.entrypoints = _entrypoints;

        let result = await this.$store.dispatch('api/updateApi', _api);
        if (result) {
          this.showModalRemoveEntrypoint = false;
          this.idRemoveEntrypoint = false;
          this.$notify({ type: 'success', text: 'Update successful!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loadingRemoveEntrypoint = false;
    },

    async onSave(form) {
      this.loading = true;

      let _api = _.cloneDeep(this.api);
      let _entrypoints = _.cloneDeep(_api.entrypoints);
      if (this.isAddNew) {
        // Add new entrypoint
        if (_entrypoints && Array.isArray(_entrypoints)) {
          _entrypoints.push({ id: this.$dayjs().unix() * 1000, ...form });
        } else {
          _entrypoints = [{ id: this.$dayjs().unix() * 1000, ...form }];
        }
      } else {
        // Update entrypoint
        let index = _entrypoints.findIndex((item) => item.id === form.id);
        if (index !== -1) {
          let _entrypoint = _.cloneDeep(_entrypoints[index]);
          _entrypoints[index] = Object.assign(_entrypoint, form);
        }
      }

      let result = await this.$store.dispatch(
        'api/updateApi',
        Object.assign(_api, {
          entrypoints: _entrypoints,
        }),
      );
      if (result) {
        this.$notify({ type: 'success', text: 'New entrypoint has been successfully created!' });

        // Reset form
        this.form = {
          type: 'INFURA',
          priority: 0,
          status: 1,
        };

        this.showModalAddEntrypoint = false;
      } else {
        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }

      this.loading = false;
    },
  },
};
</script>

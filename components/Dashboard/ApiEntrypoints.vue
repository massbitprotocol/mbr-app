<template>
  <div class="mt-10 lg:mt-15">
    <div class="flex items-center justify-between">
      <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold">
        Entrypoints
      </div>

      <BaseSecondaryButton class="h-[52px]" @click="onShowModalAddEntrypoint">
        <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/plus.svg?raw`)"></div>
        Add Entrypoint
      </BaseSecondaryButton>
    </div>

    <div class="mt-3 lg:mt-4">
      <BaseTable :columns.sync="columns" :data-source="_entrypoints">
        <template #id="{ item }">
          <div class="text-base truncate">
            {{ item }}
          </div>
        </template>

        <template #status="{ item }">
          <div>
            <div
              v-if="parseInt(item) === 1"
              class="w-[63px] inline-flex items-center rounded justify-center text-caption bg-accent-green text-white font-medium py-1"
            >
              Enable
            </div>

            <div
              v-else
              class="w-[63px] inline-flex items-center rounded justify-center text-caption bg-accent-red text-white font-medium py-1"
            >
              Disable
            </div>
          </div>
        </template>

        <template #backup="{ item }">
          <div>
            <div
              v-if="parseInt(item) === 1"
              class="w-[63px] inline-flex items-center rounded justify-center text-caption bg-accent-green text-white font-medium py-1"
            >
              Enable
            </div>

            <div
              v-else
              class="w-[63px] inline-flex items-center rounded justify-center text-caption bg-accent-red text-white font-medium py-1"
            >
              Disable
            </div>
          </div>
        </template>

        <template #priority="{ item }">
          {{ item }}
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
import _ from 'lodash';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    slotScope: 'id',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-medium',
    filter: 'text',
    filterInput: '',
    sort: true,
  },
  {
    title: 'Provider',
    dataIndex: 'provider',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-medium',
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
    slotScope: 'priority',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-medium',
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
    title: 'Backup',
    dataIndex: 'backup',
    width: '180px',
    slotScope: 'backup',
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
        provider: 'MASSBIT',
        providerConfig: {},
        priority: 1,
        status: 1,
        backup: 0,
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

  watch: {
    showModalAddEntrypoint(isShow) {
      if (!isShow) {
        this.resetForm();
      }
    },
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
      this.form = _.cloneDeep(record);
      if (!this.form.backup) {
        // Init feild
        this.form.backup = 0;
      }

      this.isAddNew = false;
      this.showModalAddEntrypoint = true;
    },

    onShowModalRemoveEntrypoint(record) {
      this.idRemoveEntrypoint = record.id;
      this.showModalRemoveEntrypoint = true;
    },

    async onRemoveEntrypoint(id) {
      this.loadingRemoveEntrypoint = true;

      try {
        let { status } = await this.$axios.$delete(`/mbr/d-apis/entrypoint/${id}`);
        if (status) {
          this.showModalRemoveEntrypoint = false;
          this.idRemoveEntrypoint = false;

          this.$store.commit('api/removeEntrypoint', id);

          this.$notify({ type: 'success', text: 'Delete entrypoint successful!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          this.$notify({ type: 'error', text: Array.isArray(message) ? message[0] : message });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loadingRemoveEntrypoint = false;
    },

    async onSave(form) {
      this.loading = true;

      if (this.isAddNew) {
        // Add new entrypoint
        try {
          const _entrypoint = _.cloneDeep(form);
          const res = await this.$axios.$post(`/mbr/d-apis/entrypoint/${this.api.id}`, _entrypoint);
          if (res && res.id) {
            this.$notify({ type: 'success', text: 'New entrypoint has been successfully created!' });
            this.showModalAddEntrypoint = false;

            this.$store.commit('api/addEntrypoint', res);

            // Reset form
            this.resetForm();
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        } catch (error) {
          console.log('error :>> ', error);
          if (error.response && error.response.data) {
            const { message } = error.response.data;
            this.$notify({ type: 'error', text: Array.isArray(message) ? message[0] : message });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } else {
        // Update entrypoint
        try {
          const _entrypoint = _.cloneDeep(form);
          if (!_entrypoint.id) {
            this.$notify({ type: 'error', text: 'Cant not get entrypoint id' });
            this.loading = false;

            return;
          }
          const res = await this.$axios.$put(`/mbr/d-apis/entrypoint/${_entrypoint.id}`, _entrypoint);
          if (res && res.id) {
            this.$notify({ type: 'success', text: 'Update entrypoint has been successfully created!' });
            this.showModalAddEntrypoint = false;

            this.$store.commit('api/updateEntrypoint', res);

            // Reset form
            this.resetForm();
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        } catch (error) {
          console.log('error :>> ', error);
          if (error.response && error.response.data) {
            const { message } = error.response.data;
            this.$notify({ type: 'error', text: Array.isArray(message) ? message[0] : message });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      }

      this.loading = false;
    },

    resetForm() {
      this.form = {
        type: 'MASSBIT',
        priority: 1,
        status: 1,
        backup: 0,
        providerConfig: {},
      };
    },
  },
};
</script>

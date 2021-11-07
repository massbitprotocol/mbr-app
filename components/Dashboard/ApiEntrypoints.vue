<template>
  <div class="mt-10 lg:mt-15">
    <div class="flex items-center justify-between">
      <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">
        Entrypoints
      </div>

      <BaseSecondaryButton class="h-[52px]">
        <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/plus.svg?raw`)"></div>
        Add Entrypoint
      </BaseSecondaryButton>
    </div>

    <div class="mt-3 lg:mt-4">
      <BaseTable :columns.sync="columns" :data-source="dataSource">
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
      </BaseTable>
    </div>
  </div>
</template>

<script>
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
      {
        name: 'Custom',
        value: 'custom',
      },
      {
        name: 'Infura',
        value: 'infura',
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
const dataSource = [
  {
    id: '1635225559025',
    type: 'INFURA',
    priority: '5',
    status: 0,
  },
  {
    id: '1634884898243',
    type: 'CUSTOM',
    priority: '5',
    status: 1,
  },
  {
    id: '1634884658243',
    type: 'CUSTOM',
    priority: '4',
    status: 1,
  },
];
export default {
  name: 'DashboardApiEntrypoints',

  data() {
    return {
      columns,
      dataSource,
    };
  },
};
</script>

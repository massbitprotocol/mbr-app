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
      <BaseTable :columns="columns" :data-source="dataSource"> </BaseTable>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '180px',
    filter: 'text',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: '180px',
    filter: 'text',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    width: '180px',
    filter: 'text',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: '180px',
    filter: 'text',
  },
  {
    title: '',
    slotScope: 'action',
    width: '180px',
  },
];
const dataSource = [
  {
    id: '1635225559025',
    type: 'INFURA',
    priority: '5',
    status: true,
  },
  {
    id: '1634884898243',
    type: 'CUSTOM',
    priority: '5',
    status: true,
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

<template>
  <div class="min-h-screen py-15">
    <div class="flex items-center justify-between">
      <BaseHeader> community nodes </BaseHeader>

      <BaseSearchWithIcon />
    </div>

    <div class="mt-5">
      <BaseTable :columns.sync="columns" :data-source="items"> </BaseTable>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    slotScope: 'id',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-medium',
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    width: '180px',
    class: 'text-body-1 text-neutral-darker font-medium',
  },
  {
    title: 'Total staked',
    width: '180px',
    slotScope: 'totalStaked',
  },
  {
    title: '',
    slotScope: 'action',
    width: '180px',
  },
];

export default {
  async fetch() {
    const { items, links, meta } = await this.$axios.$get(`/mbr/community/nodes`);
    console.log('items :>> ', items);
    this.items = items;
    this.links = links;
    this.meta = meta;
  },

  data() {
    return {
      columns,
      items: [],
      meta: {
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0,
      },
      links: {
        first: '',
        last: '',
        next: '',
        previous: '',
      },
      loadingGetListNode: false,
    };
  },
};
</script>

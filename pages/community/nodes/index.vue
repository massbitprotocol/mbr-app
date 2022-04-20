<template>
  <div class="min-h-screen py-15">
    <div class="flex items-center justify-between">
      <BaseHeader> community nodes </BaseHeader>

      <BaseSearchWithIcon />
    </div>

    <div class="grid grid-cols-4 gap-5 mt-5">
      <BaseStatistic name="Current Era" :value="currentEra" />
      <BaseStatistic name="Active Nodes" :value="this.meta.totalItems" />
      <BaseStatistic name="Total Staker" :value="totalStaker" />
      <BaseStatistic name="Total Staked (MBT)" :value="totalStaked" />
    </div>

    <div class="mt-5">
      <BaseTable :columns.sync="columns" :data-source="items" :loading="loadingGetListNode">
        <template #totalStaked="{ record }">
          <div class="text-base truncate">
            {{ getTotalStaked(record) }}
          </div>
        </template>

        <template #action="{ record }">
          <BaseButton class="text-sm" type="primary" @click="handlerShowModalDelegate(record)"> Delegate </BaseButton>
        </template>
      </BaseTable>

      <BaseModalDelegate
        type="node"
        :visible.sync="showModalDelegate"
        :loading.sync="loadingDelegate"
        :provider="currentNode"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { stringToHex } from '@polkadot/util';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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
    align: 'right',
  },
];

export default {
  async fetch() {
    this.loadingGetListNode = true;

    const { items, links, meta } = await this.$axios.$get(`/mbr/community/nodes`);
    this.items = items;
    this.links = links;
    this.meta = meta;

    await this.subscribeGeneralEraInfo(this.currentEra);

    this.subscribeTotalStaker();

    this.loadingGetListNode = false;
  },

  computed: {
    ...mapState({
      communityUser: (state) => state['community-user'].currentUser,
      chainToken: (state) => state.chain.chainToken,
      currentEra: (state) => state.chain.currentEra,
      chainDecimal: (state) => state.chain.chainDecimal,
    }),
  },

  watch: {
    showModalDelegate(val) {
      if (!val) {
        this.currentNode = null;
      }
    },

    currentEra(val) {
      this.subscribeGeneralEraInfo(val);

      if (!this.unSubscribeTotalStaker) {
        this.subscribeTotalStaker();
      }
    },
  },

  data() {
    return {
      columns,
      unSubscribeGeneralEraInfo: null,
      unSubscribeTotalStaker: null,
      items: [],
      totalStaker: 0,
      totalStaked: 0,
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
      loadingDelegate: false,
      showModalDelegate: false,
      currentNode: null,
    };
  },

  methods: {
    getTotalStaked(node) {
      return '0';
    },

    handlerShowModalDelegate(node) {
      this.currentNode = node;
      this.showModalDelegate = true;
    },

    async subscribeGeneralEraInfo(val) {
      if (val) {
        if (this.unSubscribeGeneralEraInfo) {
          this.unSubscribeGeneralEraInfo();
        }

        this.unSubscribeGeneralEraInfo = await this.$polkadot.api.query.dapiStaking.generalEraInfo(val, (data) => {
          const staked = data.value.staked.toString();
          this.totalStaked = this.$utils.formatBalance(staked, this.chainDecimal);
        });
      }
    },

    async subscribeTotalStaker() {
      if (this.currentEra) {
        if (this.unSubscribeTotalStaker) {
          this.unSubscribeTotalStaker();
        }
        this.unSubscribeTotalStaker = await this.$polkadot.api.query.dapiStaking.ledger.entries((data) => {
          if (data && data.length > 0) {
            this.totalStaker = data.length;
          } else {
            this.totalStaker = 0;
          }
        });
      }
    },
  },

  destroyed() {
    if (this.unSubscribeGeneralEraInfo) {
      this.unSubscribeGeneralEraInfo();
    }

    if (this.unSubscribeTotalStaker) {
      this.unSubscribeTotalStaker();
    }
  },
};
</script>

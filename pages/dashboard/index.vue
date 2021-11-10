<template>
  <div class="min-h-[80vh] mx-auto w-full">
    <div class="text-2xl lg:text-medium-title text-neutral-darkset font-bold my-5 lg:my-10">Dashboard</div>
    <div class="flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2 mb-3 lg:mb-7.5">
      <div class="whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">
        YOUR API KEYS
      </div>

      <BaseButton class="w-full sm:w-auto h-[52px] flex items-center justify-center" @click="showModalCreateApi = true">
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
            fill="currentColor"
          />
        </svg>

        Create new API Key
      </BaseButton>
    </div>

    <div class="flex flex-col gap-y-2.5">
      <template v-for="(api, index) in apiList">
        <DashboardApiCard :key="index" :api="api" @updateApiStatus="(value) => updateApiStatus(api, value)" />
      </template>
    </div>

    <client-only>
      <template v-for="(chart, index) in charts">
        <DashboardApiChart
          class="my-10 lg:my-15"
          :key="index"
          :title="chart.name"
          :url="chart.url"
          :filters="chart.filters"
          :filter.sync="chart.filter"
        />
      </template>
    </client-only>

    <DashboardModalCreateApi :visible.sync="showModalCreateApi" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import chartConfig from '~/mixins/chartConfig';

export default {
  name: 'Index',
  middleware: ['auth'],
  auth: true,

  mixins: [chartConfig],

  async asyncData({ store }) {
    await store.dispatch('api/getListApi');
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
    };
  },

  computed: {
    ...mapGetters({
      apiList: 'api/list',
    }),
  },

  methods: {
    async updateApiStatus(api, checked) {
      let _api = _.cloneDeep(api);
      await this.$store.dispatch('api/updateApi', Object.assign(_api, { status: checked ? 1 : 0 }));
    },
  },
};
</script>

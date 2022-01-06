<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader class="bg-white" />

    <div class="relative overflow-auto h-(screen-92) lg:h-(screen-108)">
      <PortalTarget name="banner" />

      <main class="container mx-auto flex-auto mt-12">
        <Nuxt />
      </main>
    </div>

    <TheFooter />

    <PortalTarget name="sidebar" />

    <BaseNotification />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
const getConfig = () => import('~/config.json').then((res) => res);

export default {
  name: 'Dashboard',

  mode: 'out-in',

  async created() {
    if (this.providers.length === 0) {
      await this.initData();
    }
  },

  computed: {
    ...mapGetters({
      providers: 'providers/list',
    }),
  },

  methods: {
    ...mapMutations({
      setBlockchains: 'blockchains/setList',
      setproviders: 'providers/setList',
    }),

    async initData() {
      try {
        const data = await getConfig();
        if (data.blockchains) {
          this.setBlockchains(data.blockchains);
        }

        if (data.providers) {
          this.setproviders(data.providers);
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    },
  },
};
</script>

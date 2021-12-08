<template>
  <div class="flex flex-col min-h-screen">
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

export default {
  name: 'Wellcome',

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
        const data = await this.$axios.$get('config.json');
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

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader class="bg-white" />

    <PortalTarget name="breadcrumb" />

    <main class="container mx-auto flex-auto">
      <Nuxt />
    </main>

    <TheFooter />

    <PortalTarget name="sidebar" />

    <BaseNotification />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Default',

  mode: 'out-in',

  async created() {
    await this.initApi();

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

    async initApi() {
      try {
        const data = await this.$axios.$post(
          '/api/v1/hello',
          {},
          {
            headers: {
              mbrid: 1,
            },
          },
        );
        if (data) {
          this.$axios.defaults.headers.common = Object.assign({ mbrid: data }, this.$axios.defaults.headers.common);
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    },

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

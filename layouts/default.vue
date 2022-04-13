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
const getConfig = () => import('~/config.json').then((res) => res);

export default {
  name: 'Default',

  mode: 'out-in',

  computed: {
    ...mapGetters({
      providers: 'providers/list',
    }),
  },

  async created() {
    if (!this.$auth.loggedIn) {
      // this.$router.push({ name: 'login' });
      return;
    }

    if (this.$auth.user.status === 'init_user' || this.$auth.user.status === 'verify_email') {
      this.$router.push({ name: 'sign-up' });
      return;
    }

    if (this.providers.length === 0) {
      await this.initData();
    }

    this.$store.commit('initAppSuccess');
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

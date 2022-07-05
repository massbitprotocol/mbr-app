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
    if (['reset-password'].includes(this.$route.name)) {
      return;
    }

    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });
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

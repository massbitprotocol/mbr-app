export default {
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      console.log('app.$auth.loggedIn :>> ', app.$auth.loggedIn);
      if (app.$auth.loggedIn) {
        const data = await app.$axios.$get('config.json');
        if (data) {
          // Init blockchains
          if (data.blockchains) {
            commit('blockchains/setList', data.blockchains);
          }

          // Init providers
          if (data.providers) {
            commit('providers/setList', data.providers);
          }
        }
      }
    },
  },
};

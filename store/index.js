export default {
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      if (app.$auth.loggedIn) {
        console.log('nuxtServerInit =========================');
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

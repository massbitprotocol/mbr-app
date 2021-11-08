export default {
  actions: {
    async nuxtServerInit({ dispatch, $axios }, {}) {
      await dispatch('blockchains/getList');
    },
  },
};

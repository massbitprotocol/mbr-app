export default {
  async logout({ commit }) {
    const { result } = await this.$axios.$delete('/auth/logout');
    this.$auth.logout();

    return result;
  },

  async requestLoginWithWallet({ commit }, walletAddress) {
    const res = await this.$axios.$post('/auth/request-login', { walletAddress });

    return res;
  },

  async loginWithWallet({ commit }, payload) {
    const res = await this.$axios.$post('/auth/login/wallet', payload);

    return res;
  },

  async getProviderRewards({ commit }) {
    const res = await this.$axios.$get('/reward/provider');
    if (res) {
      commit('setProviderRewards', res);
      return res;
    }
    commit('setProviderRewards', []);
    return [];
  },

};

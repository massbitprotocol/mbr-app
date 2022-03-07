export default {
  async logout({ commit }) {
    const { result } = await this.$axios.$delete('/auth/logout');

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
};

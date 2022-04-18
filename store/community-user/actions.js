export default {
  async findCurrentUser({ commit }) {
    const communityAccount = this.$cookies.get('community_account');
    if (communityAccount) {
      const isEnable = await this.$polkadot.isEnableApp();
      if (isEnable) {
        const accounts = await this.$polkadot.getListAcount();
        if (accounts && accounts.length) {
          const account = accounts.find((item) => item.address === communityAccount);
          if (account) {
            commit('setCurrentUser', account);
            return account;
          }
        }
      }
    }

    commit('setCurrentUser', null);
    return null;
  },

  async setCurrentUser({ commit }, account) {
    this.$cookies.set('community_account', account.address);

    return account;
  },
};

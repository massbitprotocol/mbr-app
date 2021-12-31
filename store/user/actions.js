export default {
  async logout({ commit }) {
    const { result } = await this.$axios.$get('/api/v1?action=user.logout');

    return result;
  },
};

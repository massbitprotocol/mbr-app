export default {
  async logout({ commit }) {
    const { result } = await this.$axios.$delete('/auth/logout');

    return result;
  },
};

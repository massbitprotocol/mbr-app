export default {
  async getList({ commit }) {
    const data = await this.$axios.$get('config.json');
    if (data) {
      commit('setList', data);

      return data;
    }

    return [];
  },
};

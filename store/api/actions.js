export default {
  async getListApi({ commit }) {
    const { data, result } = await this.$axios.$get('/api/v1?action=api.list');
    if (result) {
      commit('setList', data);

      return data;
    }

    commit('setList', []);
    return [];
  },
};

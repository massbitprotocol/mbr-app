export default {
  async getListProject({ commit }) {
    const res = await this.$axios.$get('/mbr/d-apis/project/list');
    if (res) {
      commit('setList', res);

      return res;
    }

    commit('setList', []);
    return [];
  },

  async getProject({ commit }, id) {
    const res = await this.$axios.$get(`/mbr/d-apis/project/${id}`);
    if (res) {
      commit('setProject', res);

      return res;
    }

    commit('setProject', null);
    return null;
  },
};

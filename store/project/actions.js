export default {
  async getListProject({ commit }) {
    const res = await this.$axios.$get('/mbr/d-api/project/list');
    if (res) {
      commit('setList', res);

      return res;
    }

    commit('setList', []);
    return [];
  },

  async getProject({ commit }, id) {
    const res = await this.$axios.$get(`/mbr/d-api/project/${id}`);
    if (res) {
      commit('setProject', res);

      return res;
    }

    commit('setProject', null);
    return null;
  },
};

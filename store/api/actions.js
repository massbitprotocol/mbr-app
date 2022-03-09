export default {
  async getListApi({ commit }, projectId) {
    const res = await this.$axios.$get(`/mbr/d-apis/list/${projectId}`);
    if (res && res.length) {
      commit('setList', res);

      return res;
    }

    commit('setList', []);
    return [];
  },

  async getApi({ commit }, id) {
    const res = await this.$axios.$get(`/mbr/d-apis/${id}`);
    if (res) {
      commit('setApi', res);

      return res;
    }

    commit('setApi', null);
    return null;
  },

  async updateApi({ commit }, api) {
    const res = await this.$axios.$put(`/mbr/d-apis/${api.id}`, api);
    if (res) {
      commit('updateApi', res);

      return res;
    }

    return null;
  },
};

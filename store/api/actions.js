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
    const { result } = await this.$axios.$post('/api/v1?action=api.update', api);
    if (result) {
      commit('updateApi', api);
    }

    return result;
  },
};

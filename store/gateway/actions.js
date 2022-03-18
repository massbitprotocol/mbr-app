export default {
  async getListApi({ commit }, paramString = '?limit=5') {
    const res = await this.$axios.$get(`/mbr/gateway/list${paramString}`);
    if (res) {
      commit('setListWithStaging', res);

      return res;
    }

    commit('setList', []);
    return [];
  },

  async getApi({ commit }, id) {
    const res = await this.$axios.$get(`/mbr/gateway/${id}`);
    if (res) {
      commit('setApi', res);

      return res;
    }

    commit('setApi', null);
    return null;
  },

  async getZoneSummary({ commit }) {
    const data = await this.$axios.$get(`/mbr/gateway/arrangement`);
    if (data) {
      commit('updateZonesValue', data);

      return data;
    }

    return null;
  },

  async updateApi({ commit }, api) {
    const result = await this.$axios.$put(`/mbr/gateway/${api.id}`, api);
    if (result.id) {
      commit('updateApi', result);
    }

    return result;
  },

  async reVerify({ commit }, api) {
    const result = await this.$axios.$get(`/mbr/gateway/${api.id}/re-verify`, api);
    if (result.error) {
      throw new Error(result.error);
    }

    if (result.id) {
      commit('updateApi', result);
    }

    return result;
  },
};

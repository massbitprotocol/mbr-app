export default {
  async getListApi({ commit }, paramString = '?limit=6') {
    const res = await this.$axios.$get(`/mbr/node/list${paramString}`);
    if (res) {
      commit('setListWithStaging', res);

      return res;
    }

    commit('setList', []);
    return [];
  },

  async getApi({ commit }, id) {
    const res = await this.$axios.$get(`/mbr/node/${id}`);
    if (res) {
      commit('setApi', res);

      return res;
    }

    commit('setApi', null);
    return null;
  },

  async getZoneSummary({ commit }) {
    const data = await this.$axios.$get(`/mbr/node/arrangement`);
    if (data) {
      commit('updateZonesValue', data);

      return data;
    }

    return null;
  },

  async updateApi({ commit }, api) {
    const result = await this.$axios.$put(`/mbr/node/${api.id}`, api);
    if (result.id) {
      commit('updateApi', result);
    }

    return result;
  },

  async deleteApi({ commit }, id) {
    const result = await this.$axios.$delete(`/mbr/node/${id}`);
    if (result) {
      commit('deleteApi', id);
    }

    return result.status || false;
  },

  async reVerify({ commit }, api) {
    const result = await this.$axios.$get(`/mbr/node/${api.id}/re-verify`, api);
    if (result.error) {
      throw new Error(result.error);
    }

    if (result.id) {
      commit('updateApi', result);
    }

    return result;
  },
};

export default {
  async getListApi({ commit }) {
    const res = await this.$axios.$get('/mbr/node/list');
    if (res) {
      commit('setList', res);

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
    const { data, result } = await this.$axios.$get('/api/v1?action=node.geonodecontinent');
    if (result) {
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
};

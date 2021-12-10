export default {
  async getListApi({ commit }) {
    const { data, result } = await this.$axios.$get('/api/v1', { params: { action: 'node.list' } });
    if (result) {
      commit('setList', data);

      return data;
    }

    commit('setList', []);
    return [];
  },

  async getApi({ commit }, id) {
    const { data, result } = await this.$axios.$get('/api/v1?action=node.get', { params: { id } });
    if (result) {
      commit('setApi', data);

      return data;
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
    const { result } = await this.$axios.$post('/api/v1?action=node.update', api);
    if (result) {
      commit('updateApi', api);
    }

    return result;
  },
};

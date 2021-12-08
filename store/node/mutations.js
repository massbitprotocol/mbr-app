export default {
  setList(state, list) {
    state.list = list;
  },

  setApi(state, api) {
    state.api = api;
  },

  updateApi(state, api) {
    // Update current api
    state.api = api;

    // Update list
    let _list = _.cloneDeep(state.list);
    const index = _list.findIndex((item) => item.api_key === api.api_key);
    if (index >= 0) {
      _list[index] = api;
    }
    state.list = _list;
  },
};

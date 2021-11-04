export default {
  setList(state, list) {
    state.list = list;
  },

  updateApi(state, api) {
    let _list = _.cloneDeep(state.list);
    const index = _list.findIndex((item) => item.api_key === api.api_key);
    if (index >= 0) {
      _list[index] = api;
    }

    state.list = _list;
  },
};

import _ from 'lodash';

export default {
  setList(state, list) {
    const _list = _.cloneDeep(list);

    state.list = _list;
  },

  setApi(state, api) {
    const _api = _.cloneDeep(api);
    state.api = _api;
  },

  setListWithStaging(state, { dApis, meta, links }) {
    state.list = dApis;
    state.meta = meta;
    state.links = links;
  },

  addEntrypoint(state, entrypoint) {
    const _entrypoint = _.cloneDeep(entrypoint);
    const _api = _.cloneDeep(state.api);
    if (_api.entrypoints) {
      _api.entrypoints.push(_entrypoint);
    } else {
      _api.entrypoints = [_entrypoint];
    }

    state.api = _api;
  },

  updateEntrypoint(state, entrypoint) {
    const _entrypoint = _.cloneDeep(entrypoint);
    const _api = _.cloneDeep(state.api);

    const _entrypointIndex = _api.entrypoints.findIndex((cEntrypoint) => cEntrypoint.id === _entrypoint.id);
    if (_entrypointIndex >= 0) {
      _api.entrypoints[_entrypointIndex] = _entrypoint;
    }

    state.api = _api;
  },

  removeEntrypoint(state, id) {
    const _api = _.cloneDeep(state.api);

    const _entrypointIndex = _api.entrypoints.findIndex((cEntrypoint) => cEntrypoint.id === id);
    if (_entrypointIndex >= 0) {
      _api.entrypoints.splice(_entrypointIndex, 1);
    }

    state.api = _api;
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

  deleteApi(state, id) {
    // Update current api
    state.api = null;

    // Update list
    let _list = _.cloneDeep(state.list);
    const index = _list.findIndex((item) => item.id === id);
    if (index >= 0) {
      _list.splice(index, 1);
    }
    state.list = _list;
  },
};

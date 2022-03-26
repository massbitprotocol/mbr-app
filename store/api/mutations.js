import _ from 'lodash';

export default {
  setList(state, list) {
    state.list = list;
  },

  setApi(state, api) {
    const _api = _.cloneDeep(api);
    state.api = _api;
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
};

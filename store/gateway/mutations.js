export default {
  setListWithStaging(state, { gateways, meta, links }) {
    state.list = gateways;
    state.meta = meta;
    state.links = links;
  },

  setList(state, list) {
    state.list = list;
  },

  setApi(state, api) {
    state.api = api;
  },

  setZones(state, zones) {
    state.zones = zones;
  },

  updateZonesValue(state, zonesSummary) {
    let _zones = _.cloneDeep(state.zones);
    _zones.map((zone) => {
      if (Object.hasOwnProperty.call(zonesSummary, zone.key)) {
        zone.value = zonesSummary[zone.key];
      }
      return zone;
    });

    state.zones = _zones;
  },

  updateApi(state, api) {
    // Update current api
    state.api = api;

    // Update list
    let _list = _.cloneDeep(state.list);
    const index = _list.findIndex((item) => item.id === api.id);
    if (index >= 0) {
      _list[index] = api;
    }
    state.list = _list;
  },
};

import _ from 'lodash';

export default {
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
    console.log('updateZonesValue :>> ', zonesSummary);
    _zones.map((zone) => {
      if (Object.hasOwnProperty.call(zonesSummary, zone.key)) {
        console.log('ok -----------------------------');
        zone.value = zonesSummary[zone.key];
      }
      console.log('zone :>> ', zone);
      return zone;
    });

    console.log('_zones :>> ', _zones);

    state.zones = _zones;
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

<template>
  <div class="min-h-[80vh] mx-auto w-full">
    <Portal to="banner" tag="div">
      <div class="bg-banner-node-pattern bg-neutral-darker h-[268px] flex items-center justify-center">
        <div class="container mx-auto">
          <div class="text-title-1 md:text-medium-title text-neutral-white font-bold">Welcome to Community Nodes</div>

          <div class="mt-2 text-body-1 md:text-heading-2 font-medium text-primary-background">Content</div>
        </div>
      </div>
    </Portal>

    <div class="flex flex-col md:flex-row items-start md:items-center flex-wrap justify-between gap-2 mb-3 lg:mb-7.5">
      <div
        class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
      >
        Zone
      </div>
    </div>

    <div id="chartdiv" class="w-full h-[500px] b-primary-background rounded"></div>

    <div
      class="
        mt-7.5
        flex flex-col
        md:flex-row
        items-start
        md:items-center
        flex-wrap
        justify-between
        gap-2
        mb-3
        lg:mb-7.5
      "
    >
      <div
        class="uppercase whitespace-nowrap text-heading-2 lg:text-title-2 text-neutral-darkset font-medium lg:font-bold"
      >
        Your Nodes
      </div>

      <BaseButton class="w-full sm:w-auto h-[52px] flex items-center justify-center" @click="showModalCreateApi = true">
        <svg class="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
            fill="currentColor"
          />
        </svg>

        Add Node
      </BaseButton>
    </div>

    <div v-if="$fetchState.pending" class="w-full h-[45vh] flex items-center justify-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <div class="text-body-1 font-medium text-neutral-darkset">Loading...</div>
    </div>

    <div v-else>
      <div class="flex flex-col gap-y-2.5">
        <template v-for="(api, index) in apiList">
          <NodeDashboardApiCard :key="index" :api="api" @updateApiStatus="(value) => updateApiStatus(api, value)" />
        </template>
      </div>

      <template v-for="(chart, index) in charts">
        <NodeDashboardApiChart
          class="my-10 lg:my-15"
          :key="index"
          :title="chart.name"
          :url="chart.url"
          :filters="chart.filters"
          :filter.sync="chart.filter"
        />
      </template>

      <NodeDashboardModalCreateApi :visible.sync="showModalCreateApi" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';

import continentsLow from '@amcharts/amcharts5-geodata/continentsLow';

import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import chartConfig from '~/mixins/chartConfig';

export default {
  name: 'Index',
  middleware: ['auth'],
  auth: true,

  layout: 'dashboard',

  mixins: [chartConfig],

  async fetch() {
    await this.$store.dispatch('api/getListApi');
  },

  data() {
    return {
      apis: [],
      showModalCreateApi: false,
    };
  },

  mounted() {
    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        wheelX: 'none',
        wheelY: 'none',
        projection: am5map.geoNaturalEarth1(),
      }),
    );

    // Create polygon background
    // let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    // backgroundSeries.mapPolygons.template.setAll({
    //   fill: am5.color('#4D5795'),
    //   fillOpacity: 1,
    //   strokeOpacity: 0,
    // });
    // backgroundSeries.data.push({
    //   geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    // });

    // Create polygon series
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: continentsLow,
        exclude: ['antarctica', 'africa'],
      }),
    );
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color('#4D5795'),
      stroke: am5.color(0xd4f1f9),
    });
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color('#050C72'),
    });
    polygonSeries.mapPolygons.template.events.on('click', this.onClickContinent);

    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    var colorSet = am5.ColorSet.new(root, { step: 2 });
    pointSeries.bullets.push(function (root, series, dataItem) {
      var value = dataItem.dataContext.value;

      var container = am5.Container.new(root, {});
      var color = colorSet.next();
      var radius = 15 + (value / 20) * 20;
      var circle = container.children.push(
        am5.Circle.new(root, {
          radius: radius,
          fill: color,
          dy: -radius * 2,
        }),
      );

      var pole = container.children.push(
        am5.Line.new(root, {
          stroke: color,
          height: -40,
          strokeGradient: am5.LinearGradient.new(root, {
            stops: [{ opacity: 1 }, { opacity: 1 }, { opacity: 0 }],
          }),
        }),
      );

      var label = container.children.push(
        am5.Label.new(root, {
          text: value,
          fill: am5.color(0xffffff),
          fontWeight: '400',
          centerX: am5.p50,
          centerY: am5.p50,
          dy: -radius * 2,
        }),
      );

      var titleLabel = container.children.push(
        am5.Label.new(root, {
          text: dataItem.dataContext.title,
          fill: color,
          fontWeight: '500',
          fontSize: '1em',
          centerY: am5.p50,
          dy: -radius * 2,
          dx: radius,
        }),
      );

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    var data = [
      {
        title: 'United States',
        latitude: 39.563353,
        longitude: -99.316406,
        value: 12,
      },
      {
        title: 'European Union',
        latitude: 50.896104,
        longitude: 19.160156,
        value: 15,
      },
      {
        title: 'Asia',
        latitude: 47.212106,
        longitude: 103.183594,
        value: 1,
      },
    ];

    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      pointSeries.data.push({
        geometry: { type: 'Point', coordinates: [d.longitude, d.latitude] },
        title: d.title,
        value: d.value,
      });
    }
  },

  computed: {
    ...mapGetters({
      apiList: 'api/list',
    }),
  },

  methods: {
    async updateApiStatus(api, checked) {
      let _api = _.cloneDeep(api);
      await this.$store.dispatch('api/updateApi', Object.assign(_api, { status: checked ? 1 : 0 }));
    },

    onClickContinent(event) {
      console.log('here =======================', event.target.dataItem.dataContext.id);
      this.showModalCreateApi = true;
    },
  },
};
</script>

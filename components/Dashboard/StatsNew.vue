<template>
  <div>
    <div class="w-full flex items-center justify-between">
      <div class="uppercase text-heading-2 text-neutral-darkset font-medium">
        {{ title }}
      </div>

      <select
        v-model="_filter"
        class="h-[44px] px-5 cursor-pointer border border-primary-background rounded-xl text-body-2 text-neutral-darker font-medium"
      >
        <template v-for="item in filters">
          <option :key="item.value" :value="item.value">{{ item.name }}</option>
        </template>
      </select>
    </div>

    <div class="w-full h-[50vh] mt-7.5">
      <!--
      <iframe style="width: 100%; height: 100%" frameborder="0" ref="iframeChart" :src="chartUrL"></iframe>
      -->
      <div class="w-full h-[50vh] mt-7.5" ref="chartdiv"></div>
    </div>
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import _ from 'lodash';
export default {
  name: 'DashboardStatsNew',

  props: {
    title: {
      type: String,
      default: '',
    },

    url: {
      type: String,
      required: true,
    },

    filters: {
      type: Array,
      default: () => [],
    },

    filter: {
      type: String,
      default: '',
    },

    params: {
      type: Object,
      default: () => ({}),
    },

    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    dataSource: function(newVal) {
      //console.log(newVal);
      this.series.data.setAll(newVal);
    },
  },
  data() {
    return {
      pollBandwidth: null,
      root: null,
      totalBandwidths: 0,
    };
  },

  async created() {},

  mounted() {
    this.createChart();
  },
  beforeUpdate() {

  },
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    _filter: {
      get() {
        return this.filter;
      },
      set(value) {
        this.$emit('update:filter', value);
      },
    },

    parsedFilter() {
      let parsedFilter = this._filter.split('|');
      return [parsedFilter[0] || '', parsedFilter[1] || ''];
    },

    chartUrL() {
      if (Object.keys(this.params).length > 0) {
        let _url = this.url;
        let step = 0;
        for (const key in this.params) {
          if (Object.hasOwnProperty.call(this.params, key)) {
            const value = this.params[key];
            let paramPath = step === 0 ? '?' : '&';
            _url += `${paramPath}${key}=${value}`;

            step++;
          }
        }

        return `${_url}&from=${this.parsedFilter[0]}&to=${this.parsedFilter[1]}`;
      }

      return `${this.url}&from=${this.parsedFilter[0]}&to=${this.parsedFilter[1]}`;
    },
  },
  methods: {
    createChart() {
      const root = am5.Root.new(this.$refs.chartdiv);

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          focusable: true,
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
          pinchZoomX: true,
        }),
      );
      const easing = am5.ease.linear;

      // Create axes
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.1,
          groupData: false,
          baseInterval: {
            timeUnit: 'second',
            count: 300,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
          }),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.2,
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      );
      const tooltip = am5.Tooltip.new(root, {
        pointerOrientation: 'horizontal',
        labelText: '{valueY}/' + this.params.unit,
      })
      // Add series
      this.series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Bandwidth',
          minBulletDistance: 10,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          tooltip,
          stroke: am5.color('#2C3ACF'),
          fill: am5.color('#2C3ACF'),
          connect: true,
        }),
      );

      this.series.get('tooltip').adapters.add('visible', function (visible, target) {
        return target.dataItem && target.dataItem.dataContext.value > 0;
      });
      this.series.strokes.template.setAll({
        forceHidden: true,
      });
      this.series.fills.template.setAll({
        fillOpacity: 0.6,
        visible: true,
      });

      const bandwidth = _.cloneDeep(this.dataSource);
      this.totalBandwidths = am5.math.round(bandwidth.length ? bandwidth[bandwidth.length - 1].value : 0, 2);
      this.series.data.setAll(bandwidth);

      // Add cursor
      const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          xAxis: xAxis,
          behavior: 'none',
        }),
      );
      cursor.lineY.set('visible', false);
    },
  },
  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

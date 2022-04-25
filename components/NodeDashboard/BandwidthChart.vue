<template>
  <div class="mt-5 lg:mt-7.5 relative">
    <div class="w-full flex items-center justify-between">
      <div class="uppercase text-heading-2 text-neutral-darkset font-medium">Bandwidth</div>
    </div>

    <div class="w-full h-[50vh] mt-7.5" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import _ from 'lodash';

export default {
  name: 'BandwidthChart',

  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      pollBandwidth: null,
      root: null,
    };
  },

  async created() {},

  mounted() {
    this.startStat();
    this.syncBandwidth();
  },

  computed: {
    id() {
      return this.$route.params.id || null;
    },
  },

  methods: {
    startStat() {
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
          extraMax: 0.1,
          extraMin: -0.1,
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

      // Add series
      this.series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Bandwidth',
          minBulletDistance: 10,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '[bold]{name}[/]: {valueY}/Mbps',
          }),
          stroke: am5.color('#2C3ACF'),
          fill: am5.color('#2C3ACF'),
          connect: false,
        }),
      );

      this.series.fills.template.setAll({
        fillOpacity: 0.4,
        visible: true,
      });

      this.series.strokes.template.setAll({
        strokeWidth: 1.5,
        strokeOpacity: 0.7,
      });
      this.series.bullets.push(function (root, series, dataItem) {
        // only create sprite if bullet == true in data context
        if (dataItem.dataContext.bullet) {
          var container = am5.Container.new(root, {});
          var circle0 = container.children.push(
            am5.Circle.new(root, {
              radius: 2,
              fill: am5.color('#EB5757'),
            }),
          );
          var circle1 = container.children.push(
            am5.Circle.new(root, {
              radius: 2,
              fill: am5.color('#EB5757'),
            }),
          );

          circle1.animate({
            key: 'radius',
            to: 5,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity,
          });
          circle1.animate({
            key: 'opacity',
            to: 0,
            from: 1,
            duration: 1000,
            easing: am5.ease.out(am5.ease.cubic),
            loops: Infinity,
          });

          return am5.Bullet.new(root, {
            locationX: undefined,
            sprite: container,
          });
        }
      });
      this.series.data.setAll(this.dataSource);

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

    syncBandwidth() {
      const EventSource = EventSourcePolyfill || NativeEventSource;
      this.pollBandwidth = new EventSource(`${this.$config.portalURL}/mbr/node/stat/sse/${this.id}/bandwidth`, {
        headers: { Authorization: this.$auth.strategy.token.get() },
      });
      this.pollBandwidth.onmessage = ({ data }) => {
        const bandwidth = JSON.parse(data);
        if (bandwidth) {
          bandwidth[bandwidth.length - 1].bullet = true;
          this.series.data.setAll(bandwidth);
        }
      };
    },
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }

    if (this.pollBandwidth) {
      this.pollBandwidth.close();
    }
  },
};
</script>

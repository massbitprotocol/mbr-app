<template>
  <div class="mt-5 lg:mt-7.5">
    <div class="w-full flex items-center justify-between">
      <div class="text-heading-2 text-neutral-darkset font-medium">
        <span class="uppercase"> Request per seccond </span>
        <div>
          <h1 class="text-3xl font-bold text-primary mt-2">
            {{ totalRequests }}
            <span class="text-body-1 font-medium"> Req/s </span>
          </h1>
        </div>
      </div>
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

const listSeries = [
  {
    config: {
      name: '1xx',
      minBulletDistance: 10,
      valueYField: 'value',
      valueXField: 'date',
      stroke: am5.color('#2C3ACF'),
      fill: am5.color('#27319B'),
    },
    resource: null,
  },
  {
    config: {
      name: '2xx',
      minBulletDistance: 10,
      valueYField: 'value',
      valueXField: 'date',
      stroke: am5.color('#00B159'),
      fill: am5.color('#00B159'),
    },
    resource: null,
  },
  {
    config: {
      name: '3xx',
      minBulletDistance: 10,
      valueYField: 'value',
      valueXField: 'date',
      stroke: am5.color('#FBAF1D'),
      fill: am5.color('#FBAF1D'),
    },
    resource: null,
  },
  {
    config: {
      name: '4xx',
      minBulletDistance: 10,
      valueYField: 'value',
      valueXField: 'date',
      stroke: am5.color('#EB5757'),
      fill: am5.color('#EB5757'),
    },
    resource: null,
  },
  {
    config: {
      name: '5xx',
      minBulletDistance: 10,
      valueYField: 'value',
      valueXField: 'date',
      stroke: am5.color('#EB5757'),
      fill: am5.color('#EB5757'),
    },
    resource: null,
  },
  // {
  //   config: {
  //     name: 'total',
  //     minBulletDistance: 10,
  //     valueYField: 'value',
  //     valueXField: 'date',
  //     stroke: am5.color('#E9EBFA'),
  //     fill: am5.color('#E9EBFA'),
  //   },
  //   resource: null,
  // },
];
export default {
  name: 'RequestChart',

  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      pollRequest: null,
      root: null,
      listSeries,
      totalRequests: 0,
    };
  },

  mounted() {
    this.startStat();
    this.syncRequests();
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
          panY: false,
          wheelY: 'zoomX',
          layout: root.verticalLayout,
        }),
      );

      // Create axes
      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.1,
          groupData: false,
          baseInterval: {
            timeUnit: 'second',
            count: 345,
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        }),
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.2,
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      );

      for (let index = 0; index < this.listSeries.length; index++) {
        let series = this.listSeries[index];
        // Add series total
        series['resource'] = chart.series.push(
          am5xy.LineSeries.new(root, {
            ...series.config,
            stacked: true,
            xAxis,
            yAxis,
            legendValueText: '{valueY}',
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: 'horizontal',
              labelText: '[bold]Code {name}[/] {valueY} Req/s',
            }),
          }),
        );
        series['resource'].get('tooltip').adapters.add('visible', function (visible, target) {
          return target.dataItem && target.dataItem.dataContext.value > 0;
        });
        series['resource'].strokes.template.setAll({
          forceHidden: true,
        });
        series['resource'].fills.template.setAll({
          fillOpacity: 0.6,
          visible: true,
        });

        const totalSource = this.dataSource.find((item) => item.name === 'total');
        if (totalSource) {
          this.totalRequests = am5.math.round(
            totalSource.values.length ? totalSource.values[totalSource.values.length - 1].value : 0,
            2,
          );
        }

        const dataSource = this.dataSource.find((item) => item.name === series.config.name);
        if (dataSource) {
          series.resource.data.setAll(dataSource.values);
        }
        series['resource'].appear();
      }

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

    syncRequests() {
      const EventSource = EventSourcePolyfill || NativeEventSource;
      this.pollRequest = new EventSource(`${this.$config.portalURL}/mbr/node/stat/sse/${this.id}/requests`, {
        headers: { Authorization: this.$auth.strategy.token.get() },
      });
      this.pollRequest.onmessage = ({ data }) => {
        const requests = JSON.parse(data);
        if (requests) {
          for (const request of requests) {
            if (request.name === 'total') {
              this.totalRequests = am5.math.round(
                request.values.length ? request.values[request.values.length - 1].value : 0,
                2,
              );
            }
            const series = this.listSeries.find(({ config }) => config.name === request.name);
            if (series) {
              series.resource.data.setAll(request.values);
            }
          }
        }
      };
    },
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }

    if (this.pollRequest) {
      this.pollRequest.close();
    }
  },
};
</script>

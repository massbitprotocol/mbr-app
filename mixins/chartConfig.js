const charts = [
  {
    name: 'Total Requests',
    url: `${this.$config.statURL}/__internal_grafana/d-solo/YUv28Os7k/mbrg?orgId=1&theme=light&var-Instance=All&var-FilterName=All&var-Filter=All&panelId=6`,

    filter: 'now|now-6h',
  }, // Total Requests
  {
    name: 'Total Bandwidth',
    url: `${this.$config.statURL}/__internal_grafana/d-solo/YUv28Os7k/mbrg?orgId=1&theme=light&var-Instance=All&var-FilterName=All&var-Filter=All&panelId=8`,
    filters: [
      {
        name: 'Last 5 Minutes',
        value: 'now|now-5m',
      },
      {
        name: 'Last 30 Minutes',
        value: 'now|now-30m',
      },
      {
        name: 'Last 1 Hour',
        value: 'now|now-1h',
      },
      {
        name: 'Last 6 Hour',
        value: 'now|now-6h',
      },
      {
        name: 'Last 12 Hour',
        value: 'now|now-12h',
      },
      {
        name: 'Last 24 Hour',
        value: 'now|now-24h',
      },
      {
        name: 'Last 2 Days',
        value: 'now|now-2d',
      },
      {
        name: 'Last 7 Days',
        value: 'now|now-7d',
      },
      {
        name: 'Last 30 Days',
        value: 'now|now-30d',
      },
      {
        name: 'Last 90 Days',
        value: 'now|now-90d',
      },
      {
        name: 'Last 6 Months',
        value: 'now|now-6M',
      },
      {
        name: 'Last 1 Year',
        value: 'now|now-1y',
      },
      {
        name: 'Last 2 Year',
        value: 'now|now-2y',
      },
      {
        name: 'Last 5 Year',
        value: 'now|now-5y',
      },
      {
        name: 'Yesterday',
        value: 'now-1d/d|now-1d/d',
      },
      {
        name: 'Day Before Yesterday',
        value: 'now-2d/d|now-2d/d',
      },
      {
        name: 'This Day Last Week',
        value: 'now-7d/d|now-7d/d',
      },
      {
        name: 'Previous Week',
        value: 'now-1w/w|now-1w/w',
      },
      {
        name: 'Previous Month',
        value: 'now-1M/M|now-1M/M',
      },
      {
        name: 'Previous Year',
        value: 'now-1y/y|now-1y/y',
      },
      {
        name: 'Today',
        value: 'now/d|now/d',
      },
      {
        name: 'Today so far',
        value: 'now|now/d',
      },
      {
        name: 'This Week',
        value: 'now/w|now/w',
      },
      {
        name: 'This Week so far',
        value: 'now|now/w',
      },
      {
        name: 'This Month',
        value: 'now/M|now/M',
      },
      {
        name: 'This Month so far',
        value: 'now|now/M',
      },
      {
        name: 'This Year',
        value: 'now/y|now/y',
      },
      {
        name: 'This Year so far',
        value: 'now|now/y',
      },
    ],
    filter: 'now|now-6h',
  }, // Total Bandwidth
  {
    name: 'Response time',
    url: `${this.$config.statURL}/__internal_grafana/d-solo/6y_ACGKnk/sitestat?orgId=1&var-Instance=All&var-Host=p3v1vkrvkz89.eth-mainnet.massbitroute.com&panelId=6`,
    filters: [
      {
        name: 'Last 5 Minutes',
        value: 'now|now-5m',
      },
      {
        name: 'Last 30 Minutes',
        value: 'now|now-30m',
      },
      {
        name: 'Last 1 Hour',
        value: 'now|now-1h',
      },
      {
        name: 'Last 6 Hour',
        value: 'now|now-6h',
      },
      {
        name: 'Last 12 Hour',
        value: 'now|now-12h',
      },
      {
        name: 'Last 24 Hour',
        value: 'now|now-24h',
      },
      {
        name: 'Last 2 Days',
        value: 'now|now-2d',
      },
      {
        name: 'Last 7 Days',
        value: 'now|now-7d',
      },
      {
        name: 'Last 30 Days',
        value: 'now|now-30d',
      },
      {
        name: 'Last 90 Days',
        value: 'now|now-90d',
      },
      {
        name: 'Last 6 Months',
        value: 'now|now-6M',
      },
      {
        name: 'Last 1 Year',
        value: 'now|now-1y',
      },
      {
        name: 'Last 2 Year',
        value: 'now|now-2y',
      },
      {
        name: 'Last 5 Year',
        value: 'now|now-5y',
      },
      {
        name: 'Yesterday',
        value: 'now-1d/d|now-1d/d',
      },
      {
        name: 'Day Before Yesterday',
        value: 'now-2d/d|now-2d/d',
      },
      {
        name: 'This Day Last Week',
        value: 'now-7d/d|now-7d/d',
      },
      {
        name: 'Previous Week',
        value: 'now-1w/w|now-1w/w',
      },
      {
        name: 'Previous Month',
        value: 'now-1M/M|now-1M/M',
      },
      {
        name: 'Previous Year',
        value: 'now-1y/y|now-1y/y',
      },
      {
        name: 'Today',
        value: 'now/d|now/d',
      },
      {
        name: 'Today so far',
        value: 'now|now/d',
      },
      {
        name: 'This Week',
        value: 'now/w|now/w',
      },
      {
        name: 'This Week so far',
        value: 'now|now/w',
      },
      {
        name: 'This Month',
        value: 'now/M|now/M',
      },
      {
        name: 'This Month so far',
        value: 'now|now/M',
      },
      {
        name: 'This Year',
        value: 'now/y|now/y',
      },
      {
        name: 'This Year so far',
        value: 'now|now/y',
      },
    ],
    filter: 'now|now-6h',
  }, // Response time
];

export default {
  data() {
    return {
      charts,
    };
  },
};

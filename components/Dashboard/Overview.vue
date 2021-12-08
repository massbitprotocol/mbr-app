<template>
  <BaseBlock class="mt-4">
    <table v-if="loading" class="table-auto">
      <tbody>
        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">IP Address</td>
          <td>
            <div class="w-96 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Continent Name</td>

          <td>
            <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Country Name</td>

          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">City Name</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Latitude</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Longitude</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Install script</td>
          <td>
            <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <table v-else class="table-auto">
      <tbody>
        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">IP Address</td>
          <td>
            <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
              {{ api.ip }}
            </span>
          </td>
        </tr>

        <!-- Geo -->
        <template v-if="api.geo">
          <tr class="w-full" v-if="api.geo">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Continent Name</td>

            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.geo.continent_name }}
              </span>
            </td>
          </tr>

          <tr class="w-full">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Country Name</td>

            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.geo.country_name }}
              </span>
            </td>
          </tr>

          <tr class="w-full">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">City Name</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.geo.city }}
              </span>
            </td>
          </tr>

          <tr class="w-full">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Latitude</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.geo.latitude }}
              </span>
            </td>
          </tr>

          <tr class="w-full">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Longitude</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.geo.longitude }}
              </span>
            </td>
          </tr>
        </template>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3">Install script</td>
          <td>
            <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </BaseBlock>
</template>

<script>
export default {
  name: 'DashboardOverview',

  props: {
    api: {
      type: Object,
      default: () => ({}),
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    console.log('this.api :>> ', this.api);
  },
};
</script>

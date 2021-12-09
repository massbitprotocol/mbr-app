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

    <div v-else class="block md:table table-auto w-full">
      <colgroup>
        <col width="220" />
        <col />
      </colgroup>
      <tbody>
        <template v-if="api.ip">
          <tr class="w-full grid md:table-row">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">IP Address</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                {{ api.ip }}
              </span>
            </td>
          </tr>

          <!-- Geo -->
          <template v-if="api.geo">
            <tr class="w-full grid md:table-row" v-if="api.geo">
              <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">Continent Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                  {{ api.geo.continent_name }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">Country Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                  {{ api.geo.country_name }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">City Name</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                  {{ api.geo.city }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">Latitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                  {{ api.geo.latitude }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">Longitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium pr-20 py-3">
                  {{ api.geo.longitude }}
                </span>
              </td>
            </tr>
          </template>

          <tr class="w-full grid md:table-row">
            <td class="text-body-2 text-neutral-normal font-medium pr-20 py-3 whitespace-nowrap">Install script</td>
            <td>
              <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
            </td>
          </tr>
        </template>

        <div v-else class="w-full">
          <div class="mb-10 text-body-1 text-accent-red font-medium">
            You haven’t installed the script. Please install it for...
          </div>

          <tr class="w-full inline-flex flex-col">
            <td class="text-body-1 text-neutral-darkset font-medium pr-20 py-3 whitespace-nowrap">Install script</td>
            <td>
              <input class="w-full" type="text" value="ok" disabled />
            </td>
          </tr>
        </div>
      </tbody>
    </div>
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

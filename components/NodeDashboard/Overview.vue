<template>
  <BaseBlock class="mt-4">
    <table v-if="loading" class="table-auto">
      <tbody>
        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">IP Address</td>
          <td>
            <div class="w-96 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">Continent Name</td>

          <td>
            <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">Country Name</td>

          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">City Name</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">Latitude</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">Longitude</td>
          <td>
            <div class="w-64 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>

        <tr class="w-full">
          <td class="text-body-2 text-neutral-normal font-medium py-3">Install script</td>
          <td>
            <div class="w-38 h-5 animate-pulse bg-neutral-lighter rounded-full"></div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="block md:table table-auto w-full">
      <colgroup>
        <col class="w-full md:w-40" />
        <col />
      </colgroup>

      <tbody>
        <template v-if="api.ip">
          <tr class="w-full grid md:table-row">
            <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">IP Address</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium py-3">
                {{ api.ip }}
              </span>
            </td>
          </tr>

          <!-- Geo -->
          <template v-if="api.geo">
            <tr class="w-full grid md:table-row" v-if="api.geo">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Continent Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.continent_name }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Country Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.country_name }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">City Name</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.city }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Latitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.latitude }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Longitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.longitude }}
                </span>
              </td>
            </tr>

            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Data source</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.data_url }}
                </span>
              </td>
            </tr>
          </template>

          <tr class="w-full grid md:table-row">
            <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Install script</td>
            <td>
              <span
                :class="{
                  'inline-block align-text-bottom text-body-2 text-neutral-darkset font-medium ': true,
                  'max-w-[200px] sm:max-w-sm truncate': isShowFullScript === false,
                  'break-all': isShowFullScript === true,
                }"
              >
                {{ installScript }}
              </span>
              <span
                class="text-body-2 text-primary cursor-pointer underline whitespace-nowrap"
                @click="isShowFullScript = !isShowFullScript"
              >
                Show {{ isShowFullScript ? 'less' : 'more' }}
              </span>
            </td>
          </tr>
        </template>

        <div v-else class="w-full">
          <div class="mb-10 text-body-1 text-accent-red font-medium">
            You haven’t installed the script. Please install it for...
          </div>

          <tr class="w-full inline-flex flex-col">
            <td class="text-body-1 text-neutral-darkset font-medium py-3 whitespace-nowrap">Install script</td>
            <td>
              <div class="flex items-center">
                <input
                  class="w-full h-[44px] text-body-2 text-neutral-darkset font-medium bg-neutral-white border-t border-b border-l border-r-0 border-primary-background rounded-l-lg"
                  type="text"
                  :value="installScript"
                  disabled
                />
                <BaseButton class="relative -left-2 h-[44px] px-16" @click="copyInstallScript">
                  Copy
                  <div v-show="isShowCopyTootip" class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2">
                    <div
                      class="text-[0.625rem] leading-4 tracking-wide text-white bg-neutral-darkest px-3 py-1 rounded-md font-medium uppercase"
                    >
                      <svg
                        width="16"
                        height="6"
                        viewBox="0 0 16 6"
                        class="text-gray-900 absolute top-full left-1/2 -mt-px -ml-2"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Copied!
                    </div>
                  </div>
                </BaseButton>
              </div>
            </td>
          </tr>
        </div>
      </tbody>
    </div>
  </BaseBlock>
</template>

<script>
export default {
  name: 'NodeDashboardOverview',

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

  data() {
    return {
      isShowFullScript: false,
      isShowCopyTootip: false,
      copyTimeout: null,
    };
  },

  computed: {
    installScript() {
      if (this.api) {
        return `sh -c "$(curl -sSfL '${this.$config.curlNodeURL}?id=${this.api.id}&user_id=${this.api.user_id}&blockchain=${this.api.blockchain}&network=${this.api.network}')"`;
      }

      return '';
    },
  },

  methods: {
    copyInstallScript() {
      navigator.clipboard.writeText(this.installScript).then(() => {
        this.isShowCopyTootip = true;
        clearTimeout(this.copyTimeout);

        this.copyTimeout = setTimeout(() => {
          this.isShowCopyTootip = false;
        }, 1500);
      });
    },
  },
};
</script>

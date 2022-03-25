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
        <template v-if="api.geo && api.geo.ip">
          <!-- IP Addres -->
          <tr class="w-full grid md:table-row">
            <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">IP Address</td>
            <td>
              <span class="text-body-2 text-neutral-darkset font-medium py-3">
                {{ api.geo && api.geo.ip }}
              </span>
            </td>
          </tr>

          <!-- Geo -->
          <template v-if="api.geo">
            <!-- Continent Name -->
            <tr class="w-full grid md:table-row" v-if="api.geo">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Continent Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.continentName }}
                </span>
              </td>
            </tr>

            <!-- Country Name -->
            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Country Name</td>

              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.countryName }}
                </span>
              </td>
            </tr>

            <!-- City Name -->
            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">City Name</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.cityName }}
                </span>
              </td>
            </tr>

            <!-- Latitude -->
            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Latitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.latitude }}
                </span>
              </td>
            </tr>

            <!-- Longitude -->
            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Longitude</td>
              <td>
                <span class="text-body-2 text-neutral-darkset font-medium py-3">
                  {{ api.geo.longitude }}
                </span>
              </td>
            </tr>

            <!-- Data source -->
            <tr class="w-full grid md:table-row">
              <td class="text-body-2 text-neutral-normal font-medium py-3 whitespace-nowrap">Data source</td>
              <td>
                <div class="flex items-center">
                  <input
                    v-if="editDataSource"
                    :value="api.dataSource"
                    :disabled="loadingUpdateApi"
                    @blur="updateDataSource"
                    ref="apiDataSource"
                    type="text"
                    class="text-text-body-2 text-neutral-normal font-normal py-3 appearance-none block border border-primary-background rounded leading-tight"
                  />

                  <template v-else>
                    <span v-if="api.dataSource" class="text-body-2 text-neutral-darkset font-medium py-3">
                      {{ api.dataSource }}
                    </span>

                    <span v-else class="text-body-2 text-neutral-lighter py-3"> </span>
                  </template>

                  <svg
                    v-if="loadingUpdateApi"
                    class="animate-spin ml-2 h-5 w-5 text-primary"
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
                  <BasePopover
                    v-else
                    class="flex items-center"
                    content="Change the data source of the Node"
                    contentClass="w-[197px]"
                  >
                    <BaseIconButton class="w-[36px] h-[36px] ml-2" icon="edit" @click="showEditDataSource" />
                  </BasePopover>
                </div>
              </td>
            </tr>
          </template>

          <!-- Install script -->
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

        <!-- Init by script -->
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
      editDataSource: false,
      loadingUpdateApi: false,
    };
  },

  computed: {
    installScript() {
      if (this.api) {
        return `sudo bash -c "$(curl -sSfL '${this.$config.curlNodeURL}?id=${this.api.id}&user_id=${
          this.api.userId
        }&blockchain=${this.api.blockchain}&network=${this.api.network}&zone=${this.api.zone}&data_url=${
          this.api.dataSource || 'http://127.0.0.1:8545'
        }&app_key=${this.api.appKey}&portal_url=${this.$config.portalURL}&env=${this.$config.env}')"`;
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

    async updateDataSource() {
      let dataSource = this.$refs.apiDataSource.value;
      const reg = /^(http|https)?:\/\/?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      if (reg.test(dataSource)) {
        this.loadingUpdateApi = true;
        setTimeout(async () => {
          let _api = _.cloneDeep(this.api);
          const result = await this.$store.dispatch('node/updateApi', Object.assign(_api, { dataSource: dataSource }));
          if (result) {
            this.$notify({ type: 'success', text: 'The name of your API key has been successfully changed!' });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }

          this.editDataSource = false;
          this.loadingUpdateApi = false;
        }, 1500);
      } else {
        this.editDataSource = false;
        this.loadingUpdateApi = false;

        this.$notify({ type: 'error', text: 'The feild is not a valid URL' });
      }
    },

    showEditDataSource() {
      this.editDataSource = true;
      this.$nextTick(() => {
        this.$refs.apiDataSource.focus();
      });
    },
  },
};
</script>

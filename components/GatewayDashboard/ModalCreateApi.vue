<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Add New Gateway</div>

        <svg
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4141 10L15.7071 5.70701C16.0981 5.31601 16.0981 4.68401 15.7071 4.29301C15.3161 3.90201 14.6841 3.90201 14.2931 4.29301L10.0001 8.58601L5.7071 4.29301C5.3161 3.90201 4.6841 3.90201 4.2931 4.29301C3.9021 4.68401 3.9021 5.31601 4.2931 5.70701L8.5861 10L4.2931 14.293C3.9021 14.684 3.9021 15.316 4.2931 15.707C4.4881 15.902 4.7441 16 5.0001 16C5.2561 16 5.5121 15.902 5.7071 15.707L10.0001 11.414L14.2931 15.707C14.4881 15.902 14.7441 16 15.0001 16C15.2561 16 15.5121 15.902 15.7071 15.707C16.0981 15.316 16.0981 14.684 15.7071 14.293L11.4141 10Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div class="mt-5">
        <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
          <form class="w-full" @submit.prevent="handleSubmit(createApi)">
            <div class="flex flex-wrap -mx-3 mb-5">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="api name"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div>
                  <label
                    class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                    for="grid-api-key"
                  >
                    Gateway name
                  </label>

                  <input
                    v-model.trim="form.name"
                    id="grid-api-key"
                    :class="{
                      'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
                      'border-red-500': false,
                    }"
                    type="text"
                    placeholder="Enter name"
                  />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="blockchain"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div>
                  <label
                    class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                    for="grid-api-key"
                  >
                    Choose Blockchain
                  </label>

                  <BaseSearch v-model="form.blockchain" :source="blockchains" placeholder="Select blockchain" />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <!-- Networks -->
              <div class="w-full px-3 mb-5 md:mb-0" v-if="form.blockchain && networks.length > 0">
                <label class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2" for="grid-api-key">
                  Network
                </label>

                <BaseRadioButtonGroup class="mb-2.5" :source="networks" :current-key.sync="form.network" />
              </div>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="zone"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div>
                  <label
                    class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                    for="grid-api-key"
                  >
                    Choose Zone
                  </label>

                  <GatewayDashboardSelectZone v-model="form.zone" :source="zones" placeholder="Select zone" />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div class="w-full flex justify-end px-3">
                <BaseButton class="w-[189px] h-[40px]" type="submit" :disabled="invalid" :loading="loading">
                  Add
                </BaseButton>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </TheModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GatewayDashboardModalCreateApi',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    zone: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      form: {
        name: '',
        blockchain: '',
        zone: '',
        network: 'mainnet',
      },
      loading: false,
    };
  },

  watch: {
    visible(value) {
      if (value) {
        this.form.zone = this.zone;
      }
    },
  },

  computed: {
    ...mapGetters({
      blockchains: 'blockchains/list',
      zones: 'gateway/zones',
    }),

    _visible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },

    networks() {
      const blockchain = this.blockchains.find((data) => data.id === this.form.blockchain);
      if (blockchain && blockchain.network) {
        return blockchain.network.map((network) => ({ name: network.value, key: network.id }));
      }

      return [];
    },
  },

  methods: {
    async createApi() {
      this.loading = true;
      try {
        const result = await this.$axios.$post('/mbr/gateway', this.form);
        if (result && result.id) {
          setTimeout(() => {
            this.$notify({ type: 'success', text: 'New gateway has been successfully created!' });
          }, 500);

          this.$router.push({ name: 'gateways-id', params: { id: result.id } });

          this.loading = false;
          this._visible = false;
        }
      } catch (error) {
        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Create new API Key</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
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
                    Enter the name of your new API key
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
                    Blockchain
                  </label>

                  <BaseSearch v-model="form.blockchain" :source="blockchains" placeholder="Select blockchain" />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <div class="w-full px-3 mb-5 md:mb-0">
                <label class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2" for="grid-api-key">
                  Network
                </label>

                <BaseRadioButtonGroup :source="networks" :current-key.sync="form.network" />
              </div>
            </div>

            <div class="flex flex-wrap -mx-3">
              <div class="w-full flex justify-end px-3">
                <BaseButton class="w-[189px] h-[52px]" type="submit" :disabled="invalid" :loading="loading">
                  Create
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
import blockchains from '~/mixins/blockchains';

const networks = [
  {
    name: 'Mainnet',
    key: 'mainnet',
  },
  {
    name: 'Testnet',
    key: 'testnet',
  },
];
export default {
  name: 'DashboardModalCreateApi',

  mixins: [blockchains],

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      networks,
      form: {
        name: '',
        blockchain: '',
        network: 'mainnet',
      },
      loading: false,
    };
  },

  computed: {
    _visible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },

  methods: {
    async createApi() {
      this.loading = true;
      try {
        const { result, data } = await this.$axios.$post('/api/v1?action=api.create', this.form);
        if (result) {
          setTimeout(() => {
            this.$notify({ type: 'success', text: 'New entrypoint has been successfully created!' });
          }, 500);

          if (data && data.id) {
            this.$router.push({ name: 'users-id', params: { id: data.id } });
          }

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

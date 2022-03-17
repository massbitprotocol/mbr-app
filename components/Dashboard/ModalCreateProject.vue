<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">Create new Project</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="mt-5">
        <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
          <form class="w-full" @submit.prevent="handleSubmit(createProject)">
            <div class="flex flex-wrap -mx-3 mb-5">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="project name"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div>
                  <label
                    class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                    for="grid-project-key"
                  >
                    Enter the project name
                  </label>

                  <input
                    v-model.trim="form.name"
                    id="grid-project-key"
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

              <div v-if="networks.length > 0" class="w-full px-3 mb-5 md:mb-0">
                <label class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2" for="grid-api-key">
                  Network
                </label>

                <BaseRadioButtonGroup :source="networks" :current-key.sync="form.network" />
              </div>

              <div v-if="error" class="w-full px-3 mb-5 md:mb-0 text-body-2 text-accent-red font-normal mt-2">
                {{ error }}
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
import { mapGetters } from 'vuex';

export default {
  name: 'DashboardModalCreateProject',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    visible(value) {
      if (value === false) {
        this.form = { name: '' };
      }
    },
  },

  data() {
    return {
      form: {
        name: '',
        blockchain: '',
        network: 'mainnet',
      },
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      blockchains: 'blockchains/list',
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
    async createProject() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      try {
        const res = await this.$axios.$post('/mbr/d-apis/project', this.form);
        if (res && res.id) {
          setTimeout(() => {
            this.$notify({ type: 'success', text: 'New project has been successfully created!' });
          }, 500);

          this.$store.commit('project/setProject', res);
          this.form = {
            name: '',
          };
          this.loading = false;
          this._visible = false;
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      } catch (error) {
        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }
      this.loading = false;
    },
  },
};
</script>

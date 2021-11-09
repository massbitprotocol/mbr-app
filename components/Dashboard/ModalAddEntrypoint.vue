<template>
  <TheModal :open.sync="_visible" :backdrop="true">
    <div class="max-w-[570px] w-full bg-white p-5 rounded-lg z-10 text-left overflow-hidden">
      <div class="w-full flex items-center justify-between">
        <div class="text-heading-2 text-neutral-darkset font-bold">{{ isAddNew ? 'Add' : 'Edit' }} Entrypoint</div>

        <div
          @click="_visible = false"
          class="flex items-center text-neutral-darkset cursor-pointer"
          v-html="require(`~/assets/svg/icon/close.svg?raw`)"
        ></div>
      </div>

      <div class="w-full mt-3 text-body-2 lg:text-body-1 text-neutral-normal font-semibold">
        Add an Entrypoint to manage them
      </div>

      <div class="mt-5">
        <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
          <form class="w-full" @submit.prevent="handleSubmit(addEntrypoint)">
            <div class="flex flex-wrap -mx-3 mb-5">
              <div class="w-full grid grid-cols-2 gap-1.5">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="provider"
                  tag="div"
                  class="w-full px-3 mb-5 md:mb-0"
                >
                  <div>
                    <label
                      class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                      for="grid-api-key"
                    >
                      Provider
                    </label>

                    <BaseSearch
                      v-model="_form.type"
                      itemClass="text-body-2 lg:text-body-1 font-semibold text-neutral-darker"
                      :source="_providers"
                      @onChange="onChangeProvider"
                      placeholder="Select provider"
                    />
                    <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="priority"
                  tag="div"
                  class="w-full px-3 mb-5 md:mb-0"
                >
                  <div>
                    <label
                      class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                      for="grid-priority"
                    >
                      Priority
                    </label>

                    <div class="w-full flex flex-nowrap">
                      <button
                        @click="priorityMinus"
                        type="button"
                        class="
                          min-w-[52px]
                          py-3
                          mb-2.5
                          bg-neutral-darker
                          hover:bg-neutral-darker/90
                          text-white
                          rounded-l
                          outline-none
                        "
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15 9H5C4.447 9 4 9.448 4 10C4 10.552 4.447 11 5 11H15C15.553 11 16 10.552 16 10C16 9.448 15.553 9 15 9Z"
                            fill="white"
                          />
                        </svg>
                      </button>

                      <input
                        v-model.trim="_form.priority"
                        id="grid-priority"
                        class="
                          w-full
                          text-center
                          appearance-none
                          block
                          text-body-2 text-gray-700
                          border-top border-bottom border-primary-background
                          py-3
                          px-4
                          mb-2.5
                          leading-tight
                        "
                        type="number"
                      />

                      <button
                        @click="priorityPlus"
                        type="button"
                        class="
                          min-w-[52px]
                          py-3
                          mb-2.5
                          bg-neutral-darker
                          hover:bg-neutral-darker/90
                          text-white
                          rounded-r
                          outline-none
                        "
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17 9H11V3C11 2.448 10.553 2 10 2C9.447 2 9 2.448 9 3V9H3C2.447 9 2 9.448 2 10C2 10.552 2.447 11 3 11H9V17C9 17.552 9.447 18 10 18C10.553 18 11 17.552 11 17V11H17C17.553 11 18 10.552 18 10C18 9.448 17.553 9 17 9Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>

                    <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-7.5">
              <div class="w-full flex items-center px-3">
                <label
                  class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mr-2"
                  for="grid-entrypoint-status"
                >
                  Status
                </label>

                <BaseToggle id="grid-entrypoint-status" refId="add-entrypoint" :checked.sync="_status" />
              </div>
            </div>

            <div v-if="_provider && _provider.form_config" class="flex flex-wrap -mx-3">
              <!-- Project ID -->
              <ValidationProvider
                v-if="_provider.form_config.includes('project_id')"
                v-slot="{ errors }"
                rules="required"
                name="project ID"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div class="w-full flex flex-wrap items-center mb-5">
                  <label
                    class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                    for="grid-project-id"
                  >
                    Project ID
                  </label>

                  <input
                    v-model.trim="_form.project_id"
                    id="grid-project-id"
                    class="
                      appearance-none
                      block
                      w-full
                      text-body-2 text-gray-700
                      border border-primary-background
                      rounded
                      py-3
                      px-4
                      mb-2.5
                      leading-tight
                    "
                    type="text"
                    placeholder="Your project ID"
                  />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <!-- Project Secret -->
              <ValidationProvider
                v-if="_provider.form_config.includes('project_secret')"
                v-slot="{ errors }"
                rules="required"
                name="project secret"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div class="w-full flex flex-wrap items-center mb-5">
                  <label
                    class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                    for="grid-project-secret"
                  >
                    Project Secret
                  </label>

                  <input
                    v-model.trim="_form.project_secret"
                    id="grid-project-secret"
                    class="
                      appearance-none
                      block
                      w-full
                      text-body-2 text-gray-700
                      border border-primary-background
                      rounded
                      py-3
                      px-4
                      mb-2.5
                      leading-tight
                    "
                    type="text"
                    placeholder="Your project secret"
                  />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <!-- API Key -->
              <ValidationProvider
                v-if="_provider.form_config.includes('api_key')"
                v-slot="{ errors }"
                rules="required"
                name="API key"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div class="w-full flex flex-wrap items-center mb-5">
                  <label
                    class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                    for="grid-api-key"
                  >
                    API Key
                  </label>

                  <input
                    v-model.trim="_form.api_key"
                    id="grid-api-key"
                    class="
                      appearance-none
                      block
                      w-full
                      text-body-2 text-gray-700
                      border border-primary-background
                      rounded
                      py-3
                      px-4
                      mb-2.5
                      leading-tight
                    "
                    type="text"
                    placeholder="Your API key"
                  />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>

              <!-- API URI -->
              <ValidationProvider
                v-if="_provider.form_config.includes('api_uri')"
                v-slot="{ errors }"
                rules="required"
                name="API URI"
                tag="div"
                class="w-full px-3 mb-5 md:mb-0"
              >
                <div class="w-full flex flex-wrap items-center mb-5">
                  <label
                    class="block text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                    for="grid-api-uri"
                  >
                    API URI
                  </label>

                  <input
                    v-model.trim="_form.api_uri"
                    id="grid-api-uri"
                    class="
                      appearance-none
                      block
                      w-full
                      text-body-2 text-gray-700
                      border border-primary-background
                      rounded
                      py-3
                      px-4
                      mb-2.5
                      leading-tight
                    "
                    type="text"
                    placeholder="Your API URI"
                  />
                  <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
            </div>
            <div v-else></div>

            <div class="flex flex-wrap -mx-3">
              <div class="w-full flex justify-end px-3">
                <BaseButton class="w-[189px] h-[52px]" type="submit" :disabled="invalid" :loading="_loading">
                  {{ isAddNew ? 'Add' : 'Save' }}
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
  name: 'DashboardModalAddEntrypoint',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    isAddNew: {
      type: Boolean,
      default: false,
    },

    form: {
      type: Object,
      default: () => new Object(),
    },
  },

  computed: {
    ...mapGetters({
      providers: 'providers/list',
    }),

    _visible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },

    _loading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.$emit('update:loading', value);
      },
    },

    _form: {
      get() {
        return this.form;
      },
      set(value) {
        this.$emit('update:form', value);
      },
    },

    _providers() {
      return this.providers.map((item) => new Object({ value: item.type, id: item.type }));
    },

    _provider() {
      if (this._form.type && this.providers) {
        return this.providers.find((provider) => provider.type === this._form.type);
      }

      return null;
    },

    _status: {
      get() {
        return !!parseInt(this._form.status);
      },
      set(value) {
        this._form.status = value ? 1 : 0;
      },
    },
  },

  methods: {
    addEntrypoint() {
      this.$emit('onSave', this._form);
    },

    priorityPlus() {
      if (this._form.priority) {
        const priority = parseInt(this._form.priority) + 1;
        if (priority <= 10) {
          this._form.priority = priority;
        }
      } else {
        this._form.priority = 1;
      }
    },

    priorityMinus() {
      const priority = parseInt(this._form.priority) - 1;
      if (priority >= 0) {
        this._form.priority = priority;
      }
    },

    onChangeProvider(key) {
      const _provider = this.providers.find((provider) => provider.type === key);
      if (_provider && _provider.form_config) {
        this._form = _.pick(this._form, ['type', 'priority', 'status', ..._provider.form_config]);
      } else {
        this._form = _.pick(this._form, ['type', 'priority', 'status']);
      }
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

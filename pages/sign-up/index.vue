<template>
  <div class="min-h-[80vh] grid items-center mx-auto max-w-lg py-7.5 lg:py-10">
    <div>
      <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold">Sign Up</div>

      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
        <form class="mx-auto w-full max-w-md mt-7" @submit.prevent="handleSubmit(createAccount)">
          <div class="flex flex-wrap -mx-3 mb-5">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="username"
              tag="div"
              class="w-full px-3 mb-5 md:mb-0"
            >
              <div>
                <label
                  class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                  for="grid-user-name"
                >
                  Username <span class="text-accent-red">*</span>
                </label>

                <input
                  v-model.trim="form.username"
                  id="grid-user-name"
                  :class="{
                    'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
                    'border-red-500': false,
                  }"
                  type="text"
                  placeholder="Username"
                />
                <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="flex flex-wrap -mx-3 mb-5">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              name="email"
              tag="div"
              class="w-full px-3 mb-5 md:mb-0"
            >
              <div>
                <label class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2" for="grid-email">
                  Email <span class="text-accent-red">*</span>
                </label>
                <input
                  v-model.trim="form.email"
                  id="grid-email"
                  :class="{
                    'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
                    'border-red-500': false,
                  }"
                  type="text"
                  placeholder="Email"
                />
                <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <!-- Password -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="password"
            tag="div"
            class="flex flex-wrap -mx-3 mb-5"
          >
            <div class="w-full px-3 mb-5 md:mb-0">
              <div class="flex justify-between">
                <label
                  class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                  for="grid-password"
                >
                  Password <span class="text-accent-red">*</span>
                </label>
              </div>
              <input
                v-model.trim="form.password"
                id="grid-password"
                :class="{
                  'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4  leading-tight': true,
                  'border-red-500': false,
                }"
                type="password"
                ref="password"
                placeholder="Password"
              />
              <p v-if="errors[0]" class="text-red-500 text-xs italic mt-2.5">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <!-- Confirm password -->
          <ValidationProvider
            v-slot="{ errors }"
            vid="confirm"
            rules="required|confirmed:password"
            name="confirm password"
            tag="div"
            class="flex flex-wrap -mx-3 mb-5"
          >
            <div class="w-full px-3 mb-5 md:mb-0">
              <div class="flex justify-between">
                <label
                  class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                  for="grid-confirm-password"
                >
                  Confirm password <span class="text-accent-red">*</span>
                </label>
              </div>
              <input
                v-model.trim="form.confirm_password"
                id="grid-confirm-password"
                :class="{
                  'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4  leading-tight': true,
                  'border-red-500': false,
                }"
                type="password"
                placeholder="Confirm password"
              />
              <p v-if="errors[0]" class="text-red-500 text-xs italic mt-2.5">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <div class="flex flex-wrap -mx-3 mb-5">
            <ValidationProvider v-slot="{ errors }" name="referral" tag="div" class="w-full px-3 mb-5 md:mb-0">
              <div>
                <label
                  class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                  for="grid-referral"
                >
                  Referral
                </label>
                <input
                  v-model.trim="form.referral"
                  id="grid-referral"
                  :class="{
                    'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
                    'border-red-500': false,
                  }"
                  type="text"
                  placeholder="Referral username"
                />
                <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="flex flex-wrap -mx-3 mt-7.5">
            <div class="w-full px-3 mb-5 md:mb-0">
              <BaseButton class="w-full h-[52px]" type="submit" :disabled="invalid" :loading="loading">
                Create account
              </BaseButton>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-15 mt-3">
            <div class="w-full px-3 mb-5 md:mb-0 text-body-2">
              <span class="text-neutral-normal">Already have an account?</span>
              <span class="text-accent-green font-medium cursor-pointer" @click="$router.push({ name: 'login' })">
                Login
              </span>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SignUp',
  middleware: ['auth'],
  auth: false,

  async asyncData({ $auth, redirect }) {
    if ($auth.loggedIn) {
      redirect('/users');
    }
  },

  created() {
    if (this.$route.query.referral) {
      this.form.referral = this.$route.query.referral;
    }
  },

  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      loading: false,
    };
  },

  computed: {
    to() {
      if (this.$route.query && this.$route.query.to) return this.$route.query.to;

      return 'users';
    },
  },

  methods: {
    async createAccount() {
      this.loading = true;
      try {
        const _form = _.cloneDeep(this.form);
        delete _form.confirm_password;

        const { result, data, err } = await this.$axios.$post('/api/v1?action=user.register', _form);
        if (result && data.id) {
          this.$notify({ type: 'success', text: 'Your new account has been created!' });

          this.$router.push({ name: 'login' });
        } else {
          if (err) {
            this.$notify({ type: 'error', text: err });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } catch (err) {
        console.log(err);

        this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
      }
      this.loading = false;
    },
  },
};
</script>

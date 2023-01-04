<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <BaseBlock v-if="showWaringCheckEmailConfirm" class="w-full flex flex-col justify-center min-h-[30vh] my-15">
      <div
        class="flex items-center justify-center font-medium text-heading-1 whitespace-nowrap text-center text-primary"
      >
        A verification link has been sent to your email account
      </div>

      <div class="mt-2 text-center text-heading-2 text-gray-700">Please click on the link to verify your account</div>

      <div class="flex justify-center mt-7 text-center text-body-1 text-gray-700 italic">
        Didn't get the email?

        <button
          :class="{ 'font-bold text-primary cursor-pointer mx-2': true, 'text-primary/70': loadingSendEmail }"
          @click="resendEmail"
          :disabled="loadingSendEmail"
        >
          Resend email
        </button>
        <svg
          v-if="loadingSendEmail"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary/70"
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
      </div>
    </BaseBlock>

    <div v-else class="grid items-center mx-auto max-w-lg py-7.5 lg:py-10">
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
                  v-model.trim="form.passwordConfirm"
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

            <div class="text-caption text-gray-400 italic">
              <span class="text-accent-red">*</span> Password must contain at least four characters, at least one number
              and both lower and uppercase letters
            </div>

            <!-- <div class="flex flex-wrap -mx-3 mb-5">
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
          </div> -->

            <div class="flex flex-wrap -mx-3 mt-7.5">
              <div class="w-full px-3 mb-5 md:mb-0">
                <BaseButton class="w-full h-[40px]" type="submit" :disabled="invalid" :loading="loading">
                  Create account
                </BaseButton>
              </div>
            </div>

            <!-- <div class="flex flex-wrap -mx-3 mb-15 mt-3">
            <div class="w-full px-3 mb-5 md:mb-0 text-body-2">
              <span class="text-neutral-normal">Already have an account?</span>
              <span class="text-accent-green font-medium cursor-pointer" @click="$router.push({ name: 'login' })">
                Login
              </span>
            </div>
          </div> -->
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Button from '~/components/Base/Button.vue';

export default {
  components: { Button },
  name: 'SignUp',

  async asyncData({ $auth, redirect }) {
    if ($auth.user && $auth.user.status !== 'init_user' && $auth.user.status !== 'verify_email') {
      redirect('/');
      return;
    }

    if ($auth.user && $auth.user.status === 'verify_email') {
      return {
        form: {
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
        },
        query: {},
        loading: false,
        showWaringCheckEmailConfirm: true,
      };
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
        passwordConfirm: '',
      },
      query: {},
      loading: false,
      loadingSendEmail: false,
      showWaringCheckEmailConfirm: false,
    };
  },

  computed: {
    to() {
      if (this.$route.query && this.$route.query.to) return this.$route.query.to;

      return 'nodes';
    },
  },

  methods: {
    async createAccount() {
      this.loading = true;
      try {
        const _form = _.cloneDeep(this.form);
        const res = await this.$axios.$post('/auth/register', _form);
        if (res && res.id) {
          this.showWaringCheckEmailConfirm = true;
          this.$notify({ type: 'success', text: 'Your new account has been created!' });
        } else {
          if (err) {
            this.$notify({ type: 'error', text: err });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          const { data } = err.response;
          let message = 'Something was wrong. Please try again!';
          if (data.message) {
            if (Array.isArray(data.message)) {
              message = data.message[0];
            } else {
              message = data.message;
            }
          }
          this.$notify({ type: 'error', text: message || 'Something was wrong. Please try again!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }
      this.loading = false;
    },

    async resendEmail() {
      this.loadingSendEmail = true;

      try {
        const res = await this.$axios.$get('/auth/resend-email');
        if (res && res.status) {
          this.showWaringCheckEmailConfirm = true;
          this.$notify({ type: 'success', text: 'Success! Please Check Your Email Inbox' });
        } else {
          if (err) {
            this.$notify({ type: 'error', text: err });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          const { data } = err.response;
          let message = 'Something was wrong. Please try again!';
          if (data.message) {
            if (Array.isArray(data.message)) {
              message = data.message[0];
            } else {
              message = data.message;
            }
          }
          this.$notify({ type: 'error', text: message || 'Something was wrong. Please try again!' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }

      this.loadingSendEmail = false;
    },
  },
};
</script>

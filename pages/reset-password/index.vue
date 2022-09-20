<template>
  <div class="min-h-[80vh] grid items-center mx-auto max-w-lg py-7.5 lg:py-10">
    <div>
      <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold">Reset Password</div>

      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
        <form class="mx-auto w-full max-w-md mt-7" @submit.prevent="handleSubmit(resetPassword)">
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
                Reset
              </BaseButton>
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
        password: '',
        passwordConfirm: '',
      },
      query: {},
      loading: false,
      showWaringCheckEmailConfirm: false,
    };
  },

  computed: {
    token() {
      return this.$route.query?.token;
    },
  },

  methods: {
    async resetPassword() {
      if (!this.token) {
        this.$notify({ type: 'error', text: 'Cant not get reset token!' });
        return;
      }

      this.loading = true;
      try {
        const _form = _.cloneDeep(this.form);
        const res = await this.$axios.$post(
          '/auth/reset-password',
          { ..._form },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          },
        );
        if (res && res.status) {
          this.showWaringCheckEmailConfirm = true;
          this.$notify({ type: 'success', text: 'Reset password successfully!' });
          this.$router.push({ name: 'login' });
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          const { data, status } = err.response;
          if (status === 401) {
            this.$notify({ type: 'error', text: 'Your reset token has expired!' });
          } else if (data.message) {
            let message = 'Something was wrong. Please try again!';
            if (Array.isArray(data.message)) {
              message = data.message[0];
            } else {
              message = data.message;
            }
            this.$notify({ type: 'error', text: message || 'Something was wrong. Please try again!' });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      }
      this.loading = false;
    },
  },
};
</script>

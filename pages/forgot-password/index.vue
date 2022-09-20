<template>
  <div class="min-h-[80vh] w-full grid items-center mx-autuo py-7.5 lg:py-10">
    <div v-if="showWaringCheckEmailConfirm" class="flex flex-col items-center">
      <div
        class="flex items-center justify-center font-medium text-heading-1 text-center whitespace-nowrap text-neutral-darker"
      >
        A reset password link has been sent to your email account
      </div>

      <div class="mt-2 text-center text-heading-2 text-gray-700">
        Please click on the link to reset your account password
      </div>
    </div>
    <div v-else>
      <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold">Forgot Your Password?</div>
      <div
        class="w-full flex items-center justify-center mt-3 text-center text-body-2 lg:text-body-1 text-neutral-normal"
      >
        <div class="max-w-lg">
          Type the address linked to your account and we'll send you password reset instructions. They might end up in
          your spam folder, so please check there as well.
        </div>
      </div>

      <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
        <form class="mx-auto w-full max-w-md mt-7" @submit.prevent="handleSubmit(submitFormForgotPassword)">
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
                  Email
                </label>
                <input
                  v-model.trim="form.email"
                  id="grid-email"
                  :class="{
                    'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
                    'border-red-500': false,
                  }"
                  type="text"
                  placeholder="Your email"
                />
                <p v-if="errors[0]" class="text-red-500 text-xs italic">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </div>

          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full px-3 mb-5 md:mb-0">
              <BaseButton class="w-full h-[40px]" type="submit" :disabled="invalid" :loading="loading">Send</BaseButton>
            </div>
          </div>

          <div class="flex items-center justify-center mb-5">
            <label class="block text-body-1 mr-2 text-neutral-darkset font-medium tracking-wide">
              Remember password?
            </label>

            <NuxtLink class="text-body-1 text-accent-green font-medium" :to="{ name: 'login' }"> Login </NuxtLink>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'ForgotPassword',
  middleware: ['auth'],
  auth: false,

  data() {
    return {
      showWaringCheckEmailConfirm: false,
      loading: false,
      form: {
        email: '',
      },
    };
  },

  methods: {
    async submitFormForgotPassword() {
      this.loading = true;
      try {
        const _form = _.cloneDeep(this.form);
        const res = await this.$axios.$post('/auth/request-reset-password', { ..._form });
        if (res && res.status) {
          this.showWaringCheckEmailConfirm = true;
        } else {
          this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
        }
      } catch (error) {
        console.log('error :>> ', error);
        if (error?.response) {
          const { data } = error?.response;
          if (data?.message) {
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
          this.$notify({ type: 'error', text: error.toString() });
        }
      }
      this.loading = false;
    },
  },
};
</script>

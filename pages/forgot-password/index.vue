<template>
  <div class="min-h-[80vh] w-full grid items-center mx-autuo py-7.5 lg:py-10">
    <div>
      <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold">Forgot Your Password?</div>
      <div class="mt-3 text-center text-body-2 lg:text-body-1 text-neutral-normal">
        Enter your registered email below to<br />receive password reset instruction
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
              <BaseButton class="w-full h-[52px]" type="submit" :disabled="invalid">Send</BaseButton>
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
export default {
  name: 'ForgotPassword',
  middleware: ['auth'],
  auth: false,

  data() {
    return {
      form: {
        email: '',
      },
    };
  },

  methods: {
    submitFormForgotPassword() {
      console.log('ForgotPassword');
    },
  },
};
</script>

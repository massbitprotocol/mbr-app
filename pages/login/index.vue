<template>
  <div class="h-[80vh] mx-auto max-w-lg py-7.5 lg:py-10">
    <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold">Welcome Back</div>
    <div class="mt-3 text-center text-body-2 lg:text-body-1 text-neutral-normal">
      See your growth and get consulting support!
    </div>
    <ValidationObserver v-slot="{ handleSubmit, invalid }" tag="div">
      <form class="mx-auto w-full max-w-md mt-7" @submit.prevent="handleSubmit(userLogin)">
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
                class="block uppercase text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                for="grid-first-name"
              >
                User name
              </label>
              <input
                v-model.trim="form.username"
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
                class="block uppercase text-body-1 text-neutral-darkset font-semibold tracking-wide mb-2"
                for="grid-first-name"
              >
                Password
              </label>

              <NuxtLink class="text-body-2 text-accent-green font-semibold" :to="{ name: 'index' }">
                Forgot password?
              </NuxtLink>
            </div>
            <input
              v-model.trim="form.password"
              :class="{
                'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4  leading-tight': true,
                'border-red-500': false,
              }"
              type="password"
              placeholder="Password"
            />
            <p v-if="errors[0]" class="text-red-500 text-xs italic mt-2.5">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <div class="flex flex-wrap -mx-3 mb-7.5">
          <div class="w-full px-3 mb-5 md:mb-0">
            <label class="block text-body-2 text-neutral-darkset font-semibold cursor-pointer">
              <input class="mr-2 leading-tight focus:outline-none focus:ring-transparent" type="checkbox" />
              <span class="text-sm"> Remeber me </span>
            </label>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-5">
          <div class="w-full px-3 mb-5 md:mb-0">
            <BaseButton class="w-full h-[52px]" type="submit" :disabled="invalid">Login</BaseButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('cookie', { data: this.form });
        console.log(response);
        // const data = await this.$axios.$post('/api/v1?action=user.login', {
        //   data: this.form,
        // });
        // console.log('data :>> ', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="min-h-[80vh] grid items-center mx-auto max-w-lg py-7.5 lg:py-10">
    <div>
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
                  class="block text-body-1 text-neutral-darkset font-medium tracking-wide mb-2"
                  for="grid-user-name"
                >
                  User name
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
                  Password
                </label>

                <NuxtLink class="text-body-2 text-accent-green font-medium" :to="{ name: 'forgot-password' }">
                  Forgot password?
                </NuxtLink>
              </div>
              <input
                v-model.trim="form.password"
                id="grid-password"
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
              <label class="block text-body-2 text-neutral-darkset font-medium cursor-pointer">
                <input class="mr-2 leading-tight focus:outline-none focus:ring-transparent" type="checkbox" />
                <span class="text-sm"> Remember me </span>
              </label>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full px-3 mb-5 md:mb-0">
              <BaseButton class="w-full h-[52px]" type="submit" :disabled="invalid" :loading="loading">
                Login
              </BaseButton>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-5">
            <div class="w-full px-3 mb-5 md:mb-0">
              <BaseGhostButton class="w-full h-[52px]" type="button" :loading="loading" @click="loginWithWallet">
                Login with wallet
              </BaseGhostButton>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-15 mt-3">
            <div class="w-full px-3 mb-5 md:mb-0 text-body-2">
              <span class="text-neutral-normal">Not a member?</span>
              <span class="text-accent-green font-medium cursor-pointer" @click="$router.push({ name: 'sign-up' })">
                Sign up
              </span>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <BaseModalSelectAccount
      :visible.sync="showModalSelectAccount"
      :accounts="this.accounts"
      @select="excuteLoginByAccount"
    />
  </div>
</template>

<script>
import { stringToHex } from '@polkadot/util';

export default {
  name: 'Login',
  middleware: ['auth'],
  auth: false,

  async asyncData({ $auth, redirect, route }) {
    if ($auth.loggedIn) {
      redirect({ name: route.query.to || 'projects' });
    }
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      showModalSelectAccount: false,
      loading: false,
      accounts: [],
    };
  },

  computed: {
    to() {
      if (this.$route.query && this.$route.query.to) return this.$route.query.to;

      return 'projects';
    },
  },

  methods: {
    async userLogin() {
      this.loading = true;
      try {
        const { data } = await this.$auth.loginWith('local', { data: this.form });
        if (data.accessToken) {
          const from = this.$cookies.get('from');
          if (from) {
            this.$cookies.remove('from');
            this.$router.push(from);
          } else {
            this.$router.push({ name: this.to });
          }
        } else {
          if (data.err) {
            this.$notify({ type: 'error', text: data.err });
          } else {
            this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
          }
        }
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },

    async loginWithWallet() {
      const isEnable = await this.$polkadot.isEnableApp();
      if (isEnable) {
        const accounts = await this.$polkadot.getListAcount();
        if (accounts && accounts.length) {
          if (accounts.length === 1) {
            this.excuteLoginByAccount(accounts[0]);
          } else {
            // Show modal select account
            this.accounts = accounts;
            this.showModalSelectAccount = true;
          }
        }
      } else {
        this.$notify({ type: 'error', text: 'Cant not find polkadot wallet!' });
      }
    },

    async excuteLoginByAccount(account) {
      try {
        const { salt } = await this.$store.dispatch('user/requestLoginWithWallet', account.address);
        if (salt) {
          const signer = await this.$polkadot.getSignRaw(account);
          const { signature } = await signer({
            address: account.address,
            data: stringToHex(salt),
            type: 'bytes',
          });
          const { data } = await this.$auth.loginWith('localWallet', {
            data: { signature, walletAddress: account.address },
          });
          if (data.accessToken) {
            const from = this.$cookies.get('from');
            if (from) {
              this.$cookies.remove('from');
              this.$router.push(from);
            } else {
              this.$router.push({ name: this.to });
            }
          } else {
            if (data.err) {
              this.$notify({ type: 'error', text: data.err });
            } else {
              this.$notify({ type: 'error', text: 'Something was wrong. Please try again!' });
            }
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          const { data } = error.response;
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
    },
  },
};
</script>

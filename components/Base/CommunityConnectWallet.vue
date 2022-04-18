<template>
  <div v-if="initAppSuccess" class="flex items-center gap-3">
    <div v-if="communityUser" class="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 251 252" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M125.46 252C194.749 252 250.919 195.588 250.919 126C250.919 56.4121 194.749 0 125.46 0C56.1702 0 0 56.4121 0 126C0 195.588 56.1702 252 125.46 252Z"
          fill="#2C3ACF"
        />
        <path
          d="M43.9557 166.007C43.5104 166.007 43.0554 165.914 42.6261 165.714C41.0177 164.974 40.3096 163.066 41.0465 161.451L81.8432 71.9117C82.5802 70.2963 84.4801 69.5852 86.0886 70.3253C87.697 71.0654 88.4051 72.9735 87.6681 74.5889L46.8714 164.128C46.3331 165.309 45.1733 166.007 43.9557 166.007Z"
          fill="white"
        />
        <path
          d="M125.559 166.007C124.345 166.007 123.182 165.309 122.643 164.128L81.8434 74.5889C81.1064 72.9735 81.8145 71.0622 83.4229 70.3253C85.0314 69.5852 86.9345 70.2963 87.6683 71.9117L128.468 161.451C129.205 163.066 128.497 164.977 126.889 165.714C126.456 165.914 126.004 166.007 125.559 166.007Z"
          fill="white"
        />
        <path
          d="M125.552 166.007C125.107 166.007 124.652 165.914 124.223 165.714C122.614 164.974 121.906 163.066 122.643 161.451L163.443 71.9117C164.18 70.2963 166.08 69.5852 167.689 70.3253C169.297 71.0654 170.005 72.9735 169.268 74.5889L128.468 164.128C127.93 165.312 126.77 166.007 125.552 166.007Z"
          fill="white"
        />
        <path
          d="M207.159 166.007C205.944 166.007 204.781 165.309 204.243 164.128L163.443 74.5889C162.706 72.9735 163.414 71.0622 165.023 70.3253C166.631 69.5852 168.534 70.2963 169.268 71.9117L210.068 161.451C210.805 163.066 210.097 164.977 208.488 165.714C208.056 165.914 207.604 166.007 207.159 166.007Z"
          fill="white"
        />
        <path
          d="M43.7572 178.75C50.5186 178.75 55.9997 173.412 55.9997 166.828C55.9997 160.243 50.5186 154.906 43.7572 154.906C36.9958 154.906 31.5146 160.243 31.5146 166.828C31.5146 173.412 36.9958 178.75 43.7572 178.75Z"
          fill="white"
        />
        <path
          d="M125.46 178.75C132.221 178.75 137.702 173.412 137.702 166.828C137.702 160.243 132.221 154.906 125.46 154.906C118.698 154.906 113.217 160.243 113.217 166.828C113.217 173.412 118.698 178.75 125.46 178.75Z"
          fill="white"
        />
        <path
          d="M207.162 178.75C213.923 178.75 219.405 173.412 219.405 166.828C219.405 160.243 213.923 154.906 207.162 154.906C200.401 154.906 194.919 160.243 194.919 166.828C194.919 173.412 200.401 178.75 207.162 178.75Z"
          fill="white"
        />
      </svg>

      <div class="text-body-2 text-neutral-darkset">
        {{ balance }} <strong>{{ chainToken }}</strong>
      </div>
    </div>

    <BaseGhostButton class="hidden lg:flex items-center gap-1.5" @click="loginAsCommunityUser">
      <template v-if="communityUser">
        <Identicon :size="24" :theme="'substrate'" :value="communityUser.address" />

        {{ communityUser.meta.name }}
      </template>

      <template v-else>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.66667 2C4.22813 2 3.59011 2.12425 3.03617 2.52308C2.43692 2.95454 2 3.66585 2 4.66667V16.6667C2 17.403 2.59695 18 3.33333 18H16.6667C17.403 18 18 17.403 18 16.6667V14.4444H15.3333C14.8948 14.4444 14.2568 14.3202 13.7028 13.9214C13.1036 13.4899 12.6667 12.7786 12.6667 11.7778C12.6667 10.777 13.1036 10.0657 13.7028 9.63419C14.2568 9.23536 14.8948 9.11111 15.3333 9.11111H18V6.88889C18 6.15674 17.4089 5.55556 16.6683 5.55556H16.2222V3.33333C16.2222 2.59695 15.6253 2 14.8889 2H4.66667ZM4.66667 3.77778C4.17575 3.77778 3.77778 4.17575 3.77778 4.66667V5.55556H14.4444V3.77778H4.66667Z"
            fill="currentColor"
          />
          <path
            d="M15.3333 10.8889H18V12.6667H15.3333C15.1793 12.6667 14.9284 12.6131 14.7416 12.4786C14.6001 12.3768 14.4444 12.1992 14.4444 11.7778C14.4444 11.3564 14.6001 11.1788 14.7416 11.0769C14.9284 10.9424 15.1793 10.8889 15.3333 10.8889Z"
            fill="currentColor"
          />
        </svg>

        Connect wallet
      </template>
    </BaseGhostButton>

    <BaseModalSelectAccount
      :visible.sync="showModalSelectAccount"
      :accounts="this.accounts"
      @select="excuteLoginByAccount"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Identicon from '@polkadot/vue-identicon';

export default {
  name: 'BaseCommunityConnectWallet',

  components: { Identicon },

  data() {
    return {
      showModalSelectAccount: false,
      accounts: [],
    };
  },

  async created() {
    await this.$store.dispatch('community-user/findCurrentUser');
    this.$store.commit('initAppSuccess');
  },

  computed: {
    ...mapState({
      communityUser: (state) => state['community-user'].currentUser,
      balance: (state) => state['community-user'].balance,
      chainToken: (state) => state.chain.chainToken,
      initAppSuccess: (state) => state.initAppSuccess,
    }),
  },

  methods: {
    async loginAsCommunityUser() {
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
      await this.$store.dispatch('community-user/setCurrentUser', account);

      this.showModalSelectAccount = false;

      window.location.reload();
    },
  },
};
</script>

<template>
  <div class="relative inline-block text-left">
    <!-- Button -->
    <div>
      <button
        type="button"
        @click="showMenu = !showMenu"
        class="inline-flex items-center gap-3 justify-center w-full rounded-lg border border-primary shadow-sm px-4 py-2 text-body-2 text-primary font-medium hover:bg-gray-50 focus:outline-none focus:ring-0"
      >
        <Identicon :size="24" :theme="'polkadot'" :value="$auth.user.walletAddress" />

        {{ $auth.user.username }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Backdrop -->
    <div v-if="showMenu" @click="showMenu = false" class="fixed top-0 left-0 w-full h-full bg-transparent"></div>

    <!-- Dropdown menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="showMenu"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-xl bg-white focus:outline-none z-10"
        style="box-shadow: 0px 2px 16px rgba(33, 47, 96, 0.12)"
      >
        <div class="flex flex-col space-y-5 p-5">
          <NuxtLink
            :to="{ name: 'my-profile' }"
            class="flex text-body-2 text-primary-darker hover:text-primary-darker/90 font-medium"
          >
            My profile
          </NuxtLink>

          <button
            type="button"
            class="flex text-body-2 text-accent-red hover:text-accent-red/90 font-medium"
            @click="logout"
          >
            Sign out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';

export default {
  name: 'TheAccountDropdown',

  components: { Identicon },

  data() {
    return {
      showMenu: false,
    };
  },

  methods: {
    logout() {
      setTimeout(() => {
        // Call api logout
        this.$store.dispatch('user/logout');
      }, 0);

      // Clear local store and push to login
      this.$auth.logout();
      this.$router.push('/login');
    },
  },
};
</script>

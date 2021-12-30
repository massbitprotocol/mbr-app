<template>
  <div>
    <div class="text-medium-title text-neutral-darkset font-bold">Referral</div>

    <div class="text-heading-2 font-medium text-neutral-darkset mt-7.5">Refer Friends. Earn coin together.</div>

    <div class="text-body-2 font-medium text-neutral-normal max-w-xl mt-3 mb-2">
      Earn up to 40% commission on every trade across Massbit products. When a friend successfully creating an API,
      you'll receive X and your friend will get Y....
    </div>

    <a class="text-body-1 text-primary underline" href="https://massbit.io" target="_blank" rel="noopener noreferrer">
      View referral rules
    </a>

    <div class="mt-15">
      <div class="text-body-1 font-medium text-neutral-darkset">Your referral ID</div>

      <!-- Username -->
      <div class="flex items-center mt-3">
        <span class="text-body-2 font-medium text-primary">{{ $auth.user.username }}</span>
        <TheCopyButton class="ml-3" buttonClass="bg-primary-background" :textToCopy="$auth.user.username" />
      </div>
    </div>

    <div class="mt-15">
      <div class="text-body-1 font-medium text-neutral-darkset">Your referral link</div>

      <!-- Link -->
      <div class="flex items-center mt-3">
        <span class="text-body-2 font-medium text-primary">{{ referralUrl }}</span>
        <TheCopyButton class="ml-3" buttonClass="bg-primary-background" :textToCopy="referralUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfileReferral',

  middleware: ['auth'],
  auth: true,

  computed: {
    referralUrl() {
      return `${window.location.origin}/sign-up?referral=${this.$auth.user.username}`;
    },
  },
};
</script>

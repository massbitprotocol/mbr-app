<template>
  <div class="max-w-2xl min-h-[95vh] pb-30">
    <div class="text-medium-title text-neutral-darkset font-bold">Personal Info</div>

    <div>
      <div class="text-heading-2 font-medium text-neutral-darkset mt-7.5">Basic Details</div>
      <div class="text-body-2 font-medium text-neutral-normal mt-2">
        Your profile is public, update your details to show our community who you are
      </div>
    </div>

    <div class="grid grid-cols-1 mt-15 gap-15">
      <div>
        <div class="mb-3 text-body-1 font-medium text-neutral-darkset">Username</div>

        <input
          v-model.trim="$auth.user.username"
          :class="{
            'appearance-none block w-full text-body-2 font-medium text-neutral-darkset border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
          }"
          type="text"
          disabled
        />
      </div>

      <div>
        <div class="mb-3 text-body-1 font-medium text-neutral-darkset">Email</div>

        <input
          v-model.trim="$auth.user.email"
          :class="{
            'appearance-none block w-full text-body-2 font-medium text-neutral-darkset border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
          }"
          type="text"
          disabled
        />
      </div>

      <div>
        <div class="mb-3 text-body-1 font-medium text-neutral-darkset">Wallet address</div>

        <input
          v-model.trim="$auth.user.walletAddress"
          :class="{
            'appearance-none block w-full text-body-2 font-medium text-neutral-darkset border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
          }"
          type="text"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProfileIndex',

  middleware: ['auth'],
  auth: true,
};
</script>

<template>
  <div class="max-w-2xl">
    <div class="text-medium-title text-neutral-darkset font-bold">Hi, {{ $auth.user.username }}</div>

    <div class="grid grid-cols-1 mt-15 gap-15">
      <div>
        <div class="mb-3 text-body-1 font-medium text-neutral-darkset">Username</div>

        <input
          v-model.trim="$auth.user.username"
          :class="{
            'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
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
            'appearance-none block w-full text-body-2 text-gray-700 border border-primary-background rounded py-3 px-4 mb-2.5 leading-tight': true,
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

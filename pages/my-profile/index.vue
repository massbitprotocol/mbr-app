<template>
  <div>
    <div class="text-medium-title text-neutral-darkset font-bold">Hi, {{ $auth.user.username }}</div>
  </div>
</template>

<script>
export default {
  name: 'MyProfileIndex',

  middleware: ['auth'],
  auth: true,
};
</script>

<template>
  <div>login-security</div>
</template>

<script>
export default {
  name: 'MyProfileLoginAndSecurity',

  middleware: ['auth'],
  auth: true,
};
</script>

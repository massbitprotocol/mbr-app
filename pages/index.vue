<template>
  <div>
    <HomeDashboard v-if="$auth.loggedIn" />

    <Home v-else />
  </div>
</template>

<script>
export default {
  name: 'Index',

  layout(context) {
    if (context.$auth.loggedIn) {
      return 'wellcome';
    }

    return 'default';
  },
};
</script>

<template>
  <div>
    <HomeDashboard v-if="$auth.loggedIn" />

    <HomeLogin v-else />
  </div>
</template>

<script>
export default {
  name: 'Index',

  layout(context) {
    console.log('context :>> ', context.$auth.loggedIn);
    if (context.$auth.loggedIn) {
      return 'wellcome';
    }

    return 'default';
  },
};
</script>

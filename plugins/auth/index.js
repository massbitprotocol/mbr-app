export default async function ({ $auth, redirect, $cookies, $axios }) {
  if (!$auth.loggedIn) {
    return;
  }

  await $axios.$get('/api/v1?action=user.ping');
}

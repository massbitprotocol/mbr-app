export default async function ({ $auth, $axios, store }) {
  if (!$auth.loggedIn) {
    return;
  }

  await $axios.$get('/api/v1?action=user.ping');
}

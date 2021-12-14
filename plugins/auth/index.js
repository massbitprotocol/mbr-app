export default async function ({ $auth, $axios, store }) {
  if (!$auth.loggedIn) {
    return;
  }
}

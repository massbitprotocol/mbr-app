export default async function ({ $auth, $axios, store }) {
  if (!$auth.loggedIn) {
    return;
  }

  await $axios.$get('/api/v1?action=user.ping');

  //   const data = await $axios.$get('config.json');
  //   if (data) {
  //     // Init blockchains
  //     if (data.blockchains) {
  //       store.commit('blockchains/setList', data.blockchains);
  //     }

  //     // Init providers
  //     if (data.providers) {
  //       store.commit('providers/setList', data.providers);
  //     }
  //   }
}

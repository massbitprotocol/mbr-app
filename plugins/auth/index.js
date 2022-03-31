export default async function ({ $auth, $axios, store }) {
  $auth.onRedirect((to, from) => {
    const _from = from.replace('/', '').replaceAll('/', '-');
    const _to = to.replace('/', '');
    if (_to === 'login' && ['projects', 'gateways', 'nodes', 'my-profile-referral'].includes(_from)) {
      return `/${_to}?to=${_from}`;
    }
  });
}

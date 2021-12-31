export default async function ({ $auth, $axios, store }) {
  $auth.onRedirect((to, from) => {
    const _from = from.replace('/', '');
    const _to = to.replace('/', '');
    if (_to === 'login' && ['users', 'gateways', 'nodes'].includes(_from)) {
      return `/${_to}?to=${_from}`;
    }
  });
}

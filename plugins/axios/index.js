export default async function ({ $axios, app, redirect }) {
  if (!$axios.defaults.headers.common.mbrid) {
    // Init mbri code
    const data = await $axios.$post(
      '/api/v1/hello',
      {},
      {
        headers: {
          mbrid: 1,
        },
      },
    );
    if (data) {
      $axios.defaults.headers.common = Object.assign({ mbrid: data }, $axios.defaults.headers.common);
    }
  }

  $axios.onResponse((response) => {
    const { data } = response;

    if (data && data.err_code === 100) {
      app.$auth.logout();

      redirect('/login');
    }
  });
}

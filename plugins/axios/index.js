export default function ({ $axios, app, redirect }) {
  $axios.onResponse((response) => {
    const { data } = response;

    if (data && data.err_code === 100) {
      app.$auth.logout();

      redirect('/login');
    }
  });
}

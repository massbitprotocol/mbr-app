import _ from 'lodash';

export default async function ({ $axios, app, redirect, from, route }) {
  $axios.onResponse((response) => {
    const { data, status } = response;

    if (status === 401) {
      app.$cookies.set('from', route.fullPath);
      app.$auth.logout();

      redirect('/login');
    }
  });
}

export const actions = {
  nuxtServerInit({ commit, dispatch, route }, { req, redirect, $auth }) {
    let sessionID = this.$cookies.get('_slc_web_sid');
    if (!sessionID) {
      $auth.reset();
      return redirect('/login');
    }
  },
};

export const actions = {
  nuxtServerInit({ commit, dispatch, route }, { req, redirect, app }) {
    let token = app.$auth.strategy.token.get();
    console.log('token :>> ', token);
    let sessionID = app.$cookies.get('_slc_web_sid');
    console.log('sessionID :>> ', sessionID);
    // if (!sessionID) {
    //   $auth.reset();
    //   return redirect('/login');
    // }
  },
};

export const actions = {
  nuxtServerInit({ commit, dispatch, route }, { req, redirect }) {
    let sessionID = this.$cookies.get('_slc_web_sid');
    if (!sessionID) {
      return redirect('/login');
    }
  },
};

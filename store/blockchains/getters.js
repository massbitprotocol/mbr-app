export default {
  list(state) {
    return state.list;
  },

  getBlockchainByID: (state) => (id) => {
    return state.list.find((blockchain) => blockchain.id === id);
  },
};

export default function chainState() {
  return (app) => {
    app.subscribe(async (mutation) => {
      if (mutation.type === 'initAppSuccess') {
        const { commit, dispatch, state, $polkadot, $auth, $utils } = app;
        if (!$polkadot.api.isReady) {
          await $polkadot.startApi();
        }

        const { api } = $polkadot;
        const { chainTokens, chainDecimals } = api.registry;
        const chainDecimal = chainDecimals.length ? chainDecimals[0] : 18;
        const chainToken = chainTokens.length ? chainTokens[0] : 'MBT';

        commit('chain/setChainToken', chainToken);
        commit('chain/setChainDecimal', chainDecimal);

        if ($auth.user) {
          // Subscribe current era
          await api.query.dapiStaking.currentEra((era) => {
            commit('chain/setCurrentEra', era);
          });

          // Subscribe account balance
          await api.query.system.account($auth.user.walletAddress, ({ nonce, data: balance }) => {
            const _balance = BigInt(balance.free - balance.miscFrozen);
            commit('user/setBalance', $utils.formatBalance(_balance, chainDecimal));
          });
        }
      }
    });
  };
}

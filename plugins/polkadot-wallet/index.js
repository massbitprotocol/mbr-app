import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from '@polkadot/extension-dapp';

export default (ctx, inject) => {
  const instance = {
    /**
     *
     * @returns {boolean}
     */
    async isEnableApp() {
      const allInjected = await web3Enable('Massbit Route');
      console.log('allInjected :>> ', allInjected);
    },
  };

  inject('polkadotWallet', instance);
  ctx.$polkadotWallet = instance;
};

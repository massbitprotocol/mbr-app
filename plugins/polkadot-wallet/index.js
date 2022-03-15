import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

export default (ctx, inject) => {
  const instance = {
    api: {
      isReady: false,
    },

    /**
     *
     * @returns {boolean}
     */
    async isEnableApp() {
      const extensions = await web3Enable('Massbit Route');
      if (extensions.length === 0) {
        return false;
      }

      return true;
    },

    async getListAcount() {
      return await web3Accounts({ ss58Format: 42 });
    },

    async getSignRaw(account) {
      const isEnable = await this.isEnableApp();
      if (isEnable) {
        const signer = await this.getSigner(account);
        return signer.signRaw;
      }

      return null;
    },

    async getSigner(account) {
      const isEnable = await this.isEnableApp();
      if (isEnable) {
        const injector = await web3FromAddress(account.address);
        return injector?.signer;
      }

      return null;
    },

    async startApi() {
      try {
        const wsProvider = new WsProvider('wss://dev.verification.massbit.io');
        const api = new ApiPromise({ provider: wsProvider });
        await api.isReady;

        this.api = api;

        return api;
      } catch (error) {
        console.log('error :>> ', error);

        return null;
      }
    },
  };

  inject('polkadot', instance);
  ctx.$polkadot = instance;
};

import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';

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
        const wsProvider = new WsProvider(ctx.app.$config.massbitChain);
        const api = new ApiPromise({ provider: wsProvider });
        await api.isReady;

        this.api = api;

        return api;
      } catch (error) {
        console.log('error :>> ', error);

        return null;
      }
    },

    getStakingMessage(dispatchError) {
      const decoded = this.api.registry.findMetaError(dispatchError.asModule);
      const { docs, name, section } = decoded;

      switch (`${section}.${name}`) {
        case 'dapi.AlreadyRegistered':
          return 'Node already registered';

        case 'dapi.AlreadyExist':
          return 'Provider already exist';

        case 'dapi.InsufficientBoding':
          return 'Staking amount is not enough';

        default:
          return `Unknown error: ${docs.join(' ')}`;
      }
    },
  };

  inject('polkadot', instance);
  ctx.$polkadot = instance;
};

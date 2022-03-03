import {
  web3Accounts,
  web3Enable,
  web3FromSource,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
  isWeb3Injected,
  packageInfo,
} from '@polkadot/extension-dapp';
import { Keyring } from '@polkadot/keyring';

export default (ctx, inject) => {
  const instance = {
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
      return await web3Accounts({ ss58Format: 0 });
    },

    async getSigner(account) {
      const keyring = new Keyring();
      const _address = keyring.encodeAddress(account.address, 0);

      const injector = await web3FromAddress(account.address);

      const signRaw = injector?.signer?.signRaw;

      return signRaw;
    },
  };

  inject('polkadotWallet', instance);
  ctx.$polkadotWallet = instance;
};

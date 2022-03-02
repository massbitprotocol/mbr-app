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
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        return false;
      }

      return true;
    },

    async getListAcount() {
      return await web3Accounts({ ss58Format: 2 });
    },

    async getSigner(account) {
      const keyring = new Keyring();
      const _address = keyring.encodeAddress(account.address, 2);
      console.log('_address :>> ', _address);

      const injector = await web3FromAddress(_address);
      const provider = await injector.provider.connect();
      console.log('provider :>> ', provider);
      console.log('injector :>> ', injector);

      const signRaw = injector?.signer?.signRaw;

      return signRaw;
    },
  };

  inject('polkadotWallet', instance);
  ctx.$polkadotWallet = instance;
};

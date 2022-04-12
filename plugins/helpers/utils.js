import { formatBalance as _formatBalance } from '@polkadot/util';

export const utils = (ctx) => ({
  getErrorMessage(error) {
    if (error.response) {
      const { data, errors } = error.response;
      if (data?.message) {
        return data.message;
      }

      if (errors?.length > 0) {
        return errors.join('\n');
      }
    }
    if (error?.data) {
      return error.data.message || error.data;
    }

    return error.message;
  },

  formatBalance(balance, chainDecimal, unit = 'd') {
    return _formatBalance(balance, { forceUnit: unit, withSi: false }, chainDecimal);
  },
});

export default function (ctx, inject) {
  const _utils = utils(ctx);
  ctx.$utils = _utils;
  inject('utils', _utils);
}

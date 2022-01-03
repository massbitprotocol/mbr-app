import qrcode from 'qrcode';

export default function (ctx, inject) {
  inject('qrcode', qrcode);
}

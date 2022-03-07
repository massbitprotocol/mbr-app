import Vue from 'vue';
import dayjs from 'dayjs';

const TRUNCATED_NAME_CHAR_LIMIT = 30;
const TRUNCATED_ADDRESS_START_CHARS = 18;
const TRUNCATED_ADDRESS_END_CHARS = 12;

Vue.filter('shortenKey', (value) => {
  if (value && value.length < TRUNCATED_NAME_CHAR_LIMIT) {
    return value;
  }

  return `${value.slice(0, TRUNCATED_ADDRESS_START_CHARS)}...${value.slice(-TRUNCATED_ADDRESS_END_CHARS)}`;
});

Vue.filter('shortenUrl', (value) => {
  if (value && value.length < TRUNCATED_NAME_CHAR_LIMIT) {
    return value;
  }

  return `${value.slice(0, value.length - (TRUNCATED_ADDRESS_START_CHARS + 1))}...${value.slice(
    -TRUNCATED_ADDRESS_END_CHARS,
  )}`;
});

Vue.filter('shortenWalletAddress', (value) => {
  if (!value) {
    return '';
  }

  const regexp = /.{10}/g;
  regexp.lastIndex = 13;

  return value.replace(regexp.exec(value)[0], '*'.repeat(10));
});

Vue.filter('shortenId', (value) => {
  if (!value) {
    return '';
  }

  return value.substr(-7, 7) || '';
});

Vue.filter('number', (value) => {
  if (!value) {
    return 0;
  }

  return new Intl.NumberFormat().format(value);
});

Vue.filter('numberText', (value) => {
  if (!value) {
    return '00';
  }

  if (value < 10) {
    return `0${value}`;
  }

  return new Intl.NumberFormat().format(value);
});

Vue.filter('formatTimeDuration', (timestamp) => {
  return dayjs(parseInt(timestamp) * 1000)
    .utc(true)
    .fromNow();
});

Vue.filter('formatTimeUTC', (datetime) => {
  return dayjs(datetime).utc(true).format('MMMM DD, YYYY hh:mm:ss A +UTC');
});

Vue.filter('formatPrice', (number) => {
  if (number) {
    return parseFloat(number)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  return '';
});

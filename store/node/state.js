export default () => ({
  list: [],
  meta: {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  links: {
    first: '',
    last: '',
    next: '',
    previous: '',
  },
  api: null,
  zones: [
    {
      name: 'Asia',
      key: 'AS',
      value: 0,
    },
    {
      name: 'Europe',
      key: 'EU',
      value: 0,
    },
    {
      name: 'North america',
      key: 'NA',
      value: 0,
    },
    {
      name: 'South america',
      key: 'SA',
      value: 0,
    },
    {
      name: 'Africa',
      key: 'AF',
      value: 0,
    },
    {
      name: 'Oceania',
      key: 'OC',
      value: 0,
    },
  ],
});

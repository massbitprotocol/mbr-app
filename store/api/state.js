export default () => ({
  list: [],
  api: null,
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
});

<template>
  <div class="">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import Error404 from '../components/Base/Error404';
import Error503 from '../components/Base/Error503';
import Error500 from '../components/Base/Error500';

export default {
  name: 'nuxt-error',
  layout: 'no-header',

  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    errorPage() {
      if (this.error.statusCode === 404) return Error404;
      if (this.error.statusCode === 503) return Error503;

      return Error500;
    },
  },
};
</script>

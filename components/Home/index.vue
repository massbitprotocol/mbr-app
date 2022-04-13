<template>
  <div class="min-h-screen py-15">Home</div>
</template>

<script>
export default {
  beforeCreate() {
    this.$router.push({ name: 'community-nodes' });
  },
};
</script>

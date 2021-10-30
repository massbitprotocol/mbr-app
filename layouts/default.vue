<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader class="bg-white" />

    <main class="container mx-auto flex-auto">
      <Nuxt />
    </main>

    <TheFooter />
    <PortalTarget name="sidebar" />
  </div>
</template>

<script>
export default {
  name: 'Default',

  mode: 'out-in',
};
</script>

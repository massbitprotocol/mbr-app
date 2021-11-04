<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader class="bg-white" />

    <PortalTarget name="breadcrumb" />

    <main class="container mx-auto flex-auto">
      <Nuxt />
    </main>

    <TheFooter />

    <PortalTarget name="sidebar" />

    <BaseNotification />
  </div>
</template>

<script>
export default {
  name: 'Default',

  mode: 'out-in',
};
</script>

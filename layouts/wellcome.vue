<template>
  <div class="flex flex-col min-h-screen">
    <div class="relative overflow-auto h-(screen-92) lg:h-(screen-108)">
      <PortalTarget name="banner" />

      <main class="container mx-auto flex-auto mt-12">
        <Nuxt />
      </main>
    </div>

    <TheFooter />

    <PortalTarget name="sidebar" />

    <BaseNotification />
  </div>
</template>

<script>
export default {
  name: 'Wellcome',

  mode: 'out-in',
};
</script>

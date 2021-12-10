<template>
  <Portal to="breadcrumb" tag="div">
    <div class="w-100 h-[44px] flex items-center bg-primary-background">
      <div class="container mx-auto flex-auto text-body-2 font-medium">
        <span class="text-neutral-normal cursor-pointer" @click="$router.push({ name: 'index' })">Dashboard /</span>
        <span class="text-neutral-normal cursor-pointer" @click="$router.push({ name: 'users' })">Users /</span>
        <span class="text-neutral-mid">User Setting</span>
      </div>
    </div>
  </Portal>
</template>

<script>
export default {
  name: 'DashboardBreadcrumb',
};
</script>

<template>
  <header class="border-b border-b-primary-background h-[88px]">
    <div class="h-full container mx-auto">
      <div class="h-full flex items-center justify-between">
        <TheLogoDark />

        <BaseSecondaryButton class="hidden lg:block" @click="$router.push({ name: 'login' })">
          Login
        </BaseSecondaryButton>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

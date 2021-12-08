<template>
  <div class="flex flex-col items-center justify-center pt-20 pb-30">
    <HomeHeroImage class="max-w-[413px] min-w-[300px]" />

    <div class="text-center text-title-2 lg:text-title-1 text-neutral-darkset font-bold mt-11 mb-3">
      Welcome to Decentralized API Projects
    </div>

    <div class="text-center px-5 text-body-2 lg:text-heading-2 text-neutral-darker font-medium">
      We work with small API providers and validators to form decentralized gateways.
    </div>

    <BaseButton class="mt-10 w-full lg:w-[194px] h-[52px]" @click="$router.push({ name: 'login' })"> Login </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'HomeLogin',
};
</script>

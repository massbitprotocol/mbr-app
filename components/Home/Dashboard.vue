<template>
  <div class="min-h-[80vh] mx-auto w-full">
    <Portal to="banner" tag="div">
      <div
        class="
          bg-vector-pattern bg-bottom bg-transparent bg-no-repeat
          lg:min-h-[530px]
          h-[55vh]
          sm:h-[45vh]
          lg:h-[75vh]
        "
      >
        <div class="h-full">
          <TheHeader class="bg-neutral-lightest" style="border: none" />

          <div class="h-full container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-3 pb-30">
            <div class="flex flex-col">
              <div class="text-title-1 lg:text-medium-title text-neutral-darkset font-bold">
                Welcome to MassBit Route
              </div>

              <div
                class="mt-3 max-w-2xl lg:mt-5 text-body-1 leading-6 lg:text-heading-2 lg:leading-9 text-neutral-darker"
              >
                We work with small API providers and validators to form decentralized gateways. Some API providers only
                utilize 20% of their capacities while validators or miners only do their work to earn rewards but waste
                other resources (data and APIs). With MassBit, our validators earn more rewards and serve numerous DeFi
                and Web3 apps. We also punish nodes for misbehaving!
              </div>
            </div>

            <div
              class="hidden w-full h-full bg-network-pattern bg-center bg-no-repeat lg:block relative overflow-hidden"
            ></div>
          </div>
        </div>
      </div>
    </Portal>

    <div class="mt-15 grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-5">
      <!-- User -->
      <div class="grid grid-cols-1 p-6 rounded-xl bg-statistic-price-pattern bg-neutral-darkset bg-no-repeat bg-right">
        <div class="text-title-2 font-bold text-neutral-white">Decentralized API</div>

        <NuxtLink :to="{ name: 'users' }" class="flex items-center text-body-2 text-neutral-white font-medium pt-8">
          Get Started
          <svg class="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.707 9.29301L12.707 4.29301C12.316 3.90201 11.684 3.90201 11.293 4.29301C10.902 4.68401 10.902 5.31601 11.293 5.70701L14.586 9.00001H3C2.447 9.00001 2 9.44801 2 10C2 10.552 2.447 11 3 11H14.586L11.293 14.293C10.902 14.684 10.902 15.316 11.293 15.707C11.488 15.902 11.744 16 12 16C12.256 16 12.512 15.902 12.707 15.707L17.707 10.707C18.098 10.316 18.098 9.68401 17.707 9.29301Z"
              fill="white"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Gateway -->
      <div class="grid grid-cols-1 p-6 rounded-xl bg-statistic-stake-pattern bg-accent-green bg-no-repeat bg-right">
        <div class="text-title-2 font-bold text-neutral-white">Community Gateway</div>

        <NuxtLink :to="{ name: 'gateways' }" class="flex items-center text-body-2 text-neutral-white font-medium pt-8">
          Get Started
          <svg class="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.707 9.29301L12.707 4.29301C12.316 3.90201 11.684 3.90201 11.293 4.29301C10.902 4.68401 10.902 5.31601 11.293 5.70701L14.586 9.00001H3C2.447 9.00001 2 9.44801 2 10C2 10.552 2.447 11 3 11H14.586L11.293 14.293C10.902 14.684 10.902 15.316 11.293 15.707C11.488 15.902 11.744 16 12 16C12.256 16 12.512 15.902 12.707 15.707L17.707 10.707C18.098 10.316 18.098 9.68401 17.707 9.29301Z"
              fill="white"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Node -->
      <div
        class="grid grid-cols-1 p-6 rounded-xl bg-statistic-transaction-pattern bg-accent-yellow bg-no-repeat bg-right"
      >
        <div class="text-title-2 font-bold text-neutral-white">Community Nodes</div>

        <NuxtLink :to="{ name: 'nodes' }" class="flex items-center text-body-2 text-neutral-white font-medium pt-8">
          Get Started
          <svg class="ml-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.707 9.29301L12.707 4.29301C12.316 3.90201 11.684 3.90201 11.293 4.29301C10.902 4.68401 10.902 5.31601 11.293 5.70701L14.586 9.00001H3C2.447 9.00001 2 9.44801 2 10C2 10.552 2.447 11 3 11H14.586L11.293 14.293C10.902 14.684 10.902 15.316 11.293 15.707C11.488 15.902 11.744 16 12 16C12.256 16 12.512 15.902 12.707 15.707L17.707 10.707C18.098 10.316 18.098 9.68401 17.707 9.29301Z"
              fill="white"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeDashboard',
};
</script>

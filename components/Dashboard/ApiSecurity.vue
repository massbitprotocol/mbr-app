<template>
  <div class="mt-10 lg:mt-15">
    <div class="uppercase text-heading-2 lg:text-title-2 text-neutral-darkset font-semibold lg:font-bold">Security</div>

    <div class="mt-3 lg:mt-4 p-5 bg-white rounded-xl border border-primary-background">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-7.5">
        <div class="flex flex-col gap-2">
          <div class="flex items-center text-body-1 text-neutral-darkset font-semibold">
            <span class="mr-2"> Per second requests rate-limiting </span>

            <BasePopover
              class="flex items-center"
              content="Restrict requests per second for this project. Decimal value, 0 means default limits are applied."
              contentClass="w-[197px]"
              placement="top"
            >
              <div class="flex items-center" v-html="require(`~/assets/svg/icon/info.svg?raw`)"></div>
            </BasePopover>
          </div>

          <input
            class="
              appearance-none
              block
              w-full
              text-body-1 text-neutral-darkset
              font-semibold
              border border-primary-background
              rounded-lg
              py-3
              px-4
              leading-tight
            "
            type="text"
            value="10"
          />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center text-body-1 text-neutral-darkset font-semibold">
            <span class="mr-2"> Allowlist API request method </span>

            <BasePopover
              class="flex items-center"
              content="Protect the integrity of your requests by specifying the allowed API methods."
              contentClass="w-[197px]"
              placement="top"
            >
              <div class="flex items-center" v-html="require(`~/assets/svg/icon/info.svg?raw`)"></div>
            </BasePopover>
          </div>

          <input
            class="
              appearance-none
              block
              w-full
              text-body-1 text-neutral-darkset
              font-semibold
              border border-primary-background
              rounded-lg
              py-3
              px-4
              leading-tight
            "
            type="text"
            value="10"
          />
        </div>
      </div>

      <BaseSecondaryButton class="w-full md:w-auto h-[52px] mt-7.5"> Update </BaseSecondaryButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardApiSecurity',
};
</script>

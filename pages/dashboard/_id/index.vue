<template>
  <div class="pb-20">
    <client-only>
      <DashboardBreadcrumb />
    </client-only>

    <div class="w-full flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between mt-5 mb-3 lg:mt-10 lg:mb-5">
      <div class="text-2xl lg:text-medium-title text-neutral-darkset font-bold">Production</div>

      <client-only>
        <div class="flex justify-between items-center sm:justify-end gap-3 mt-3">
          <div class="flex gap-3 items-center">
            <BaseIconButton class="w-[36px] h-[36px]" icon="edit" />

            <BaseIconButton class="w-[36px] h-[36px]" icon="delete" />
          </div>

          <BasePopover
            class="flex items-center"
            content="Change status of the API key. If you don't want API key active, please switch it off."
            contentClass="w-[197px]"
          >
            <BaseToggle :checked.sync="status" />
          </BasePopover>
        </div>
      </client-only>
    </div>

    <client-only>
      <DashboardApiKey apiKey="8c0f4269-13c8-4fc2-bc55-9960efed45-2312-35355" />

      <DashboardApiProvider />

      <DashboardApiBlockchain />

      <DashboardApiNetwork />

      <DashboardApiSecurity />

      <DashboardApiEntrypoints />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DashboardDetail',
  middleware: ['auth'],
  auth: true,

  data() {
    return {
      status: false,
    };
  },
};
</script>

<template>
  <div
    class="w-full grid grid-cols-1 xl:flex items-center justify-between gap-5 mt-5 py-4 border rounded-2xl border-primary-background"
  >
    <div class="max-w-full xl:max-w-sm w-full flex flex-col justify-between px-0 xl:px-5">
      <!-- Name -->
      <div
        class="px-5 xl:px-0 mb-4 xl:mb-0 text-heading-2 xl:text-heading-1 text-neutral-darkset font-bold overflow-ellipsis whitespace-nowrap break-words overflow-hidden"
      >
        {{ api.name }}
      </div>

      <!-- API key -->
      <div class="bg-primary-darker xl:bg-white py-4 xl:py-0 px-5 xl:px-0">
        <div class="block xl:hidden text-body-2 text-primary-background font-medium">API key</div>

        <div class="w-full inline-flex items-center justify-between gap-2">
          <div class="text-body-2 xl:text-body-1 text-neutral-white xl:text-neutral-darker font-medium truncate">
            {{ api.id | shortenKey }}
          </div>

          <TheCopyButton class="hidden xl:flex" buttonClass="bg-primary-background" :textToCopy="api.id" />
          <TheCopyButtonPrimary class="flex xl:hidden" :textToCopy="api.id" />
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Status</div>
        <div class="mt-1 capitalize text-body-1 text-neutral-darker font-medium truncate">
          {{ api.status }}
        </div>
      </div>
    </div>

    <!-- Created at -->
    <div class="flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Created at</div>
        <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
          {{ api.createdAt | formatTimeUTC }}
        </div>
      </div>
    </div>

    <!-- Zone -->
    <div class="max-w-[180px] w-full flex-shrink px-5">
      <div class="grid grid-cols-1">
        <div class="text-body-2 text-neutral-normal font-medium">Zone</div>
        <div class="mt-1 text-body-1 text-neutral-darker font-medium truncate">
          {{ api.geo && api.geo.continent_name ? api.geo.continent_name : api.zone }}
        </div>
      </div>
    </div>

    <!-- Node Settings -->
    <div
      class="flex flex-col items-end justify-center border-t xl:border-t-none border-primary-background xl:border-transparent px-5 pt-4 xl:pt-0"
    >
      <button
        @click="$router.push({ name: 'nodes-id', params: { id: api.id } })"
        class="max-w-[189px] h-[52px] hidden xl:flex items-center justify-center cursor-pointer bg-neutral-lightest text-primary text-body-1 font-medium px-7.5 rounded-lg hover:bg-neutral-lightest/90 whitespace-nowrap"
      >
        Node Settings
      </button>

      <NuxtLink
        :to="{ name: 'nodes-id', params: { id: api.id } }"
        class="w-full flex xl:hidden items-center justify-between text-body-2 text-primary font-medium hover:text-primary/90"
      >
        <span> Node Settings</span>

        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.707 5.29301L10.707 0.293006C10.316 -0.0979941 9.684 -0.0979941 9.293 0.293006C8.902 0.684006 8.902 1.31601 9.293 1.70701L12.586 5.00001H1C0.447 5.00001 0 5.44801 0 6.00001C0 6.55201 0.447 7.00001 1 7.00001H12.586L9.293 10.293C8.902 10.684 8.902 11.316 9.293 11.707C9.488 11.902 9.744 12 10 12C10.256 12 10.512 11.902 10.707 11.707L15.707 6.70701C16.098 6.31601 16.098 5.68401 15.707 5.29301Z"
            fill="currentColor"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeDashboardApiCard',

  props: {
    api: {
      type: Object,
      default: () => new Object(),
    },
  },

  data() {
    return {
      is_prod: false,
    };
  },

  computed: {
    status: {
      get() {
        return !!parseInt(this.api.status);
      },
      set(value) {
        this.$emit('updateApiStatus', value);
      },
    },
  },
};
</script>

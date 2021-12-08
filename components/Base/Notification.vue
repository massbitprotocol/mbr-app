<template>
  <notifications style="width: auto">
    <template #body="{ item }">
      <template v-if="item.type === 'success'">
        <div
          class="
            w-auto
            flex
            items-center
            justify-center
            bg-accent-green
            mt-30
            p-4
            text-white text-body-2
            font-medium
            rounded-l-lg
          "
        >
          <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/check.svg?raw`)"></div>
          <div v-html="item.text"></div>
        </div>
      </template>

      <template v-if="item.type === 'error'">
        <div
          class="
            w-auto
            flex
            items-center
            justify-center
            bg-accent-red
            mt-30
            p-4
            text-white text-body-2
            font-medium
            rounded-l-lg
          "
        >
          <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/close.svg?raw`)"></div>
          <div v-html="item.text"></div>
        </div>
      </template>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'BaseNotification',
};
</script>

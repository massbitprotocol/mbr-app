<template>
  <notifications style="width: auto" class="mt-30">
    <template #body="{ item }">
      <template v-if="item.type === 'success'">
        <div
          class="w-auto mt-5 flex items-center justify-center bg-accent-green p-4 text-white text-body-2 font-medium rounded-l-lg"
        >
          <div class="flex items-center mr-2" v-html="require(`~/assets/svg/icon/check.svg?raw`)"></div>
          <div v-html="item.text"></div>
        </div>
      </template>

      <template v-if="item.type === 'error'">
        <div
          class="w-auto mt-5 flex items-center justify-center bg-accent-red p-4 text-white text-body-2 font-medium rounded-l-lg"
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

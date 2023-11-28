<script lang="ts" setup>
const props = defineProps({
  error: Object,
});
const hanldeClick = () => {
  // navigateTo({ path: '/' })
  clearError({ redirect: "/" });
};
</script>

<template>
  <n-result
    :status="`${error?.statusCode as 'success'}`"
    :title="`${error?.statusCode} 出错了喔`"
    :description="`${error?.statusMessage ?? error?.message}${
      error?.data?.url ? `: ${error?.data?.url}` : ''
    }`"
    class="grid place-content-center h-screen"
  >
    <template #footer>
      <!-- <pre>cause:{{ error?.cause }}</pre> -->
      <!-- <pre>data:{{ error?.data }}</pre> -->
      <!-- <pre>name:{{ error?.name }}</pre> -->
      <!-- <pre>stack:{{ error?.stack }}</pre> -->
      <n-button @click="hanldeClick" type="primary">返回首页</n-button>
    </template>
  </n-result>
</template>

<style scoped></style>

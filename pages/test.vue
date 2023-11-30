<script lang="ts" setup>
// throw createError({
//   statusCode: 418,
//   // statusMessage: "页面或资源不存在",
//   message: "页面或资源不存在",
//   data: {
//     url: useRoute().fullPath,
//   },
//   fatal: true,
//   // fatal: false,
// });

showError({
  statusCode: 418,
  message: "😱 Oh no, an error has been thrown, there is no index at present",
  data: {
    url: useRoute().fullPath,
  },
  fatal: false,
});
// onErrorCaptured((error) => {
//   console.log("onErrorCaptured:", error);
// });
// console.log("useError():", useError().value);
</script>

<template>
  <div class="bg-red">123</div>
</template>

<style></style>

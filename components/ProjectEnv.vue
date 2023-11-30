<script lang="ts" setup>
const projectENV = await $fetch("/api/getProjectInfo");
</script>

<template>
  <div class="absolute right-2 top-1 text-#6F6F8B">{{ projectENV }}</div>
</template>

<style scoped></style>

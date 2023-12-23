<script lang="ts" setup>
withDefaults(
  defineProps<{
    paginationClass: string;
    listItemsTotal?: number;
    listPageSize?: number;
    currentPage?: number;
    funcUpdatePage?: (currentPage: number) => void;
    funcUpdatePageSize?: (pageSize: number) => void;
  }>(),
  {
    paginationClass: "flex place-content-center mt-7",
  }
);
</script>

<template>
  <n-pagination
    :class="`${paginationClass}`"
    size="large"
    :page-count="Math.ceil((listItemsTotal ?? 1) / (listPageSize ?? 1))"
    :page="currentPage"
    @update:page="funcUpdatePage"
    @update:page-size="funcUpdatePageSize"
  >
    <template #prev>
      <span class="i-mdi:navigate-before text-30px" />
      <span class="text-16px">上一步</span>
    </template>
    <template #next>
      <span class="text-16px">下一步</span>
      <span class="i-mdi:navigate-next text-30px" />
    </template>
  </n-pagination>
</template>

<style scoped></style>

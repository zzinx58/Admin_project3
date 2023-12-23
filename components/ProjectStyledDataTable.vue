<script lang="ts" setup>
import type {
  DataTableColumns,
  DataTableInst,
  DataTableRowKey,
  DataTableCreateRowKey,
} from "naive-ui";
import {} from "naive-ui";

withDefaults(
  defineProps<{
    dataTableClass?: string;
    columns?: DataTableColumns<any>;
    data?: Record<string, any>[];
    rowKey?: DataTableCreateRowKey;
    // 表格是否自动分页数据, 异步状况下可能需要设为 true
    remote?: boolean;
    funcCheckedRowKeys?: () => {};
    funcFilters?: () => {};
    funcSorter?: () => {};
  }>(),
  {
    dataTableClass: "h-660px",
  }
);
const emits = defineEmits<{}>();
const dataTableRef = ref<DataTableInst>();
</script>

<template>
  <div class="oveflow-auto">
    <n-data-table
      ref="dataTableRef"
      :class="`${dataTableClass}`"
      :striped="true"
      :bordered="false"
      :single-line="true"
      :single-column="true"
      :remote="remote"
      @update:checked-row-keys="funcCheckedRowKeys"
      @update:filters="funcFilters"
      @update:sorter="funcSorter"
      :columns="columns"
      :data="data"
      :row-key="rowKey"
    />
  </div>
</template>

<style scoped lang="css">
:deep(.n-data-table .n-data-table-td) {
  padding: 0 8px 0 8px;
}
:deep(.n-data-table-th) {
  /* prettier-ignore */
  --uno: first:rounded-l-10px last:rounded-r-10px h-60px;
  background-color: #70708c;
  font-size: 16px;
}
:deep(.n-data-table-td) {
  /* prettier-ignore */
  --uno: first:rounded-l-10px last:rounded-r-10px h-60px;
  color: #6b7280;
}
</style>

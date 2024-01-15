<script lang="ts" setup>
import {
  type DataTableColumns,
  type DataTableCreateRowKey,
  type DropdownOption,
} from "naive-ui";
//----------------------------------------------------------------
// withDefaults(
//   defineProps<
//     Partial<{
//       data?: Record<string, any>[];
//       rowKey?: DataTableCreateRowKey;
//       funcCheckedRowKeys: () => {};
//       funcFilters?: () => {};
//       funcSorter?: () => {};
//     }>
//   >(),
//   {}
// );
//----------------------------------------------------------------
const {
  t_state,
  availableProjects,
  availableRoundsTotal_for_targetProject,
  availableRecordsTotal,
} = useTournamentStore();
const resetForm = myFuncs.util_resetForm;
//----------------------------------------------------------------
const t_applicants_tableColumns = (): DataTableColumns => {
  return [
    {
      key: "name",
      title: "姓名",
      render(rowData: any) {
        return h(
          "a",
          {
            href: "https://www.baidu.com",
            target: "_blank",
            class: "no-underline text-blue",
          },
          rowData.name
        );
      },
    },
    {
      key: "t_number",
      title: "编号",
    },
    {
      key: "user_id",
      title: "WCU ID",
    },
    {
      title: "|",
      key: "gap",
    },
  ];
};
//----------------------------------------------------------------
const reactive_dropdownPosition = reactive({
  x: 0,
  y: 0,
});
const dropdownSelectedRowData = ref();
const dropdownOptions: DropdownOption[] = [
  {
    label: () =>
      h(
        "span",
        {
          class: "text-red",
          onClick(e: MouseEvent) {
            useNaiveDiscrete().message.info("此功能尚未实现", {});
          },
        },
        `删除 [${dropdownSelectedRowData.value.name}] 选手的本条报名记录`
      ),
    key: "delete",
  },
];
const [ref_showDropdown, toggleShowDropdown] = useToggle();
const tableRowProps = (rowData: any) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      // useNaiveDiscrete().message.info(`${JSON.stringify(rowData, null, 2)}`);
      dropdownSelectedRowData.value = rowData;
      e.preventDefault();
      ref_showDropdown.value = false;
      nextTick().then(() => {
        ref_showDropdown.value = true;
        reactive_dropdownPosition.x = e.clientX;
        reactive_dropdownPosition.y = e.clientY;
      });
    },
  };
};
//----------------------------------------------------------------
</script>

<template>
  <div class="grid grid-rows-[1fr_min-content] w-full">
    <div class="h-590px border border-#6F6F8B border-solid box-border -mb-6px">
      <n-data-table
        ref="dataTableRef"
        :class="`${null} h-590px`"
        :striped="true"
        :bordered="false"
        :single-line="true"
        :single-column="true"
        :remote="true"
        @update:checked-row-keys="() => {}"
        @update:filters="() => {}"
        @update:sorter="() => {}"
        :columns="t_applicants_tableColumns()"
        :data="[
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
          { name: 123 },
        ]"
        :row-key="(rowData) => rowData"
        :row-props="tableRowProps"
      />
    </div>
    <ProjectStyledPagination
      :pagination-class="'flex place-content-center mt-7'"
    ></ProjectStyledPagination>
  </div>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="reactive_dropdownPosition.x"
    :y="reactive_dropdownPosition.y"
    :options="dropdownOptions"
    :show="ref_showDropdown"
    :on-clickoutside="() => (ref_showDropdown = false)"
    @select="() => (ref_showDropdown = false)"
  ></n-dropdown>
</template>

<style scoped lang="css">
:deep(.n-data-table .n-data-table-td) {
  padding: 0 8px 0 8px;
}
:deep(.n-data-table-th) {
  /* prettier-ignore */
  --uno: h-48px px-8px py-0;
  background-color: #70708c;
  font-size: 16px;
}
:deep(.n-data-table-td) {
  /* prettier-ignore */
  --uno:  h-36px;
  color: #6b7280;
}
</style>

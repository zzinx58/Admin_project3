<script lang="ts" setup>
import { cy } from "date-fns/locale";
import {
  type DataTableColumns,
  type DataTableCreateRowKey,
  type DropdownOption,
} from "naive-ui";
//----------------------------------------------------------------
withDefaults(
  defineProps<
    Partial<{
      data?: Record<string, any>[];
      rowKey?: DataTableCreateRowKey;
      funcCheckedRowKeys: () => {};
      funcFilters?: () => {};
      funcSorter?: () => {};
    }>
  >(),
  {}
);
//----------------------------------------------------------------
const ResultListDataFetchParamsReactive = reactive<
  Partial<{
    project: string[];
    page: number;
    size: number;
    q: string | null;
  }>
>({});
const handleSelectedProjectArrUpdate = (_selectedProjectArr: any[]) => {
  ResultListDataFetchParamsReactive.project = _selectedProjectArr.map(
    (item) => item.project_name
  );
};
// Watch true by Default.
// const {
//   data: ResultListData,
//   error: ResultListDataError,
//   refresh: refreshResultListData,
// } = await useFetch("", {
//   method: "get",
//   ...useAdminStore().TokenHeader,
//   query: ResultListDataFetchParamsReactive,
// });
// defineExpose({})
//----------------------------------------------------------------
const t_result_tableColumns = (): DataTableColumns => {
  return [
    {
      title: "姓名",
      key: "name",
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
      title: "编号",
      key: "t_number",
    },
    {
      title: "WCU ID",
      key: "user_id",
    },
    {
      title: "|",
      key: "gap",
    },
    {
      title: "最好成绩(s/秒)",
      key: "best_duration",
    },
    {
      title: "平均成绩(s/秒)",
      key: "avg_duration",
    },
    {
      title: "赛制",
      key: "round_format",
    },
    {
      title: "详情[r1,r2,r3...](s/秒)",
      key: "overviewResults",
    },
    {
      title: "晋级",
      key: "is_rise",
    },
  ];
};
const { t_projectInfos_constants } = useProjectConstants().tournament;
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
        `删除 [${dropdownSelectedRowData.value.name}] 选手的本条赛果记录`
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
  <div class="grid grid-rows-[min-content_1fr_min-content] w-full">
    <div class="grid gap-2">
      <!-- class="justify-self-center" -->
      <div
        class="overflow-auto box-border px-2 max-w-1200px border-(x-amber y-none solid rounded-10px) shadow-inset shadow-lg py-1"
      >
        <CustomCheckGroup
          v-bind="{
            modelValue: [],
            itemsInfoList: t_projectInfos_constants.slice(0, 5),
            selectStrategy: 'multiple',
            targetAttr: 'project_id',
          }"
          class="box-border text-main-btn_primary-negative flex gap-4"
          @update:model-value="(e) => handleSelectedProjectArrUpdate(e)"
        >
          <template #item="{ isItemSelected, itemData }">
            <div
              :class="`
            group box-border h-28px w-90px 
            flex items-center place-content-center gap-2 
            text-12px
            border-(solid 1px rounded-10px)
            ${isItemSelected ? 'text-main-btn_primary-positive' : ''}
            `"
            >
              <div
                group-hover="text-main-btn_primary-positive opacity-70"
                :class="`${itemData.iconMeta}`"
              />
              <div
                class="group-hover:(text-main-btn_primary-positive opacity-70)"
              >
                {{ itemData.project_name }}
              </div>
            </div>
          </template>
        </CustomCheckGroup>
      </div>
      <div class="flex justify-between">
        <div class="flex items-center gap-2 w-270px justify-self-center">
          <label class="text-18px text-main-btn_primary-negative"> 轮次 </label>
          <n-select
            placeholder="请选择目标比赛轮次..."
            v-model:value="ResultListDataFetchParamsReactive.project"
            :options="[]"
          ></n-select>
        </div>
        <div
          class="flex gap-2 items-center text-main-btn_primary-negative text-18px before:(content-[''] block w-58px h-22px bg-green)"
          >晋级</div
        >
      </div>
    </div>
    <div
      class="h-590px box-border border border-#6F6F8B border-solid mt-2 mb-2px"
    >
      <n-data-table
        ref="dataTableRef"
        :class="`${null} h-590px`"
        :striped="true"
        :bordered="false"
        :single-line="true"
        :single-column="true"
        :remote="true"
        @update:checked-row-keys="funcCheckedRowKeys"
        @update:filters="funcFilters"
        @update:sorter="funcSorter"
        :columns="t_result_tableColumns()"
        :data="[
          { name: 123, is_rise: true },
          { name: 'zzx' },
          { name: 123 },
          { name: 321 },
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
        :row-key="rowKey"
        :row-class-name="
          (row) => {
            if (row.is_rise === true) return 'risedItem';
          }
        "
        :row-props="tableRowProps"
      />
    </div>
    <ProjectStyledPagination
      :pagination-class="'flex place-content-center mt-5'"
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
:deep(.risedItem td) {
  background-color: rgba(74, 222, 128, 1) !important;
  color: black !important;
}
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
  --uno: h-36px;
  color: #6b7280;
}
</style>

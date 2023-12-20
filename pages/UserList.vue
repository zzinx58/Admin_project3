div
<script lang="ts" setup>
import { NButton, type DataTableColumns, type DataTableRowKey } from "naive-ui";
import type { FE_itemDataType_getUserList } from "~/types/api_map_types";

/* Page Meta */
definePageMeta({
  layout: "pc",
  title: "用户列表",
  name: "User List",
});
useHeadSafe({
  title: `${route().meta.name} - ${route().meta.title}`,
});

/* Page used Utils */
const { fromUnixTime, format, parseISO } = useDateFns();

/* UserListData Request Logic Handle */
const ulSearchRef = ref();
onKeyStroke(
  "Enter",
  (e) => {
    e.stopPropagation();
    executeFetchUserListData();
  },
  {
    target: ulSearchRef,
  }
);
const userListFilterOptions = [
  {
    label: "ID",
    value: "id", // user_id
  },
  {
    label: "昵称",
    value: "nickname",
  },
  {
    label: "手机号",
    value: "phone",
  },
];
const UserListDataFetchOptionReactive = reactive({
  page: 1,
  size: 10,
  type: null,
  q: null,
});
const {
  data: UserListData,
  error: UserListDataError,
  refresh: refreshUserListData,
  execute: executeFetchUserListData,
} = await useFetch("/api/user/getUserList", {
  method: "get",
  headers: myFuncs.fromPairs([adminStore().ArrPair_authorizationToken]),
  query: UserListDataFetchOptionReactive,
  watch: false,
});
UserListDataError.value &&
  judgeError_for_ReAuthNeed(UserListDataError.value.data, 1000);

/* UserListDataTable Remote Async Logic Scope */
const userListDataTableRef = ref();
const handleUserListDataTableSorterChange = () => {};
const handleUserListDataTableFiltersChange = () => {};
const handleUserListDataTablePageChange = () => {};

/* SelectedUser And DataExport */
const selectedUserRowsRef = ref<Array<any>>([]);
const selectUserHelper_rowKeys = ref<Array<any>>([]);
const selectUserHelperWatcher = ref<{
  newList: any[];
  oldList: any[];
  added: any[];
  removed: any[];
}>();
watchArray(selectUserHelper_rowKeys, (newList, oldList, added, removed) => {
  selectUserHelperWatcher.value = {
    newList: newList,
    oldList: oldList,
    added: added,
    removed: removed,
  };
});
const handleSelectUser = (
  rowKeys: Array<string | number>,
  rows: object[],
  meta: {
    row: object | undefined;
    action: "check" | "uncheck" | "checkAll" | "uncheckAll";
  }
) => {
  switch (meta.action) {
    case "check":
      selectUserHelper_rowKeys.value = rowKeys;
      selectedUserRowsRef.value.push({
        ...rows.pop(),
        register_time: useDateFns()
          .parseISO(
            (meta.row as FE_itemDataType_getUserList)?.register_time ?? ""
          )
          .toLocaleString(),
      });
      break;
    case "uncheck":
      selectUserHelper_rowKeys.value = rowKeys;
      selectedUserRowsRef.value = selectedUserRowsRef.value.filter(
        (item) => item.user_id !== (meta.row as any)!.user_id
      );
      break;
    case "checkAll":
      selectUserHelper_rowKeys.value = rowKeys;
      const newRows = rows
        .filter((item) => item !== undefined)
        .map((item) => ({
          ...item,
          register_time: useDateFns()
            .parseISO(
              (item as FE_itemDataType_getUserList)?.register_time ?? ""
            )
            .toLocaleString(),
        }));
      selectedUserRowsRef.value.push(...newRows);
      break;
    case "uncheckAll":
      selectUserHelper_rowKeys.value = rowKeys;
      const newRowKeys = rowKeys;
      const oldRowKeys = selectUserHelper_rowKeys.value;
      // Naive DataTable uncheckAll behavior is faster than watchArray?
      // console.log(selectUserHelperWatcher.value);
      nextTick(() => {
        const uncheckedKeys = selectUserHelperWatcher.value?.removed;
        // console.log(selectUserHelperWatcher.value);
        selectedUserRowsRef.value = selectedUserRowsRef.value
          .filter((itemA) => !uncheckedKeys?.includes(itemA.user_id))
          .map((item) => ({
            ...item,
            register_time: useDateFns()
              .parseISO(
                (item as FE_itemDataType_getUserList)?.register_time ?? ""
              )
              .toLocaleString(),
          }));
      });
      break;
  }
};

const handleExportSelectedUsers = () => {
  if (selectedUserRowsRef.value.length > 0) {
    const sheetName = `Sheet1`;
    const fileName = `勾选用户数据导出 - ${useDateFns().format(
      new Date(),
      "yyyy年MM月dd日_HH时mm分"
    )}.xlsx`;
    xlsx_json_to_sheet(sheetName, fileName, selectedUserRowsRef.value);
  } else {
    useNaiveDiscrete().message.info("未勾选需要导出数据的用户，请先勾选");
  }
};

/* UserList Data Display */
const userListDataColumns = (): DataTableColumns => {
  return [
    { type: "selection", options: ["all", "none"] },
    {
      key: "user_id",
      title: "用户_ID",
    },
    {
      key: "nickname",
      title: "昵称",
    },
    {
      key: "location_city",
      title: "所在城市",
      titleAlign: "center",
      className: "text-center!",
    },
    {
      key: "register_time",
      title: "注册时间",
      titleAlign: "center",
      className: "text-center!",
      render(rowData: any) {
        return h(
          "div",
          {
            class: "grid text-center",
          },
          [
            h(
              "span",
              `${format(parseISO(rowData.register_time), "yyyy年MM月dd日")}`
            ),
            h("span", `${format(parseISO(rowData.register_time), "HH:mm:ss")}`),
          ]
        );
      },
    },
    {
      key: "phone",
      title: "手机",
      titleAlign: "center",
      className: "text-center!",
    },
    {
      key: "online_status",
      title: "在线状态",
      className: "text-center!",
      render(rowData: any) {
        return h(
          "div",
          {
            class: "flex items-center justify-center",
          },
          [
            h("span", {
              class:
                rowData.online_status === true
                  ? "w-18px h-18px bg-#2CDEA7 rounded-full "
                  : " w-18px h-18px bg-#BBBBBB rounded-full",
            }),
            h("span", rowData.online_status === 1 ? "在线" : "离线"),
          ]
        );
      },
    },
    // {
    //   key: "identity_info",
    //   title: "实名认证",
    //   className: "text-center!",
    //   render(rowData: any) {},
    // },
    // {
    //   key: "points_count",
    //   title: "积分",
    //   className: "text-center!",
    // },
    // {
    //   key: "vocher_count",
    //   title: "道具卷",
    //   titleAlign: "center",
    //   render(rowData: any) {},
    // },
    // {
    //   key: "login_type",
    //   title: "登录方式",
    //   className: "text-center!",
    //   render(rowData: any) {},
    // },
    {
      key: "download_channel",
      title: "下载渠道",
      className: "text-center!",
    },
    {
      key: "action",
      title: "操作",
      titleAlign: "center",
      className: "flex justify-center items-center",
      render(rowData: any) {
        return h(
          "div",
          {
            // class: "flex gap-2 overflow-auto",
            class: "flex gap-2 relative",
          },
          [
            h(
              NButton,
              {
                type: "primary",
                class:
                  "w-80px bg-main-btn_primary-positive text-white rounded-12px text-14px h-40px hover:opacity-80",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-custom-quick:ul-contact" });
                },
                onClick(e) {
                  useNaiveDiscrete().message.info("功能暂未完成");
                },
              },
              "沟通"
            ),
            h(
              NButton,
              {
                quaternary: true,
                class:
                  "w-80px bg-main-btn_primary-negative text-white rounded-12px text-14px h-40px hover:opacity-80",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-custom-quick:ul-detail" });
                },
                onClick(e) {
                  useNaiveDiscrete().message.info("功能暂未完成");
                  // navigateTo(`/UserDetail/${rowData.user_id}`);
                },
              },
              "查看"
            ),
          ]
        );
      },
    },
  ];
};
</script>

<template>
  <!-- <div class="h-full w-full"> -->
  <div class="flex items-center mb-7" ref="ulSearchRef">
    <n-input-group class="w-280px">
      <n-select
        class="w-120px h-36px select_options_style"
        placeholder="全部"
        :options="userListFilterOptions"
        v-model:value="UserListDataFetchOptionReactive.type"
        :fallback-option="false"
      />
      <n-input
        class="rounded-10px"
        placeholder="输入查找参数..."
        v-model:value="UserListDataFetchOptionReactive.q"
      >
        <template #suffix>
          <n-button
            quaternary
            type="primary"
            @click="executeFetchUserListData()"
          >
            <template #icon>
              <div class="i-custom-base:nav-search" />
            </template>
          </n-button>
        </template>
      </n-input>
    </n-input-group>
    <!-- <n-button
        class="rounded-24px w-96px text-16px"
        type="primary"
        icon-placement="right"
        @click=""
        >更多
        <template #icon>
          <div class="i-ep:arrow-down" />
        </template>
      </n-button> -->
  </div>
  <div class="overflow-auto">
    <!-- :row-class-name="() => ''" -->
    <n-data-table
      class="h-660px"
      :columns="userListDataColumns()"
      :data="UserListData?.resultData.items"
      :striped="true"
      :bordered="false"
      :single-line="true"
      :single-column="true"
      :row-key="(row) => row.user_id"
      @update:checked-row-keys="handleSelectUser"
      remote
      ref="userListDataTableRef"
      @update-sorter="handleUserListDataTableSorterChange"
      @update-filters="handleUserListDataTableFiltersChange"
      @update-page="handleUserListDataTablePageChange"
    />
  </div>
  <div
    class="flex items-center gap-2 text-dataTable-base-hintText text-16px mt-3 ml-7"
  >
    <span>
      已选
      <span class="text-main-btn_primary-positive">
        {{
          `${selectedUserRowsRef.length}/${
            UserListData?.resultData.items_total ?? undefined
          }`
        }}
      </span>
      位用户
    </span>
    <n-button
      type="primary"
      class="rounded-10px"
      @click="handleExportSelectedUsers"
    >
      导出选中用户
    </n-button>
    <n-button type="primary" class="rounded-10px" @click="">
      发送邮件
    </n-button>
  </div>
  <n-pagination
    class="flex place-content-center mt-7"
    size="large"
    :page-count="
      Math.ceil(
        (UserListData?.resultData.items_total ?? 1) /
          UserListDataFetchOptionReactive.size
      )
    "
    :page="UserListDataFetchOptionReactive.page"
    @update-page="
      (currentPage: number) => {
        UserListDataFetchOptionReactive.page = currentPage;
        executeFetchUserListData();
      }
    "
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
  <!-- </div> -->
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

:deep(.select_options_style .n-base-selection-label) {
  background-color: #70708c !important;
  height: 36px;
}
:deep(.select_options_style .n-base-selection-placeholder__inner) {
  color: white;
}
:deep(.select_options_style .n-base-selection-input__content) {
  color: white;
}
:deep(.select_options_style .n-base-suffix__arrow svg) {
  color: white;
}
</style>

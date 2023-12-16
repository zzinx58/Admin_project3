<script lang="ts" setup>
import { NButton, type DataTableColumns } from "naive-ui";

/* Page Meta */
definePageMeta({
  layout: "pc",
});
useHeadSafe({
  title: "U_List - 用户列表",
});

/* Page used Utils */
const { fromUnixTime, format, parseISO } = useDateFns();

/* UserListData Request Logic Handle */
const userListFetchOptionReactive = reactive({
  page: 1,
  size: 10,
});
const userListSearchReactive = reactive({
  type: undefined,
  q: "",
});
const {
  data: UserListData,
  refresh: refreshUserListData,
  error: UserListDataError,
  execute: executeFetchUserListData,
} = await useFetch("/api/user/getUserList", {
  method: "get",
  headers: myFuncs.fromPairs([adminStore().ArrPair_authorizationToken]),
  params: {
    page: userListFetchOptionReactive.page,
    size: userListFetchOptionReactive.size,
    ...userListSearchReactive,
  },
  watch: [userListFetchOptionReactive],
});
UserListDataError.value &&
  judgeError_for_ReAuthNeed(UserListDataError.value.data, 1000);

/* SelectedUser Export */
const selectedUserRowsRef = ref<Array<any>>([]);

const handleExportSelectedUsers = () => {
  if (selectedUserRowsRef.value.length > 0) {
    const sheetName = `Sheet1`;
    const fileName = `勾选用户数据导出 - ${useDateFns().format(
      new Date(),
      "yyyy-MM-dd HH:mm"
    )}`;
    xlsx_json_to_sheet(sheetName, fileName, selectedUserRowsRef.value);
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
            class: "flex gap-5",
          },
          [
            h(
              NButton,
              {
                quaternary: true,
                class:
                  "bg-main-btn_primary-positive text-white rounded-12px text-14px h-40px",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-custom-quick:ul-contact" });
                },
                onClick(e) {
                  useNaiveMessage().info("功能暂未完成");
                },
              },
              "沟通"
            ),
            h(
              NButton,
              {
                quaternary: true,
                class:
                  "bg-main-btn_primary-negative text-white rounded-12px text-14px h-40px",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-custom-quick:ul-detail" });
                },
                onClick(e) {
                  useNaiveMessage().info("功能暂未完成");
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
  <div class="h-full w-full">
    <!-- <pre>{{ new Date() }}</pre> -->
    <n-data-table
      class="h-660px"
      :columns="userListDataColumns()"
      :data="UserListData?.resultData.items"
    />
  </div>
  <div
    class="flex justify-center"
    @click="
      () => {
        userListFetchOptionReactive.page += 1;
      }
    "
  >
    change{{ userListFetchOptionReactive.page }}
  </div>
</template>

<style scoped lang="css">
:deep(.n-data-table .n-data-table-td) {
  padding: 0 8px 0 8px;
}

:deep(.n-data-table-th) {
  --uno: first: (rounded-l-10px) last: (rounded-r-10px) h-60px;
  background-color: #70708c;
  font-size: 16px;
}
:deep(.n-data-table-td) {
  --uno: first: (rounded-l-10px) last: (rounded-r-10px) h-60px;
}
:deep(.n-data-table-td) {
  color: #6b7280;
}
</style>

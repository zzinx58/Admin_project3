<script lang="ts" setup>
useHead({
  title: "Test",
});

//----------------------------------------------------------------
// ok.
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
// showError({
//   statusCode: 418,
//   message: "😱 Oh no, an error has been thrown, there is no index at present",
//   data: {
//     url: useRoute().fullPath,
//   },
//   fatal: false,
// });
// onErrorCaptured((error) => {
//   console.log("onErrorCaptured:", error);
// });

// ----------------------------------------------------------------
// ok.
// const naiveMessage = useNaiveMessage();
// useNaiveMessage().info("Here is composable useNaiveMessage from `Test.vue`");
// naiveMessage.info(
//   adminStore().adminInfo.username ?? "username is invalid value"
// );
// ----------------------------------------------------------------
// ok.
const testAdminLogin = async () => {
  await adminStore().login({
    username: "admin",
    password: "123456",
  });
};
// ----------------------------------------------------------------
const testListFetchOptionReactive = reactive({
  page: 1,
  size: 10,
  type: undefined,
  q: "",
});
const { data: rawData, refresh: refreshTestData } = await useFetch(
  "/api/test",
  {
    method: "get",
    watch: [testListFetchOptionReactive],
  }
);
const columns = [
  {
    title: "id",
    key: "id",
  },
  {
    title: "age",
    key: "age",
    sorter(rowA: any, rowB: any) {
      return rowA.age - rowB.age;
    },
  },
];
// ----------------------------------------------------------------
// const { data: test } = await useFetch("/api/admin/getAdminsList?test1=123", {
//   method: "get",
//   headers: myFuncs.fromPairs([userStore().ArrPair_authorizationToken]),
//   query: {
//     test2: 123,
//   },
// });
// console.log(test.value);

const { data: adminList, refresh: refreshAdminListData } = await useFetch(
  "/api/admin/getAdminList",
  // myFuncs.fromPairs([
  //   ["method", "Get"],
  //   ["headers", myFuncs.fromPairs([userStore().ArrPair_authorizationToken])],
  //   ["query", myFuncs.fromPairs([])],
  // ])
  myFuncs.fromPairs([
    ["method", "Get"],
    ["headers", myFuncs.fromPairs([adminStore().ArrPair_authorizationToken])],
    [
      "query",
      {
        page: 1,
        size: 10,
      },
    ],
  ])
);
// ----------------------------------------------------------------
const {
  data: userList,
  refresh: refreshUserList,
  error: getUserListError,
} = await useFetch("/api/user/getUserList", {
  method: "get",
  headers: myFuncs.fromPairs([adminStore().ArrPair_authorizationToken]),
  query: {
    page: 1,
    size: 10,
  },
});
// ----------------------------------------------------------------
const {
  of,
  defaultIfEmpty,
  pipe,
  useObservable,
  from,
  interval,
  takeUntil,
  useSubscription,
} = useRxjs();
// of(rawData.value)
// from(_.defaultTo(rawData.value, []))
//   .pipe(takeUntil(interval(10000)))
//   .pipe(defaultIfEmpty("null"))
//   .subscribe((x) => console.log(x));
// ----------------------------------------------------------------
</script>

<template>
  <pre>{{ adminStore().$state }}</pre>
  <n-space>
    <n-button type="primary" @click="testAdminLogin">Admin 登录</n-button>
    <n-button type="primary" @click="adminStore().logout()"
      >Admin 登出</n-button
    >
  </n-space>
  <hr />
  <!-- :data="dataT" -->
  <n-data-table
    :data="rawData?.data"
    :columns="columns"
    :pagination="{
      pageSize: 10,
    }"
  ></n-data-table>
  <!-- <n-button type="primary" @click="handleTestRefresh">刷新 test 数据</n-button> -->
  <n-space>
    <n-button
      type="primary"
      @click="() => (testListFetchOptionReactive.size += 1)"
      >变更参数，刷新 test 数据</n-button
    >
    <n-button type="primary" @click="refreshTestData()"
      >刷新 test 数据</n-button
    >
  </n-space>
  <hr />
  <pre>{{ adminList }}</pre>
  <n-button type="primary" @click="refreshAdminListData()"
    >刷新 adminList 数据</n-button
  >
  <hr />
  <pre>{{ userList ?? getUserListError }}</pre>
  <n-button type="primary" @click="refreshUserList()"
    >刷新 userList 数据</n-button
  >
</template>

<style></style>

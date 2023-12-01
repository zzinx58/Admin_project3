<script lang="ts" setup>
useHead({
  title: "Test",
});
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
const naiveMessage = useNaiveMessage();
useNaiveMessage().info("Here is composable useNaiveMessage from `Test.vue`");
naiveMessage.info(
  adminStore().adminInfo.username ?? "username is invalid value"
);
// ----------------------------------------------------------------
const { data: rawData, refresh } = await useFetch("/api/test");
const handleRefresh = async () => {
  await refresh();
  dataT.value = rawData.value ?? [];
};
const dataT = ref(rawData.value ?? []);
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
const testAdminLogin = async () => {
  await adminStore().login({
    username: "admin",
    password: "123456",
  });
};
// ----------------------------------------------------------------
// const { data: test } = await useFetch("/api/admin/getAdminsList?test1=123", {
//   method: "get",
//   headers: Object.fromEntries([userStore().ArrPair_authorizationToken]),
//   query: {
//     test2: 123,
//   },
// });
// console.log(test.value);

// ----------------------------------------------------------------
const { data: test } = await useFetch(
  "/api/admin/getAdminList",
  // Object.fromEntries([
  //   ["method", "Get"],
  //   ["headers", Object.fromEntries([userStore().ArrPair_authorizationToken])],
  //   ["query", Object.fromEntries([])],
  // ])
  _.fromPairs([
    ["method", "Get"],
    ["headers", _.fromPairs([adminStore().ArrPair_authorizationToken])],
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
  <n-data-table
    :columns="columns"
    :data="dataT"
    :pagination="{
      pageSize: 10,
    }"
  ></n-data-table>
  <n-button type="primary" @click="handleRefresh">刷新 test 数据</n-button>
  <pre>{{ test }}</pre>
</template>

<style></style>

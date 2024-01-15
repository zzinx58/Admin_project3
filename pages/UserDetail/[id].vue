<script lang="ts" setup>
definePageMeta({
  layout: "pc",
  title: "用户详情",
  name: "User Detail",
});
useHeadSafe({
  title: `${route().meta.name} - ${route().meta.title}`,
});

const {
  UserDetailPart1Prefix,
  UserDetailPart2Prefix,
  UserDetailPart3_subPart1Prefix,
  UserDetailPart3_subPart2Prefix,
} = useProjectConstants().userDetail;

import type { KeyValueLikeItemPrefixType } from "~/constants";
const [DefineDataItem, ReuseDataItem] = createReusableTemplate<
  KeyValueLikeItemPrefixType & { value?: any | typeof h }
>();
const [DefineUserDetailPart1, ReuseUserDetailPart1] = createReusableTemplate();
const [DefineUserDetailPart2, ReuseUserDetailPart2] = createReusableTemplate();
const [DefineUserDetailPart3, ReuseUserDetailPart3] = createReusableTemplate();

const { parseISO, format } = useDateFns();
const { parseISO: parseISO_FP, format: format_FP } = useDateFns_FP();
const UserDetailPart1Formatter: Record<string, any> = {
  identity_info: () => {},
  register_time: (register_time_ISO: string) => {
    return format(parseISO(register_time_ISO), "yyyy.MM.dd HH:mm:ss");
  },
  online_time_count: (timeCountInSeconds: number) => {
    const hours = Math.floor(timeCountInSeconds / 3600);
    const minutes = Math.floor((timeCountInSeconds % 3600) / 60);
    const seconds = Math.floor(timeCountInSeconds % 60);
    const formatEachPartFunc = (value: number) => {
      return String(value).padStart(2, "0");
    };
    return [hours, minutes, seconds].map(formatEachPartFunc).join(":");
  },
};
const UserDetailPart3Formatter = {
  log_in_out_time: (login_or_out_timeRange_ISO: [string, string]) => {
    return login_or_out_timeRange_ISO
      .map(parseISO_FP)
      .map(format_FP("yyyy.MM.dd HH:mm:ss"))
      .join(" / ");
  },
};

const dataSource: Record<string, any> = {
  nick_name: "zzx",
  // nick_name: undefined,
  user_id: 58,
};
const renderObj: Record<string, any> = {
  nick_name: () => {
    const value = dataSource["nick_name"];
    if (value) return h("div", { class: "" }, `My name is ${value}.`);
    else return "没有数据";
  },
};
</script>

<template>
  <!-- UserDetailPart-start -->
  <DefineDataItem v-slot="{ value, ItemClass, label }">
    <div :class="`flex gap-2 ${ItemClass}`">
      <dt>{{ label }}</dt>
      <component
        :is="
          (() => {
            if (!value) return h('dd', '没有数据');
            else if (typeof value !== typeof h) return h('dd', value);
            else return value;
          })()
        "
      />
    </div>
  </DefineDataItem>
  <DefineUserDetailPart1>
    <dl class="userDetailPart1">
      <ReuseDataItem
        v-for="item in UserDetailPart1Prefix"
        v-bind="{
          value: renderObj[item.key] ?? dataSource[item.key], // h() / any
          ...item,
        }"
      ></ReuseDataItem>
    </dl>
  </DefineUserDetailPart1>
  <DefineUserDetailPart2>
    <dl class="userDetailPart2">
      <ReuseDataItem
        v-for="item in UserDetailPart2Prefix"
        v-bind="{
          value: undefined,
          ...item,
        }"
      ></ReuseDataItem>
    </dl>
  </DefineUserDetailPart2>
  <DefineUserDetailPart3>
    <dl class="userDetailPart3">
      <section :class="`UDP3_subPart1`">
        <ReuseDataItem
          v-for="item in UserDetailPart3_subPart1Prefix"
          v-bind="{
            value: undefined,
            ...item,
          }"
        ></ReuseDataItem>
      </section>
      <section :class="`UDP3_subPart2`">
        <ReuseDataItem
          v-for="item in UserDetailPart3_subPart2Prefix"
          v-bind="{
            value: undefined,
            ...item,
          }"
        ></ReuseDataItem>
      </section>
    </dl>
  </DefineUserDetailPart3>
  <!-- UserDetailPart-end -->
  <!-- UserCompeteData-start -->
  <!-- UserCompeteData-end -->
  <!--UserTournamentPart-start  -->
  <!-- UserTournamentPart-end -->
  <!-- UserAccountPart-start -->
  <!-- UserAccountPart-end -->
  <div class="userDetailPartContainer">
    <ReuseUserDetailPart1></ReuseUserDetailPart1>
    <ReuseUserDetailPart2></ReuseUserDetailPart2>
    <ReuseUserDetailPart3></ReuseUserDetailPart3>
  </div>
</template>

<style scoped lang="css">
.userDetailPartContainer {
  --uno: bg-#70708C;
  --uno: divide-y;
  --uno: text-white text-16px;
  /* prettier-ignore */
  --uno: grid grid-rows-[repeat(3,min-content)] xl:grid-cols-[repeat(3,auto)] 2xl:grid-cols-[repeat(4,auto)];
  --uno: gap-x-5;

  :is(.userDetailPart1, .userDetailPart2, .userDetailPart3) {
    --uno: col-span-full;
    --uno: grid grid-cols-subgrid gap-y-5;

    & > dl {
      --uno: m-0;
    }
    & > dd {
      --uno: m-0;
    }
    /* prettier-ignore */
    dd {
      --uno: m-0;
    }
  }

  .userDetailPart3 {
    .UDP3_subPart1 {
      /* prettier-ignore */
      --uno: xl:col-span-3 grid grid-cols-subgrid gap-y-5;
    }
    .UDP3_subPart2 {
      /* prettier-ignore */
      --uno: grid gap-5 xl:(col-span-3) 2xl:(col-span-1 grid-cols-[auto_auto]);
    }
  }
}
</style>

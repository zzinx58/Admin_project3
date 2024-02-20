<script lang="ts" setup>
definePageMeta({
  layout: "pc",
  title: "用户详情",
  name: "User Detail",
  showExportData: true,
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

import type { DataTableColumns } from "naive-ui";
import type { DataExportOptionType } from "~/components/ProjectDataExportHeader.vue";
import type { KeyValueLikeItemPrefixType } from "~/constants";
const [DefineDataItem, ReuseDataItem] = createReusableTemplate<
  KeyValueLikeItemPrefixType & { value?: any | typeof h }
>();
const [DefineUserDetailPart1, ReuseUserDetailPart1] = createReusableTemplate();
const [DefineUserDetailPart2, ReuseUserDetailPart2] = createReusableTemplate();
const [DefineUserDetailPart3, ReuseUserDetailPart3] = createReusableTemplate();
const [DefineNTabsPart, ReuseNTabsPart] = createReusableTemplate<{
  partTitle: string;
  tabsData: string[];
  handlePartTabChange?: (...value: any) => void;
}>();

const ref_eachPartCurrentTabColumnData = reactive({
  part1: 1,
  part2: 1,
  part3: 1,
});
const columnsDataPart1 = (): DataTableColumns => {
  const tab1ColumnData: DataTableColumns = [
    {
      title: "最佳复原时长",
      key: "best_duration",
    },
    {
      title: "完成率",
      key: "completion_rate",
    },
    {
      title: "当前排名",
      key: "current_ranking",
    },
    {
      title: "最高排名",
      key: "highest_ranking",
    },
    {
      title: "最佳AO5",
      key: "best_ao5_duration",
    },
    {
      title: "最佳AO12",
      key: "best_ao12_duration",
    },
    {
      title: "最佳AO100",
      key: "best_ao100_duration",
    },
    {
      title: "完成次数",
      // key: "completions_count",
      key: "completions_count_timeTrial",
    },
  ];
  const tab2ColumnData: DataTableColumns = [
    {
      title: "月段位/最高段位",
      key: "rank_data",
    },
    {
      title: "月奖杯/最高奖杯",
      key: "cup_data",
      render(rowData, rowIndex) {
        return h(
          "div",
          // (rowData.cup_data as string).split("/").join("\u00a0/ ")
          rowData.cup_data as string
        );
      },
    },
    {
      title: "月胜场/总胜场",
      key: "win_data",
    },
    {
      title: "月败场/总败场",
      key: "lose_data",
    },
    {
      title: "月平局/总平局",
      key: "draw_data",
    },
    {
      title: "月连胜/最高连胜",
      key: "winning_streak_data",
    },
  ];
  const tab3ColumnData: DataTableColumns = [
    {
      title: "参加次数",
      key: "participations_count",
    },
    {
      title: "完成次数",
      key: "completions_count_multiQuickTwist",
    },
    {
      title: "最佳排名",
      key: "best_ranking",
    },
    {
      title: "最佳AO5",
      key: "best_ao5",
    },
  ];
  const tab4ColumnData: DataTableColumns = [
    {
      title: "战队ID",
      key: "guild_id",
    },
    {
      title: "战队名称",
      key: "guild_name",
    },
    {
      title: "战队等级",
      key: "guild_level",
    },
    {
      title: "成员数量",
      key: "guild_members_count",
    },
    {
      title: "个人职称",
      key: "self_title_in_guild",
    },
    {
      title: "战队地区",
      key: "guild_region",
    },
    {
      title: "加入战队时间",
      key: "guild_join_time",
    },
  ];
  const tab5ColumnData: DataTableColumns = [
    {
      title: "成就",
      key: "achievement_count",
    },
    {
      title: "完成任务数",
      key: "task_completions_count",
    },
    {
      title: "公式广场CFOP练习公式ID",
      key: "cfop_formula_id",
    },
    {
      title: "完成练习数",
      key: "practice_completions_count",
    },
  ];
  switch (ref_eachPartCurrentTabColumnData.part1) {
    case 1:
      return tab1ColumnData;
    case 2:
      return tab2ColumnData;
    case 3:
      return tab3ColumnData;
    case 4:
      return tab4ColumnData;
    case 5:
      return tab5ColumnData;
    default:
      return tab1ColumnData;
  }
};
const columnsDataPart2 = (): DataTableColumns => {
  const tab1ColumnData: DataTableColumns = [
    {
      title: "赛事名称",
      key: "name",
    },
    {
      title: "模式",
      key: "mode",
    },
    {
      title: "项目",
      key: "p_name",
    },
    {
      title: "排名",
      key: "rank",
    },
    {
      title: "单次",
      key: "",
    },
    {
      title: "平均",
      key: "avg_duration",
    },
    {
      title: "详情",
      key: "rounds_duration_detail",
    },
    {
      title: "更新日期",
      key: "update_date",
    },
  ];
  return tab1ColumnData;
};
const columnsDataPart3 = (): DataTableColumns => {
  const tab1ColumnData: DataTableColumns = [
    {
      title: "积分",
      key: "points_count",
    },
    {
      title: "兑换卷",
      key: "vocher_count",
    },
    {
      title: "拥有物品ID",
      key: "owned_item_id",
    },
    {
      title: "中奖记录",
      key: "prize_record",
    },
  ];
  const tab2ColumnData: DataTableColumns = [
    {
      title: "收件人",
      key: "recipient_name",
    },
    {
      title: "手机",
      key: "recipient_phone",
    },
    {
      title: "订单状态",
      key: "order_status",
    },
    {
      title: "收件地址",
      key: "shipping_address",
    },
  ];
  switch (ref_eachPartCurrentTabColumnData.part3) {
    case 1:
      return tab1ColumnData;
    case 2:
      return tab2ColumnData;
    default:
      return tab1ColumnData;
  }
};
const part1TabsNameArr = ["计时赛", "排位赛", "多人速拧", "战队", "练习&任务"];
const part2TabsNameArr = ["WCU 赛事", "WCA 赛事"];
const part3TabsNameArr = ["基础信息", "订单信息"];

/* Data Export Part */
const dataExportOptionsInfoArr: DataExportOptionType[] = [
  {
    optionLabel: "基础资料",
    relatedFunc: () => {
      myFuncs.handleExportData([], "用户基础资料导出");
    },
  },
  {
    optionLabel: "竞赛数据",
    relatedFunc: () => {
      myFuncs.handleExportData([], "用户竞赛数据导出");
    },
  },
  {
    optionLabel: "赛事数据",
    relatedFunc: () => {
      myFuncs.handleExportData([], "用户赛事数据导出");
    },
  },
  {
    optionLabel: "账户信息",
    relatedFunc: () => {
      myFuncs.handleExportData([], "用户账户信息导出");
    },
  },
];
emitter.emit("dataExport", dataExportOptionsInfoArr);

const { format } = useDateFns();
// console.log(route().params);
const { data: userDetailRawData } = await useFetch("/api/user/getUserDetail", {
  method: "get",
  ...adminStore().TokenHeader,
  // query: {
  // uid: 117,
  // },
  query: route().params as object,
});
const dataSource: Ref<Record<string, any>> = computed(() =>
  myFuncs.flattenObject(userDetailRawData.value ?? {})
);
const renderSolver = (value: any) => {
  if (!value) return h("dd", "没有数据");
  else if (typeof value !== typeof h) return h("dd", value);
  else return value;
};

const renderObj = (itemKey: string) => {
  const value = dataSource.value[itemKey];
  const solverObj: Record<string, any> = {
    identity_info: () => {
      return "无数据";
    },
    register_time: () => {
      return value && format(value, "yyyy.MM.dd HH:mm:ss");
    },
  };
  return solverObj[itemKey] ?? value;
  // online_time_count: (timeCountInSeconds: number) => {
  //   const hours = Math.floor(timeCountInSeconds / 3600);
  //   const minutes = Math.floor((timeCountInSeconds % 3600) / 60);
  //   const seconds = Math.floor(timeCountInSeconds % 60);
  //   const formatEachPartFunc = (value: number) => {
  //     return String(value).padStart(2, "0");
  //   };
  //   return [hours, minutes, seconds].map(formatEachPartFunc).join(":");
  // },
  // log_in_out_time: (login_or_out_timeRange_ISO: [string, string]) => {
  //   return login_or_out_timeRange_ISO
  //     .map(parseISO_FP)
  //     .map(format_FP("yyyy.MM.dd HH:mm:ss"))
  //     .join(" / ");
  // },
};
</script>

<template>
  <!-- UserDetailPart-start -->
  <DefineDataItem v-slot="{ value, ItemClass, label }">
    <div :class="`flex gap-2 ${ItemClass}`">
      <dt>{{ label }}</dt>
      <component :is="renderSolver(value)" />
    </div>
  </DefineDataItem>
  <DefineUserDetailPart1>
    <dl class="userDetailPart1">
      <ReuseDataItem
        v-for="item in UserDetailPart1Prefix"
        v-bind="{
          value: renderObj(item.key),
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
          value: renderObj(item.key),
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
            value: renderObj(item.key),
            ...item,
          }"
        ></ReuseDataItem>
      </section>
      <section :class="`UDP3_subPart2`">
        <ReuseDataItem
          v-for="item in UserDetailPart3_subPart2Prefix"
          v-bind="{
            value: renderObj(item.key),
            ...item,
          }"
        ></ReuseDataItem>
      </section>
    </dl>
  </DefineUserDetailPart3>
  <!-- UserDetailPart-end -->

  <div class="grid gap-10">
    <div class="userDetailPartContainer">
      <div>
        <div
          class="rounded-18px bg-main-btn_primary-positive leading-36px text-27px h-36px w-[clamp(127px,25%,158px)] p-x-4"
        >
          ID：{{ dataSource.user_id ?? "用户不存在" }}
        </div>
      </div>
      <ReuseUserDetailPart1></ReuseUserDetailPart1>
      <hr class="col-span-full w-full" />
      <ReuseUserDetailPart2></ReuseUserDetailPart2>
      <hr class="col-span-full w-full" />
      <ReuseUserDetailPart3></ReuseUserDetailPart3>
    </div>
    <!--  -->
    <DefineNTabsPart
      v-slot="{ partTitle, tabsData, $slots, handlePartTabChange }"
    >
      <div class="grid">
        <div
          class="text-main-btn_primary-negative text-28px justify-self-center mb-6"
        >
          {{ partTitle }}
        </div>
        <n-tabs
          type="card"
          :default-value="tabsData[0]"
          @update:value="handlePartTabChange"
          class=""
        >
          <n-tab v-for="(item, index) in tabsData" :name="item" />
        </n-tabs>
        <component :is="$slots.default" />
      </div>
    </DefineNTabsPart>
    <ReuseNTabsPart
      v-bind="{
        partTitle: '竞赛数据',
        tabsData: part1TabsNameArr,
        handlePartTabChange: (value: any) => {
          switch (value) {
            case part1TabsNameArr[0]:
              ref_eachPartCurrentTabColumnData.part1 = 1;
              break;
            case part1TabsNameArr[1]:
              ref_eachPartCurrentTabColumnData.part1 = 2;
              break;
            case part1TabsNameArr[2]:
              ref_eachPartCurrentTabColumnData.part1 = 3;
              break;
            case part1TabsNameArr[3]:
              ref_eachPartCurrentTabColumnData.part1 = 4;
              break;
            case part1TabsNameArr[4]:
              ref_eachPartCurrentTabColumnData.part1 = 5;
              break;
          }
        },
      }"
    >
      <n-data-table :columns="columnsDataPart1()" :data="[dataSource]" />
    </ReuseNTabsPart>
    <ReuseNTabsPart
      v-bind="{
        partTitle: '赛事数据',
        tabsData: part2TabsNameArr,
      }"
    >
      <n-data-table :columns="columnsDataPart2()" :data="[dataSource]" />
    </ReuseNTabsPart>
    <ReuseNTabsPart
      v-bind="{
        partTitle: '账户信息',
        tabsData: part3TabsNameArr,
        handlePartTabChange: (value: any) => {
          switch (value) {
            case part3TabsNameArr[0]:
              ref_eachPartCurrentTabColumnData.part3 = 1;
              break;
            case part3TabsNameArr[1]:
              ref_eachPartCurrentTabColumnData.part3 = 2;
              break;
          }
        },
      }"
    >
      <n-data-table :columns="columnsDataPart3()" :data="[]" />
    </ReuseNTabsPart>
  </div>
</template>

<style scoped lang="css">
:deep(.n-data-table-th) {
  --uno: h-40px text-16px;
  --uno: "bg-main-btn_primary-negative";
}

:deep(.n-tabs-tab-pad) {
  --uno: w-0;
}
:deep(.n-tabs-tab) {
  /* --uno: "bg-main-btn_primary-negative!"; */
  --uno: "bg-#EDF1FE";
}
:deep(.n-tabs-tab__label) {
  --uno: text-main-btn_primary-negative text-20px;
}
:deep(.n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab) {
  --uno: bg-#EDF1FE;
}
:deep(
    .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active
  ) {
  --uno: bg-main-btn_primary-negative;
}
:deep(
    .n-tabs
      .n-tabs-nav.n-tabs-nav--card-type
      .n-tabs-tab.n-tabs-tab--active
      .n-tabs-tab__label
  ) {
  --uno: text-white;
}

.userDetailPartContainer {
  --uno: bg-#70708C rounded-27px;
  --uno: px-6 pb-6 pt-4;
  /* prettier-ignore */
  --uno: 2xl:w-1600px;
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

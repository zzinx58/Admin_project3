<script lang="ts" setup>
import { timeInterval } from "rxjs";
import { use_BS_logics } from "~/composables/BS-related";

const {
  differenceInCalendarDays,
  getISODay,
  isSameDay,
  getTime,
  isBefore,
  fromUnixTime,
  format,
} = useDateFns();
const [DefineDayGroupRowDatasTable, DayGroupRowDatasTable] =
  createReusableTemplate<{
    currentDayIndex: number;
    dayGroupItems: FinalDayGroupItemType[];
  }>();

const tableHeaderInfo: {
  label: string;
  key: string;
}[] = [
  {
    label: "时间",
    key: "time_range",
  },
  {
    label: "项目",
    key: "content_obj",
  },
  {
    label: "轮次",
    key: "phase_name",
  },
  {
    label: "赛制",
    key: "round_format",
  },
  {
    label: "及格线",
    key: "passline",
  },
  {
    label: "还原时限",
    key: "reduction_limit",
  },
  {
    label: "晋级",
    key: "promotion_quota",
  },
];

type FinalDayGroupItemType = {
  time_range: string;
  content_obj: {
    name: string;
    iconMeta?: string;
  };
  round_format?: string;
  promotion_quota?: string;
  reduction_limit?: string;
  passline?: string;
};

type DayGroupItemType = {
  time_range: [number, number];
  content_obj: {
    name: string;
    iconMeta?: string;
  };
  phase_name?: string;
  round_format?: string;
  passline?: number;
  reduction_limit?: number;
  promotion_quota?: number;
};
type ComponentNeededOriginFields = {
  time_range: [number, number];
  iconMeta: string;
  name: string;
  passline: number;
  reduction_limit: number;
  roundsDetail: {
    id: number;
    time_range: [number, number];
    t_format: number;
    promotion_quota: number;
  }[];
  //
  break_time: {
    id: number;
    time_range: [number, number];
  }[];
  lottery_time: {
    id: number;
    time_range: [number, number];
  }[];
};

const { t_state: TypeUse_t_state } = useTournamentStore();
const props = defineProps<{
  t_state: typeof TypeUse_t_state & {
    break_time: { id: number; time_range?: [number, number] }[];
    lottery_time: { id: number; time_range?: [number, number] }[];
  };
}>();
const t_state = props.t_state;

const DataParser = () => {
  /* 多个 Project，每个 Project 多个轮次 */
  const projectsInfoArr = t_state.projects_detail;
  const resolvedRoundData = projectsInfoArr
    .map((project) => {
      const { rounds, id: p_id, groups, rule, ...projectBasicInfo } = project;
      const roundsDetail = rounds.details;
      const basicRoundDataArr = roundsDetail
        .map((round) => {
          const { id: r_id, ...roundNeededInfo } = round;
          return {
            r_id,
            rounds_total: rounds.total,
            ...roundNeededInfo,
            ...projectBasicInfo,
          };
        })
        .flat();
      return basicRoundDataArr;
    })
    .flat()
    // Data Cleaning Process done.
    // Data Organizing Process continue.
    .map((roundItem) => {
      const {
        iconMeta,
        name,
        round_format,
        r_id,
        rounds_total,
        // ...roundNeededData
        time_range,
        passline,
        reduction_limit,
        promotion_quota,
      } = roundItem;
      return {
        // ...roundNeededData,
        time_range: time_range,
        content_obj: {
          iconMeta,
          name,
        },
        phase_name: use_BS_logics().t_roundsNameArrCalc(rounds_total ?? 0)[
          r_id
        ],
        round_format: use_BS_logics().t_roundFormat_zhcnStr(round_format),
        passline,
        reduction_limit,
        promotion_quota,
      };
    });

  const resolvedSigninTime = t_state.signin_time_range && [
    {
      time_range: t_state.signin_time_range,
      content_obj: {
        name: "签到",
      },
    },
  ];
  const resolvedAwardTime = t_state.award_time_range && [
    {
      time_range: t_state.award_time_range,
      content_obj: {
        name: "颁奖",
      },
    },
  ];
  const resolvedBreakTimeData =
    t_state.break_time[0].time_range &&
    t_state.break_time?.reduce((arr, breakTimeItem) => {
      if (breakTimeItem.time_range?.[0]) {
        arr.push({
          time_range: breakTimeItem.time_range,
          content_obj: {
            name: "休息",
          },
        });
      }
      return arr;
    }, [] as Array<DayGroupItemType>);
  const resolvedLotteryTimeData =
    t_state.lottery_time[0].time_range &&
    t_state.lottery_time?.reduce((arr, lotteryTimeItem) => {
      if (lotteryTimeItem.time_range?.[0]) {
        arr.push({
          time_range: lotteryTimeItem.time_range,
          content_obj: {
            name: "抽奖",
          },
        });
      }
      return arr;
    }, [] as Array<DayGroupItemType>);

  const resolvedDayGroupDataMap = [
    ...resolvedRoundData,
    ...(resolvedBreakTimeData ?? []),
    ...(resolvedLotteryTimeData ?? []),
    ...(resolvedAwardTime ?? []),
    ...(resolvedSigninTime ?? []),
  ].reduce((map, roundItem) => {
    const roundStartDay = roundItem.time_range?.[0];

    if (roundStartDay) {
      const roundStartDayDate = format(
        fromUnixTime(roundStartDay / 1000),
        "yyyy年MM月dd日"
      );
      if (!map.has(roundStartDayDate)) {
        map.set(roundStartDayDate, []);
      }
      map
        .get(roundStartDayDate)!
        .push(roundItem as { time_range: [number, number] } & DayGroupItemType);
    }
    return map;
  }, new Map<string, Array<DayGroupItemType>>());

  const sortedDayGroupDataArr = [...resolvedDayGroupDataMap]
    .map(
      ([key, value], index) =>
        [
          key,
          value.sort((a, b) =>
            isBefore(a.time_range[0], b.time_range[0]) ? -1 : 1
          ),
        ] as [string, Array<DayGroupItemType>]
    )
    .map(([key, value], index) => {
      return [
        key,
        value.map((item) => {
          return {
            // Sequence problem?
            // ...item,
            time_range: item.time_range
              .map(useDateFns_FP().format("HH:mm"))
              .join("-"),
            content_obj: item.content_obj,
            passline: item.passline ? item.passline + " 秒" : "",
            phase_name: item.phase_name ? item.phase_name : "",
            reduction_limit: item.reduction_limit
              ? item.reduction_limit >= 60
                ? item.reduction_limit / 60 + " 分钟"
                : item.reduction_limit + " 秒"
              : "",
            promotion_quota: item.promotion_quota
              ? "前 " + item.promotion_quota
              : "",
            round_format: item.round_format ? item.round_format : "",
          } as FinalDayGroupItemType;
        }),
      ] as [string, FinalDayGroupItemType[]];
    })
    .map(([key, value], index) => {
      (value as FinalDayGroupItemType[]).unshift({
        content_obj: {
          name: key,
        },
      } as FinalDayGroupItemType);
      return value;
    });

  return sortedDayGroupDataArr;
};

const resolvedDaysData = ref(DataParser());
</script>

<template>
  <DefineDayGroupRowDatasTable v-slot="{ currentDayIndex, dayGroupItems }">
    <td
      :colspan="tableHeaderInfo.length"
      class="text-center text-20px odd:bg-#F1F2FD h-42px p-0 leading-42px"
    >
      第{{ myFuncs.num2ChineseNum(currentDayIndex + 1) }}天
      {{ dayGroupItems[0].content_obj.name }}
    </td>
    <div
      v-for="RowDataObj in dayGroupItems.slice(1)"
      class="table-row h-34px leading-34px odd:bg-#F1F2FD"
    >
      <div
        v-for="(itemValue, key) in RowDataObj"
        class="table-cell text-center text-14px"
      >
        <div
          v-if="key === 'content_obj'"
          class="flex justify-center items-center gap-2"
        >
          <div
            v-if="(itemValue as any).iconMeta"
            :class="(itemValue as any).iconMeta"
          ></div>
          <div class="">{{ (itemValue as any).name }}</div>
        </div>
        <div v-else>{{ itemValue }}</div>
      </div>
    </div>
  </DefineDayGroupRowDatasTable>
  <div class="table w-full text-#6F6F8B bg-#FFFFFF">
    <div class="table-header-group">
      <div class="table-row h-34px">
        <div
          v-for="item in tableHeaderInfo"
          class="table-cell text-center text-16px leading-34px font-bold"
          >{{ item.label }}</div
        >
      </div>
    </div>
    <div class="table-row-group">
      <DayGroupRowDatasTable
        v-for="(dayGroupItem, index) in resolvedDaysData"
        :current-day-index="index"
        :day-group-items="dayGroupItem"
      />
    </div>
  </div>
</template>

<style scoped></style>

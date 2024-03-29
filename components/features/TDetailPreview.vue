<script lang="ts" setup>
const {
  t_detail_attrs_obj_withSequence_constants,
  t_projectInfos_constants,
  t_roundFormat_options,
  t_roundsName_obj_standards,
} = useProjectConstants().tournament;
type DetailPrefixItemPropsType = {
  labelText?: string;
  iconMeta?: string;
  containerClass?: string;
  contentClass?: string;
  labelClass?: string;
  prefixWrapperClass?: string;
  content?:
    | {
        web_url?: string;
        shouldBeOutLink?: boolean;
      }
    | any;
};
const [DefineDetailPrefixTemplate, ReuseDetailPrefixTemplate] =
  createReusableTemplate<DetailPrefixItemPropsType>();
const detailPrefixItemStylesProps: DetailPrefixItemPropsType = {
  containerClass: "text-white flex items-center",
  prefixWrapperClass: "flex items-center text-18px mr-3 gap-2",
  labelClass: "font-bold",
  contentClass: "text-16px leading-20px whitespace-pre-wrap",
};

const { t_state } = useTournamentStore();

const props = defineProps<{
  t_info?: {
    [key: string]: any;
    // name?: string;
    // time_range: [string, string];
    // apply_time_range: [string, string];
    time_range: [number, number];
    apply_time_range: [number, number];
    projects: string;
    groups: string;
  };
  projects_detail?: typeof t_state.projects_detail;
  // projects_detail?: {
  //   iconMeta: string;
  //   rule: string;
  //   id: number;
  //   name: string;
  //   rounds: {
  //     total: number;
  //     details: {
  //       id: number;
  //       time_range?: [number, number];
  //       promotion_quota?: number;
  //       round_format?: number;
  //     }[];
  //   };
  //   [key: string]: any;
  // }[];
}>();

const { format } = useDateFns();
const { parseISO: parseISO_FP, fromUnixTime: fromUnixTime_FP } =
  useDateFns_FP();
const detailItem_formatters_obj = {
  apply_weburl: (web_url: string) => {
    if (web_url)
      return {
        isOutLink: true,
        web_url: web_url,
      };
  },
  mode: (mode: Record<string, any>) => {
    return mode;
  },
  organizer_weburl: (web_url: string) => {
    if (web_url)
      return {
        isOutLink: true,
        web_url: web_url,
      };
  },
  // apply_time_range: (time_range: [string, string]) => {
  apply_time_range: (time_range: [number, number]) => {
    if (!time_range) return false;
    // const parsedTimeRange = time_range.map(parseISO_FP);
    const parsedTimeRange = time_range
      .map((item) => item / 1000)
      .map(fromUnixTime_FP);
    const whetherSameDay = useDateFns().isSameDay(
      ...(parsedTimeRange as [Date, Date])
    );
    return whetherSameDay
      ? format(parsedTimeRange[0], "yyyy年M月d日")
      : [
          format(parsedTimeRange[0], "yyyy年M月d日"),
          format(parsedTimeRange[1], "M月d日"),
        ].join("-");
  },
  // time_range: (time_range: [string, string]) => {
  //   const parsedTimeRange = time_range.map(parseISO_FP);
  time_range: (time_range: [number, number]) => {
    if (!time_range) return false;
    const parsedTimeRange = time_range
      .map((item) => item / 1000)
      .map(fromUnixTime_FP);
    const formattedTimeRange = parsedTimeRange.map(
      useDateFns_FP().format("yyyy年MM月dd日")
    );
    const whetherSameDay = useDateFns().isSameDay(
      ...(parsedTimeRange as [Date, Date])
    );
    return whetherSameDay
      ? format(parsedTimeRange[0], "yyyy年M月d日")
      : [
          format(parsedTimeRange[0], "yyyy年M月d日"),
          format(parsedTimeRange[1], "M月d日"),
        ].join("-");
  },
  type: (type: string) => {
    return type;
  },
  apply_quota: (apply_quota: number) => {
    return apply_quota ?? 0 + "人";
  },
};

const finalDetailItemsObj = myFuncs.attrComposer(
  detailItem_formatters_obj,
  t_detail_attrs_obj_withSequence_constants,
  "formatter"
);

// console.log(
//   myFuncs.formatterComposer(
//     detailItem_formatters_obj,
//     t_detail_attrs_obj_withSequence_constants
//   )
// .apply_quota.formatter(10)
// .time_range.formatter([
//   "2023-01-23T07:04:06.480Z",
//   "2023-12-23T07:04:06.480Z",
// ])
// );

const t_stateObjHelper = (isStyleNeed: boolean) => {
  const baseStyles =
    "h-20px rounded-8px px-2 text-14px text-white place-self-end mb-1.5";
  const { time_range, apply_time_range } = props.t_info!;

  let strs_time_range = [
    ...time_range
      .map((item) => item / 1000)
      .map(useDateFns_FP().fromUnixTime)
      .map((item) => item.toISOString()),
  ] as [string, string];
  let strs_apply_time_range = [
    ...apply_time_range
      .map((item) => item / 1000)
      .map(useDateFns_FP().fromUnixTime)
      .map((item) => item.toISOString()),
  ] as [string, string];

  try {
    const { bg_color, label } = t_stateCalc(
      strs_time_range,
      strs_apply_time_range
    )!;
    const neededStyle = [baseStyles, bg_color].join(" ");
    const result = isStyleNeed ? neededStyle : label;
    return result;
  } catch (e) {
    if (isStyleNeed) return baseStyles;
    return "Invalid Interval";
  }
};
</script>

<template>
  <DefineDetailPrefixTemplate
    v-slot="{
      content,
      labelText,
      iconMeta,
      containerClass,
      contentClass,
      labelClass,
      prefixWrapperClass,
    }"
  >
    <div id="detail-content" :class="`${containerClass}`">
      <div id="item-prefix" :class="`${prefixWrapperClass}`">
        <div :class="`${iconMeta}`"></div>
        <label :class="`${labelClass}`">{{ labelText }}</label>
      </div>
      <!-- ItemContent -->
      <div v-if="typeof content === 'string'" :class="`${contentClass}`">{{
        content
      }}</div>
      <NuxtLink
        v-else-if="
          typeof content === 'object' &&
          content.isOutLink === true &&
          myFuncs.isValidUrl(content.web_url)
        "
        class="underline underline-offset-2 text-white"
        :target="'_blank'"
        title="外链网页链接"
        :to="
          (() => {
            return content.web_url!;
          })()
        "
      >
        <!-- :to="(`https://www.google.com` as string)" -->
        {{ content.web_url }}
      </NuxtLink>
      <div v-else :class="`${contentClass}`">{{
        content?.web_url ?? content
      }}</div>
    </div>
  </DefineDetailPrefixTemplate>

  <div id="detail-header" class="flex mb-6">
    <div class="text-30px leading-30px text-white mr-2 h-42px flex items-center"
      >{{ t_info?.name ?? "no match" }}
    </div>
    <div
      v-if="t_info?.apply_time_range && t_info.time_range"
      :class="
        (() => {
          return t_stateObjHelper(true);
        })()
      "
      >{{ t_stateObjHelper(false) }}
    </div>
  </div>

  <div
    id="detail-item-container-part-1"
    class="grid gap-3 lg:(grid-cols-2 grid-rows-6 grid-flow-col)"
  >
    <ReuseDetailPrefixTemplate
      v-for="(prefixItemVal, prefixItemKey, index) in finalDetailItemsObj"
      v-bind="{
        ...detailPrefixItemStylesProps,
        ...{
          labelText: prefixItemVal.attrLabel,
          iconMeta: prefixItemVal.iconMeta,
        },
        content: (() => {
          const contentFormatter = prefixItemVal.formatter;
          const result = contentFormatter
            ? contentFormatter(props.t_info?.[prefixItemKey]) ?? 'no match'
            : props.t_info?.[prefixItemKey] ?? 'no match';
          return result;
        })(),
        // content: {
        //   shouldBeOutLink: true,
        //   web_url: 'https://www.google.com',
        // },
      }"
    ></ReuseDetailPrefixTemplate>
  </div>
  <div class="grid gap-3 lg:grid-cols-2 mt-3">
    <div class="flex-1">
      <ReuseDetailPrefixTemplate
        v-bind="{
          ...detailPrefixItemStylesProps,
          labelText: '比赛规则',
          iconMeta: 'i-custom-t_detail:rules',
        }"
      />
      <div class="ml-7">
        <ReuseDetailPrefixTemplate
          v-for="(item, index) in projects_detail"
          :style="{ 'text-wrap': 'balance' }"
          v-bind="{
            labelText: `${item.name}魔方比赛分为 ${t_roundsNameArrCalc(
              item.rounds.total!
            ).join('-')}`,
            iconMeta: item.iconMeta,
            content: item.rule,
            containerClass: 'text-white',
            prefixWrapperClass:
              'flex space-x-3 font-bold items-center text-16px',
            contentClass: 'ml-7 mt-0 text-14px',
          }"
        />
      </div>
    </div>
    <div class="">
      <ReuseDetailPrefixTemplate
        v-bind="{
          labelText: '赛程',
          iconMeta: 'i-custom-t_detail:schedule',
          ...detailPrefixItemStylesProps,
        }"
      />
      <FeaturesTRaceSchedule
        v-bind="{
          t_state: t_state,
        }"
      ></FeaturesTRaceSchedule>
    </div>
  </div>
</template>

<style scoped></style>

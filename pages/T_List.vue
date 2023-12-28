<script lang="ts" setup>
import { NButton, type DataTableColumns } from "naive-ui";

definePageMeta({
  layout: "pc",
  title: "赛事列表",
  name: "T_List",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});

const { t_tournamentState_constants } = useProjectConstants().tournament;
const { format, isSameDay } = useDateFns();

const T_ListDataFetchOptionReative = reactive({
  page: 1,
  size: 10,
  selectedStateFilter: "全部",
});
const {
  data: T_ListData,
  error: T_ListError,
  refresh: refreshT_ListData,
  execute: executeT_ListDataFetch,
} = await useFetch("/api/tournaments/getTournamentList", {
  method: "get",
  headers: myFuncs.fromPairs([adminStore().ArrPair_authorizationToken]),
  watch: false,
  query: T_ListDataFetchOptionReative,
});
T_ListError.value && judgeError_for_ReAuthNeed(T_ListError.value.data, 1000);

const refOnGoingTsCount = computed(() => {
  const t_time_range_items = T_ListData.value?.resultData.items.map(
    (item) => item.t_time_range
  ) ?? ["", ""];
  const onGoingTsCount = t_time_range_items.filter(
    useDateFns_FP().isSameDay(new Date())
  ).length;
  return onGoingTsCount;
});

const tListDataColumns = (): DataTableColumns => {
  return [
    { title: "#", key: "t_id" },
    {
      title: "赛事名称",
      key: "t_name",
      titleAlign: "center",
      className: "flex justify-center items-center",
      render(rowData: any) {
        return h(
          "span",
          {
            class: "text-center underline text-#315EFB cursor-pointer",
            onClick() {
              useNaiveDiscrete().message.info("功能暂未完成");
              navigateTo(`Login?callback=${"T_List"}` as string, {
                external: true,
              });
            },
          },

          rowData.t_name
        );
      },
    },
    {
      title: "赛事起止日期",
      key: "t_time_range",
      titleAlign: "center",
      render(rowData: any) {
        return h(
          "div",
          {
            class: "text-center",
          },
          (() => {
            const [parsedTime0, parsedTime1] = rowData.t_time_range.map(
              useDateFns_FP().parseISO
            );
            try {
              return isSameDay(parsedTime0, parsedTime1)
                ? format(parsedTime0, "yyyy.MM.dd")
                : `${format(parsedTime0, "yyyy.MM.dd")} -
                  ${format(parsedTime1, "yyyy.MM.dd")}`;
            } catch (e: any) {
              return e.message;
            }
          })()
        );
      },
    },
    {
      title: "赛事状态",
      key: "t_status_obj",
      titleAlign: "center",
      render(rowData: any) {
        return h(
          "div",
          { class: "flex justify-center" },
          (() => {
            const { t_time_range, t_apply_time_range } = rowData;
            try {
              const t_state_obj = t_stateCalc(t_time_range, t_apply_time_range);
              return h(
                "div",
                {
                  class: `${t_state_obj?.bg_color} w-212px  text-16px text-white text-center`,
                },
                t_state_obj?.label
              );
            } catch (error: any) {
              return error.message;
            }
          })()
        );
      },
    },
    {
      title: "操作",
      key: "action",
      titleAlign: "center",
      render(rowData: any) {
        return h(
          "div",
          {
            class: "flex gap-2 justify-center",
          },
          [
            h(
              NButton,
              {
                type: "primary",
                class: "w-80px h-40px rounded-12px hover:opacity-80",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-mdi-edit" });
                },
                onClick(e) {
                  useNaiveDiscrete().message.info("功能暂未完成");
                },
              },
              "编辑"
            ),
            h(
              NButton,
              {
                quaternary: true,
                class:
                  "w-80px h-40px rounded-12px hover:opacity-80 text-white hover:text-white! focus:text-white!",
                bg: "main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!",
                iconPlacement: "right",
                renderIcon() {
                  return h("div", { class: "i-mdi-delete" });
                },
                onClick(e) {
                  useNaiveDiscrete().message.info("功能暂未完成");
                },
              },
              "删除"
            ),
          ]
        );
      },
    },
  ];
};
</script>

<template>
  <div>
    <div class="flex justify-between mb-6 items-center">
      <div
        class="flex items-center gap-2 text-16px text-dataTable-base-hintText"
      >
        <label>赛事状态</label>
        <n-select
          class="w-250px"
          v-model:value="T_ListDataFetchOptionReative.selectedStateFilter"
          :options="
            t_tournamentState_constants.map((item) => ({
              label: item.label,
              value: item.id,
            }))
          "
          :clearable="true"
          :multiple="false"
        />
      </div>
      <div class="flex items-center gap-10">
        <div class="text-main-btn_primary-negative text-20px">
          <span>今日 </span>
          <span class="text-main-btn_primary-positive">
            {{ refOnGoingTsCount }}
          </span>
          <span> 场赛事进行中</span>
        </div>
        <n-button
          type="primary"
          class="rounded-24px h-48px w-120px text-20px"
          @click="
            () => {
              useNaiveDiscrete().message.info('功能暂未完成');
            }
          "
          >创建赛事</n-button
        >
      </div>
    </div>
    <ProjectStyledDataTable
      :columns="tListDataColumns()"
      :data="T_ListData?.resultData.items"
    />
    <ProjectStyledPagination
      :current-page="T_ListDataFetchOptionReative.page"
      :func-update-page="
        (currentPage: number) => {
          T_ListDataFetchOptionReative.page = currentPage;
          executeT_ListDataFetch();
        }
      "
      :list-items-total="T_ListData?.resultData.items_total"
      :list-page-size="T_ListDataFetchOptionReative.size"
    />
  </div>
</template>

<style scoped></style>

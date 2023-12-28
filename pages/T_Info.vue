<script lang="ts" setup>
definePageMeta({
  title: "赛事创建",
  name: "T_Info",
  layout: "pc",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});
// ----------------------------------------------------------------
const {
  t_projectInfos_constants,
  t_groups_options,
  t_mode_options,
  t_roundFormat_options,
  t_type_options,
} = useProjectConstants().tournament;
const t_store = useTournamentStore();
const { t_state } = storeToRefs(t_store);

const { handleProjectRemove, handleProjectSelect } = t_store;
const selectedProjects = ref<any[]>([]);
const handleSelectedArrUpdate = (_selectedArr: any[]) => {
  selectedProjects.value = _selectedArr;
};
watchArray(
  selectedProjects,
  (newList, oldList, added_inArr, removed_inArr) => {
    const [operatedItem] = [...added_inArr, ...removed_inArr].map((item) => ({
      p_id: item.project_id,
      p_name: item.project_name,
      iconMeta: item.iconMeta,
    }));
    added_inArr.length && handleProjectSelect(operatedItem);
    removed_inArr.length && handleProjectRemove(operatedItem);
  },
  { deep: true }
);

const handleProjectRoundsItemAdd = (
  e: number,
  projectDetailObj: (typeof t_state.value.projects_detail)[0]
) => {
  const projectRoundsObj = projectDetailObj.rounds;
  const detailArrLen = projectRoundsObj.details.length!;
  const operationIndicator = e - detailArrLen;
  if (operationIndicator > 0) {
    const sourceItems = Array.from(
      { length: operationIndicator },
      (_, index) => {
        return {
          id: detailArrLen + index,
        };
      }
    );
    projectRoundsObj.details.push(...sourceItems);
  } else {
    projectRoundsObj.details.splice(
      operationIndicator,
      Math.abs(operationIndicator)
    );
  }
};

const { handleAddBreakTimeRound, handleAddLotteryTimeRound } = t_store;
const { handleRemoveBreakTimeRound, handleRemoveLotteryTimeRound } = t_store;

// ----------------------------------------------------------------
import type { FormInst } from "naive-ui";
const formRef = ref<FormInst>();
const formRules = {
  name: {
    required: true,
    message: "赛事名称必填",
    trigger: "blur",
  },
  mode: {
    required: true,
    message: "赛事模式必选",
    trigger: "blur",
  },
  type: {
    required: true,
    message: "赛事类型必选",
    trigger: "blur",
  },
  organizer: {
    required: true,
    message: "赛事主办方必填",
    trigger: "blur",
  },
  apply_weburl: {
    required: true,
    message: "赛事报名网址必填",
    trigger: "blur",
  },
  apply_quota: {
    required: true,
    message: "赛事报名名额必填",
    trigger: "blur",
  },
  time_range: {
    required: true,
    message: "赛事起止时间必选",
    trigger: "blur",
  },
  apply_time_range: {
    required: true,
    message: "赛事报名起止时间必选",
    trigger: "blur",
  },
  location: {
    required: true,
    message: "赛事地点必填",
    trigger: "blur",
  },
  projects: {
    required: true,
    message: "赛事项目必选",
    trigger: "blur",
  },
};
const handleFormValidate = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
    } else {
      useNaiveDiscrete().message.error("请检查表单必填项内容及是否正确");
    }
  });
};

// ----------------------------------------------------------------
const [DefineDynamicProjectsDetailsTempalte, ReuseDynamicForm_PD] =
  createReusableTemplate<{
    currentProjectIndex: number;
    projectDetailObj: {
      id: number;
      name: string;
      iconMeta: string;
      groups?: string[];
      rule?: string;
      reduction_limit?: number;
      passline?: number;
    } & {
      rounds: {
        total?: number;
        details: {
          id: number;
          time_range?: [number, number];
          promotion_quota?: number;
          round_format?: number;
        }[];
      };
    };
  }>();

const refModal = ref();
</script>

<template>
  <DefineDynamicProjectsDetailsTempalte
    v-slot="{ projectDetailObj, currentProjectIndex }"
  >
    <div class="grid mb-4">
      <div class="grid gap-2 grid-cols-[auto_1fr] items-center">
        <div class="gap-2 flex">
          <span>
            项目{{ myFuncs.num2ChineseNum(currentProjectIndex + 1) }}
          </span>
          <div
            class="flex text-center underline underline-offset-4 decoration-wavy"
          >
            {{ projectDetailObj.name }}
          </div>
        </div>

        <div class="flex items-center gap-2 col-start-auto">
          <span> 赛程为 </span>
          <!-- class="min-w-100px max-w-150px" -->
          <n-select
            class="max-w-150px"
            v-model:value="projectDetailObj.rounds.total"
            :options="
              Array.from({ length: 5 }, (_, index) => ({
                value: index + 1,
                label: '' + (index + 1),
              }))
            "
            placeholder=""
            @update:value="
              (e) => handleProjectRoundsItemAdd(e, projectDetailObj)
            "
          ></n-select>
          <span> 轮，分别设置 </span>
          <!-- class="max-w-500px min-w-100px" -->
          <n-select
            class="max-w-200px"
            v-model:value="projectDetailObj.groups"
            :multiple="true"
            :options="
              t_groups_options.map((item) => ({
                value: item,
                label: item,
              }))
            "
            placeholder=""
          ></n-select>
          <span> 组。 </span>
        </div>

        <div v-auto-animate class="contents">
          <div
            v-for="(roundItem, roundItemIndex) in projectDetailObj.rounds
              .details"
            class="col-span-2 grid grid-cols-[auto_1fr] gap-2"
          >
            <div class="inline-flex items-start pt-1"
              >第{{ myFuncs.num2ChineseNum(roundItemIndex + 1) }}轮</div
            >
            <div class="flex gap-2 flex-wrap">
              <n-date-picker
                v-model:value="roundItem.time_range"
                start-placeholder="轮次开始时间"
                end-placeholder="轮次结束时间"
                type="datetimerange"
              ></n-date-picker>
              <div class="flex items-center gap-2">
                <span>本轮赛制</span>
                <n-select
                  class="min-w-200px"
                  v-model:value="roundItem.round_format"
                  :options="
                    t_roundFormat_options.map((item) => ({
                      label: item.label,
                      value: item.round_format_id,
                    }))
                  "
                  placeholder=""
                ></n-select>
                <span
                  v-if="
                    roundItemIndex !==
                    projectDetailObj.rounds.details.length - 1
                  "
                >
                  ，
                </span>
                <span v-else> 。 </span>
              </div>

              <div class="flex items-center gap-2">
                <div
                  class="contents"
                  v-if="
                    roundItemIndex + 1 !==
                    projectDetailObj.rounds.details.length
                  "
                >
                  <span>晋级名额：前</span>
                  <n-input-number
                    v-model:value="roundItem.promotion_quota"
                    placeholder=""
                  ></n-input-number>
                  <span>人 晋级下一轮。</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2 max-w-732px grid gap-2">
          <div class="flex items-center gap-2 w-400px">
            及格线
            <n-input-number
              placeholder=""
              v-model:value="projectDetailObj.passline"
            ></n-input-number>
            秒，还原时限
            <n-input-number
              placeholder=""
              v-model:value="projectDetailObj.reduction_limit"
            ></n-input-number>
            秒
          </div>
          <n-input
            type="textarea"
            placeholder="比赛详细规则 选填"
            v-model:value="projectDetailObj.rule"
          ></n-input>
        </div>
      </div>
    </div>
  </DefineDynamicProjectsDetailsTempalte>
  <div class="flex">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="t_state"
      :rules="formRules"
      :size="'medium'"
      label-placement="left"
    >
      <n-form-item label="比赛名称" path="name" class="flex-no-wrap">
        <n-input
          v-model:value="t_state.name"
          placeholder=""
          class="w-200px!"
        ></n-input>
      </n-form-item>
      <div class="contents flex gap-2">
        <n-form-item label="比赛模式" path="mode">
          <n-select
            class="w-150px"
            v-model:value="t_state.mode"
            :options="
              t_mode_options.map((item) => ({
                value: item.mode_id,
                label: item.label,
              }))
            "
            placeholder=""
          ></n-select>
        </n-form-item>
        <n-form-item label="比赛类型" path="type">
          <n-select
            v-model:value="t_state.type"
            :options="
              t_type_options.map((item) => ({
                label: item.label,
                value: item.type_id,
              }))
            "
            placeholder=""
            class="w-150px"
          ></n-select>
        </n-form-item>
      </div>
      <div class="contents flex flex-wrap gap-2">
        <n-form-item label="赛事主办方" path="organizer">
          <n-input v-model:value="t_state.organizer" placeholder=""></n-input>
        </n-form-item>
        <n-form-item label="主办方官网">
          <n-input
            v-model:value="t_state.organizer_weburl"
            placeholder=""
          ></n-input
        ></n-form-item>

        <n-form-item label="报名网站" path="apply_weburl">
          <n-input
            v-model:value="t_state.apply_weburl"
            placeholder=""
          ></n-input>
        </n-form-item>
      </div>
      <div class="contents flex gap-x-4 flex-wrap">
        <n-form-item label="比赛时间" path="time_range">
          <n-date-picker
            v-model:value="t_state.time_range"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></n-date-picker>
        </n-form-item>
        <n-form-item label="报名时间" path="apply_time_range">
          <n-date-picker
            v-model:value="t_state.apply_time_range"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></n-date-picker>
        </n-form-item>
      </div>
      <n-form-item label="比赛地点" path="location">
        <n-input
          v-model:value="t_state.location"
          placeholder=""
          class="w-450px!"
        ></n-input>
      </n-form-item>
      <div class="contents flex flex-wrap gap-2">
        <n-form-item label="比赛条件">
          <n-input
            v-model:value="t_state.apply_condition"
            placeholder=""
          ></n-input
        ></n-form-item>
        <n-form-item label="条件备注">
          <n-input
            v-model:value="t_state.append_message"
            placeholder=""
          ></n-input
        ></n-form-item>
        <n-form-item label="报名名额" path="apply_quota">
          <n-input-number
            v-model:value="t_state.apply_quota"
            placeholder=""
          ></n-input-number>
        </n-form-item>
      </div>

      <n-form-item label="比赛项目" path="projects">
        <!-- modelValue: t_store.selectedProjects, -->
        <CustomCheckGroup
          v-bind="{
            modelValue: selectedProjects,
            itemsInfoList: t_projectInfos_constants,
            targetAttr: 'project_id',
            selectStrategy: 'multiple',
          }"
          @update:model-value="(e) => handleSelectedArrUpdate(e)"
          class="box-border p-3 min-w-340px bg-white text-main-btn_primary-negative leading-28px gap-2"
          border="1px solid gray-300 rounded-10px"
          grid="~ rows-2 cols-9"
        >
          <template #item="{ isItemSelected, itemData }">
            <div
              :class="`group grid place-items-center ${
                isItemSelected ? 'text-main-btn_primary-positive' : ''
              }`"
            >
              <div
                group-hover="bg-main-btn_primary-positive opacity-50"
                :class="`${itemData.iconMeta} text-28px`"
              />
              <label
                :class="`text-12px group-hover:text-main-btn_primary-positive`"
              >
                {{ itemData.project_name }}</label
              >
            </div>
          </template>
        </CustomCheckGroup>
      </n-form-item>

      <n-form-item label="比赛规则" v-if="t_state.projects_detail.length !== 0">
        <div class="gap-4 grid">
          <ReuseDynamicForm_PD
            v-for="(item, index) in t_state.projects_detail"
            v-bind="{
              projectDetailObj: item,
              currentProjectIndex: index,
            }"
          ></ReuseDynamicForm_PD>
        </div>
      </n-form-item>

      <div class="contents flex gap-x-4 flex-wrap">
        <n-form-item label="签到时间">
          <n-date-picker
            v-model:value="t_state.signin_time_range"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></n-date-picker>
        </n-form-item>
        <n-form-item label="颁奖时间">
          <n-date-picker
            v-model:value="t_state.award_time_range"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          ></n-date-picker>
        </n-form-item>
      </div>

      <n-form-item>
        <div v-auto-animate>
          <div
            class="flex items-center space-y-2"
            v-for="(item, index) in t_state.break_time"
          >
            <div class="text-16px pt-2 mr-1"
              >第{{ myFuncs.num2ChineseNum(index + 1) }}轮休息</div
            >
            <n-date-picker
              v-model:value="item.time_range"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            ></n-date-picker>
            <div
              v-if="index + 1 === t_state.break_time?.length"
              class="text-24px ml-2 flex gap-8 relative"
            >
              <div
                class="hover:opacity-80 grid items-center"
                @click="handleAddBreakTimeRound"
              >
                <div class="i-mdi-add-circle-outline text-#282867 absolute" />
                <div class="i-mdi-add-circle text-#81819D absolute" />
              </div>
              <div
                class="hover:opacity-80 grid items-center"
                @click="handleRemoveBreakTimeRound"
                v-if="index !== 0"
              >
                <div class="i-mdi-minus-circle-outline text-#282867 absolute" />
                <div class="i-mdi-minus-circle text-#81819D absolute" />
              </div>
            </div>
          </div>
        </div>
      </n-form-item>
      <n-form-item>
        <div v-auto-animate>
          <div
            class="flex items-center space-y-2"
            v-for="(item, index) in t_state.lottery_time"
          >
            <div class="text-16px pt-2 mr-1"
              >第{{ myFuncs.num2ChineseNum(index + 1) }}轮抽奖</div
            >
            <n-date-picker
              v-model:value="item.time_range"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            ></n-date-picker>
            <div
              v-if="index + 1 === t_state.lottery_time?.length"
              class="text-24px ml-2 flex gap-8 relative"
            >
              <div
                class="hover:opacity-80 grid items-center"
                @click="handleAddLotteryTimeRound"
              >
                <div class="i-mdi-add-circle-outline text-#282867 absolute" />
                <div class="i-mdi-add-circle text-#81819D absolute" />
              </div>
              <div
                class="hover:opacity-80 grid items-center"
                @click="handleRemoveLotteryTimeRound"
                v-if="index !== 0"
              >
                <div class="i-mdi-minus-circle-outline text-#282867 absolute" />
                <div class="i-mdi-minus-circle text-#81819D absolute" />
              </div>
            </div>
          </div>
        </div>
      </n-form-item>

      <div class="contents flex gap-2">
        <n-form-item label="首页展示">
          <n-switch v-model:value="t_state.display_on_homepage"></n-switch>
        </n-form-item>
        <n-form-item label="展示顺序">
          <n-select
            v-model:value="t_state.display_order"
            :options="
              Array.from({ length: 5 }, (_, index) => ({
                value: index + 1,
                label: '' + (index + 1),
              }))
            "
            class="w-100px"
            placeholder=""
          ></n-select
        ></n-form-item>
      </div>
      <div class="contents flex">
        <n-form-item label="赛事横幅">
          <div class="flex gap-2 items-center">
            <n-image
              :fallback-src="`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAuODk4IiBoZWlnaHQ9IjMzLjAzMyIgdmlld0JveD0iMCAwIDQwLjg5OCAzMy4wMzMiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOm5vbmU7fS5ie2NsaXAtcGF0aDp1cmwoI2EpO30uY3tmaWxsOiNFNkVERkY7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjQwLjg5OCIgaGVpZ2h0PSIzMy4wMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSI+PHBhdGggY2xhc3M9ImMiIGQ9Ik0yLjk1LDBIMzguMDg1QTIuODIxLDIuODIxLDAsMCwxLDQwLjksMi44MjJWOGMtMi43MDkuMS0xMS44NDEtLjE2LTE5LjY5NCwzLjc3Ny02Ljc1MywzLjM4NS05LjQzNyw3Ljk2Mi0xMC4wMDcsOS4yQTkuMDczLDkuMDczLDAsMCwwLC4xMzUsMjAuNDU0VjIuODIyQTIuODIyLDIuODIyLDAsMCwxLDIuOTUsME0wLDMwLjIxM1YyMy4zNjZhNy40NTcsNy40NTcsMCwwLDEsMTAuNDA1LjAwOUEzMi4xNCwzMi4xNCwwLDAsMCw5LDMyLjc5MmEuODE5LjgxOSwwLDAsMCwuMDM3LjI0MkgyLjgxNEEyLjgyMSwyLjgyMSwwLDAsMSwwLDMwLjIxM20zOC4wMjMsMi44MjFIMTEuNDM2YS43OTQuNzk0LDAsMCwwLC4wMzctLjI0MmMwLTMuMDUzLTEuNDM2LTEwLjIxMSw3LjM3NS0xNy4wODEsNy4wNjgtNS41MTIsMjAuNzY2LTUuNDY1LDIxLjk5LTUuNTEyVjMwLjIxM2EyLjgyMiwyLjgyMiwwLDAsMS0yLjgxNSwyLjgyMU0xMS43OTQsMTMuMTU4YTQuMTgyLDQuMTgyLDAsMSwwLTQuMTctNC4xODEsNC4xOCw0LjE4LDAsMCwwLDQuMTcsNC4xODEiLz48L2c+PC9zdmc+`"
              :src="`${t_state.banner?.url}`"
              object-fit="contain"
              height="58px"
              width="256px"
              class="rounded-10px border border-solid border-#D1D5DB box-border py-2"
            ></n-image>
            <n-button type="primary">选择图片</n-button>
            <n-button>上传图片</n-button>
          </div>
        </n-form-item>
      </div>
      <div class="flex place-content-center gap-7 pt-9">
        <n-button
          :quaternary="true"
          class="w-120px h-48px rounded-24px hover:opacity-80 text-white hover:text-white! focus:text-white!"
          bg="main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!"
          @click="
            (e) => {
              t_store.$reset();
            }
          "
        >
          重置
        </n-button>
        <n-button
          :quaternary="true"
          class="w-120px h-48px rounded-24px hover:opacity-80 text-white hover:text-white! focus:text-white!"
          bg="main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!"
          @click="useNaiveDiscrete().message.info('功能暂未完成')"
        >
          保存为草稿
        </n-button>
        <n-button
          :quaternary="true"
          class="w-120px h-48px rounded-24px hover:opacity-80 text-white hover:text-white! focus:text-white!"
          bg="main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!"
          @click="refModal.open()"
        >
          赛事预览
        </n-button>
        <n-button
          type="primary"
          class="w-120px h-48px rounded-24px hover:opacity-80"
          @click="useNaiveDiscrete().message.info('功能暂未完成')"
        >
          {{ undefined ?? "创建赛事" }}
        </n-button>
      </div>
    </n-form>

    <div id="preview_schedule">
      <ProjectStyledModal ref="refModal" :use-display-template="true">
        <template #display-content>
          <FeaturesTDetailPreview
            v-bind="{
              t_info: {
                time_range: t_state.time_range!,
                apply_time_range: t_state.apply_time_range!,
                projects:
                  t_state.projects_detail.map((item) => item.name).join('、') ??
                  '',
                groups:
                  t_state.projects_detail
                    .reduce((arr, item) => {
                      item.groups && arr.push(...item.groups);
                      return arr;
                    }, [] as string[])
                    .filter((itemA, index, selfArr) => {
                      return (
                        selfArr.findIndex((itemB) => itemA === itemB) === index
                      );
                    })
                    .join('、') ?? '',
                ...t_state,
              },
              projects_detail: t_state.projects_detail,
            }"
          ></FeaturesTDetailPreview>
        </template>
      </ProjectStyledModal>
    </div>
  </div>
  <pre class="select-text">{{ t_state }}</pre>
</template>

<style scoped lang="css">
.n-input {
  --uno: rounded-10px;
}
:deep(.n-input-number .n-input) {
  --uno: rounded-10px;
}
:deep(.n-date-picker .n-input) {
  --uno: rounded-10px;
}
:deep(.n-form-item .n-form-item-label) {
  --uno: text-16px;
}
</style>

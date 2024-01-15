<script lang="ts" setup>
import type { FormInst } from "naive-ui";
//----------------------------------------------------------------
definePageMeta({
  layout: "pc",
  title: "赛事详情",
  name: "T_Detail",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});
//----------------------------------------------------------------
const [DefineCollapseItem, ReuseCollapseItem] = createReusableTemplate<{
  itemIndex: number;
  collapseItemTitle: string;
}>();
const [DefineFormWrapper, ReuseFormWrapper] = createReusableTemplate<{
  formTitle: string;
}>();
const [DefineApplicantsSection, ReuseApplicantsSection] =
  createReusableTemplate();
const [DefineResultsSection, ReuseResultsSection] = createReusableTemplate();
//----------------------------------------------------------------
const manualEntryForm_applicants = ref<FormInst>();
const manualEntryForm_results = ref<FormInst>();
const manualEntryFormRules_applicants = {
  name: {
    required: true,
    message: "选手姓名必填",
    trigger: "blur",
  },
  t_number: {
    required: true,
    message: "编号必填",
    trigger: "blur",
  },
  user_id: {
    required: true,
    message: "WCU ID 必填",
    trigger: "blur",
  },
  projects: {
    required: true,
    message: "比赛项目必选",
    trigger: "blur",
  },
};
const manualEntryFormRules_results = {
  projects: {
    required: true,
    message: "比赛项目必选",
    trigger: "blur",
  },
  phase: {
    required: true,
    message: "比赛轮次必选",
    trigger: "blur",
  },
  t_number: {
    required: true,
    message: "编号必填",
    trigger: "blur",
  },
  user_id: {
    required: true,
    message: "WCU ID 必填",
    trigger: "blur",
  },
  name: {
    required: true,
    message: "姓名",
    trigger: "blur",
  },
  records: {
    required: true,
    message: "比赛成绩必填",
    trigger: "blur",
  },
};
//----------------------------------------------------------------
const formDataref_applicants = reactive<
  Partial<{
    name: string;
    t_number: string;
    user_id: string;
    projects: string[];
  }>
>({});
const formDataref_results = reactive<
  Partial<{
    projectID: number;
    phase: number;
    t_number: string;
    user_id: string;
    name: string;
    r1_duration: number;
    r2_duration: number;
    r3_duration: number;
    r4_duration: number;
    r5_duration: number;
  }>
>({});
const ref_avg_duration = computed(() => {
  const { r1_duration, r2_duration, r3_duration, r4_duration, r5_duration } =
    formDataref_results;
  return (
    [r1_duration, r2_duration, r3_duration, r4_duration, r5_duration].reduce(
      (preV, curV) => {
        let total = preV!;
        curV && (total += curV);
        return total;
      },
      0
    ) ?? 0 / ref_recordsTotal
  );
});

const {
  t_state,
  availableProjects,
  availableRoundsTotal_for_targetProject,
  availableRecordsTotal,
} = useTournamentStore();
const resetForm = myFuncs.util_resetForm;
const ref_recordsTotal = availableRecordsTotal(
  formDataref_results.projectID,
  formDataref_results.phase
);
//----------------------------------------------------------------
</script>

<template>
  <DefineFormWrapper v-slot="{ $slots, formTitle }">
    <div
      class="border-#6F6F8B border bg-main-base-outside border-solid box-border"
    >
      <div
        class="h-42px bg-main-btn_primary-negative text-18px text-white leading-42px pl-24px block"
        >{{ formTitle }}</div
      >
      <div class="w-200px p-12px grid grid-rows-[auto_1fr] w-full box-border">
        <component :is="$slots.default" />
      </div>
    </div>
  </DefineFormWrapper>
  <DefineApplicantsSection>
    <div class="px-3 py-4 flex gap-2 bg-white rounded-b-20px">
      <div class="grid grid-rows-[1fr_min-content]">
        <ReuseFormWrapper :form-title="'手动录入'">
          <n-form
            ref="manualEntryForm_applicants"
            label-placement="left"
            :label-width="'auto'"
            size="medium"
            :rules="manualEntryFormRules_applicants"
            :model="manualEntryForm_applicants"
            :class="'h-450px'"
          >
            <n-form-item label="姓名" path="name">
              <n-input
                placeholder=""
                v-model:value="formDataref_applicants.name"
              ></n-input>
            </n-form-item>
            <n-form-item label="编号" path="t_number">
              <n-input
                placeholder=""
                v-model:value="formDataref_applicants.t_number"
              ></n-input>
            </n-form-item>
            <n-form-item label="WCU ID" path="user_id">
              <n-input
                placeholder=""
                v-model:value="formDataref_applicants.user_id"
              ></n-input>
            </n-form-item>
            <n-form-item label="项目" path="projects">
              <n-select
                v-model:value="formDataref_applicants.projects"
                :options="
                  availableProjects.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                "
                placeholder=""
                :multiple="true"
              ></n-select>
            </n-form-item>
          </n-form>
          <div class="flex gap-4 justify-center h-min">
            <n-button
              :quaternary="true"
              class="w-96px h-42px rounded-24px hover:opacity-80 text-white hover:text-white! focus:text-white!"
              bg="main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!"
            >
              重置
            </n-button>
            <n-button
              type="primary"
              class="w-96px h-42px rounded-24px hover:opacity-80"
              @click="useNaiveDiscrete().message.info('功能暂未完成')"
            >
              确认
            </n-button>
          </div>
        </ReuseFormWrapper>

        <n-button type="primary" class="h-36px w-232px mt-5 justify-self-center"
          >上传报名表单</n-button
        >
      </div>

      <FeaturesTApplicantsTable></FeaturesTApplicantsTable>
    </div>
  </DefineApplicantsSection>
  <DefineResultsSection>
    <div class="px-3 py-4 flex gap-2 bg-white rounded-b-20px">
      <div class="grid grid-rows-[1fr_min-content]">
        <ReuseFormWrapper :form-title="'手动录入'">
          <n-form
            ref="manualEntryForm_results"
            label-placement="left"
            :label-width="'auto'"
            size="medium"
            :rules="manualEntryFormRules_results"
            :model="manualEntryForm_results"
            :class="'h-550px'"
          >
            <n-form-item label="项目" path="projects">
              <n-select
                :options="
                  availableProjects.map((item) => ({
                    label: '' + item.name,
                    value: item.id,
                  }))
                "
                v-model:value="formDataref_results.projectID"
                placeholder=""
              ></n-select>
            </n-form-item>
            <n-form-item label="轮次" path="phase">
              <n-select
                :options="
                  Array.from(
                    {
                      length: availableRoundsTotal_for_targetProject(
                        formDataref_results.projectID
                      ),
                    },
                    (_, index) => {
                      return {
                        label: '' + index,
                        value: index,
                      };
                    }
                  )
                "
                v-model:value="formDataref_results.phase"
                placeholder=""
              ></n-select>
            </n-form-item>
            <n-form-item label="编号" path="t_number">
              <n-input
                placeholder=""
                v-model:value="formDataref_results.t_number"
              ></n-input>
            </n-form-item>
            <n-form-item label="WCU ID" path="user_id">
              <n-input
                placeholder=""
                v-model:value="formDataref_results.user_id"
              ></n-input>
            </n-form-item>
            <n-form-item label="姓名" path="name">
              <n-input
                placeholder=""
                v-model:value="formDataref_results.name"
              ></n-input>
            </n-form-item>
            <n-form-item label="成绩" path="records">
              <div class="grid gap-2 text-14px">
                <div class="flex gap-1 items-center">
                  <div>第一局</div>
                  <n-input-number
                    :show-button="false"
                    placeholder=""
                    v-model:value="formDataref_results.r1_duration"
                    :disabled="ref_recordsTotal < 1"
                  ></n-input-number>
                </div>
                <div class="flex gap-1 items-center">
                  <div>第二局</div>
                  <n-input-number
                    :show-button="false"
                    placeholder=""
                    v-model:value="formDataref_results.r2_duration"
                    :disabled="ref_recordsTotal < 2"
                  ></n-input-number>
                </div>
                <div class="flex gap-1 items-center">
                  <div>第三局</div>
                  <n-input-number
                    placeholder=""
                    v-model:value="formDataref_results.r3_duration"
                    :show-button="false"
                    :disabled="ref_recordsTotal < 3"
                  ></n-input-number>
                </div>
                <div class="flex gap-1 items-center">
                  <div>第四局</div>
                  <n-input-number
                    placeholder=""
                    v-model:value="formDataref_results.r4_duration"
                    :show-button="false"
                    :disabled="ref_recordsTotal < 4"
                  ></n-input-number>
                </div>
                <div class="flex gap-1 items-center">
                  <div>第五局</div>
                  <n-input-number
                    placeholder=""
                    v-model:value="formDataref_results.r5_duration"
                    :show-button="false"
                    :disabled="ref_recordsTotal < 5"
                  ></n-input-number>
                </div>
                <div class="text-#6A6A76"
                  >平均成绩: {{ (ref_avg_duration / 60).toFixed(3) }} 秒</div
                >
              </div>
            </n-form-item>
          </n-form>
          <div class="flex gap-4 justify-center h-58px">
            <n-button
              :quaternary="true"
              class="w-96px h-42px rounded-24px hover:opacity-80 text-white hover:text-white! focus:text-white!"
              bg="main-btn_primary-negative hover:main-btn_primary-negative! focus:main-btn_primary-negative!"
            >
              重置
            </n-button>
            <n-button
              type="primary"
              class="w-96px h-42px rounded-24px hover:opacity-80"
              @click="useNaiveDiscrete().message.info('功能暂未完成')"
            >
              确认
            </n-button>
          </div>
        </ReuseFormWrapper>
        <n-button
          type="primary"
          class="h-36px w-232px mt-5 justify-self-center self-end"
          >上传报名表单</n-button
        >
      </div>
      <FeaturesTResultsTable></FeaturesTResultsTable>
    </div>
  </DefineResultsSection>
  <!--  -->
  <DefineCollapseItem v-slot="{ itemIndex, $slots, collapseItemTitle }">
    <div class="collapseItem-wrapper">
      <input
        type="checkbox"
        :id="`collapseItem${itemIndex}`"
        checked
        hidden
        class="peer"
      />
      <label class="text-30px" :for="`collapseItem${itemIndex}`">
        {{ collapseItemTitle }}
      </label>
      <section>
        <div class="collapseItem-content">
          <component :is="$slots.default" />
        </div>
      </section>
    </div>
  </DefineCollapseItem>
  <!--  -->

  <div class="grid gap-42px min-w-740px lg:min-w-1200px 2xl:min-w-1600px">
    <div class="bg-#6F6F8B pt-5 pb-10 px-8 rounded-20px shadow-2xl">
      <FeaturesTDetailPreview></FeaturesTDetailPreview>
    </div>
    <ReuseCollapseItem
      v-bind="{
        itemIndex: 1,
        collapseItemTitle: '赛事选手',
      }"
    >
      <ReuseApplicantsSection></ReuseApplicantsSection>
    </ReuseCollapseItem>
    <ReuseCollapseItem
      v-bind="{
        itemIndex: 2,
        collapseItemTitle: '赛果',
      }"
    >
      <ReuseResultsSection></ReuseResultsSection>
    </ReuseCollapseItem>
  </div>
</template>

<style scoped lang="css">
.collapseItem-wrapper {
  --uno: shadow-lg rounded-20px;
  label {
    --uno: px-27px h-60px rounded-t-20px flex items-center justify-between;
    --uno: bg-main-btn_primary-negative cursor-pointer text-white;
    /* prettier-ignore */
    --uno: after:(content-[""] ml-auto bg-[url("/assets/svgs/t_detail/collapse.svg")] w-40px h-40px bg-contain duration-500 rotate-180);
    /* prettier-ignore */
    --uno: peer-checked:after:rotate-0 peer-checked:rounded-b-0px rounded-b-20px duration-500;
  }

  section {
    /* prettier-ignore */
    --uno: overflow-hidden grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] duration-300;
    .collapseItem-content {
      --uno: min-h-0;
    }
  }
}
:deep(.n-form-item-label__text) {
  font-size: 18px;
}
.n-input {
  --uno: rounded-10px;
}
:deep(.n-input-number .n-input) {
  --uno: rounded-10px;
}
</style>

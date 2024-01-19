<script lang="ts" setup>
export type DataExportOptionType = {
  optionLabel: string;
  relatedFunc: () => void;
};
const dataExportOptionsInfoArr = ref<DataExportOptionType[]>([]);
// emitter.on("*", (type, event) => {
//   if (Array.isArray(event)) {
//     dataExportOptionsInfoArr.value = event;
//   } else console.log(type, event);
// });
emitter.on("dataExport", (event) => {
  if (Array.isArray(event)) {
    dataExportOptionsInfoArr.value = event;
  } else console.log(event);
});
const [DefineDataExportContainer, ReuseDataExportContainer] =
  createReusableTemplate<{
    contentRenderFunc: any[];
  }>();
const refModal = ref<{ toggleModal: () => void }>();

import { NCheckbox, NCheckboxGroup } from "naive-ui";
const selectedExportOptions = ref<any[]>([]);
const dataExportOptionsRenderFunc = (
  DataExportOptionInfoArr: DataExportOptionType[]
) => {
  return h(
    NCheckboxGroup,
    {
      class: "flex gap-5",
      onUpdateValue(value, meta) {
        selectedExportOptions.value = value;
      },
    },
    // prettier-ignore
    dataExportOptionsInfoArr.value
    .map((item) => {
      return h(NCheckbox, {
        size: "large",
        value: item.optionLabel,
        label: item.optionLabel,
      });
    })
  );
};
const handleExportData = () => {
  // prettier-ignore
  dataExportOptionsInfoArr.value
  .filter(item => selectedExportOptions.value.includes(item.optionLabel)).map(item => item.relatedFunc)
  .forEach(item => item());
  refModal.value?.toggleModal();
};
</script>
<template>
  <div class="flex justify-between mb-5 text-16px items-center">
    <NuxtLink
      class="text-main-btn_primary-positive flex gap-1 no-underline"
      :to="`/Test/test1`"
      >{{ route().meta.title }}</NuxtLink
    >
    <NButton
      type="primary"
      class="rounded-10px"
      v-if="route().meta.showExportData"
      @click="refModal?.toggleModal()"
      >导出数据</NButton
    >
  </div>
  <!--  -->
  <DefineDataExportContainer v-slot="{ $slots, contentRenderFunc }">
    <div class="">
      <div
        class="dataExportHeader h-42px bg-main-btn_primary-negative grid place-content-center"
      >
        <div class="text-white text-27px"> 选择导出 </div>
      </div>
      <div class="contentScope px-8 pb-4">
        <div class="px-5 py-8 my-8 grid place-content-center">
          <component :is="$slots.default ?? contentRenderFunc" />
        </div>
        <div class="h-42px flex gap-5 place-content-center">
          <NButton @click="handleExportData" type="primary">确认</NButton>
          <NButton @click="refModal?.toggleModal()">取消</NButton>
        </div>
      </div>
    </div>
  </DefineDataExportContainer>
  <ProjectStyledModal
    ref="refModal"
    class="w-580px rounded-10px overflow-hidden"
  >
    <ReuseDataExportContainer
      v-bind="{
        contentRenderFunc: dataExportOptionsRenderFunc(
          dataExportOptionsInfoArr
        ),
      }"
    ></ReuseDataExportContainer>
  </ProjectStyledModal>
</template>

<style scoped></style>

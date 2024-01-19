<script lang="ts" setup>
definePageMeta({
  layout: "pc",
  title: "总览",
  name: "overview",
  showExportData: true,
});
useHeadSafe({
  title: `${route().meta.name} - ${route().meta.title}`,
});

/* Data Export Part */
import type { DataExportOptionType } from "~/components/ProjectDataExportHeader.vue";
const dataExportOptionsInfoArr: DataExportOptionType[] = [
  {
    optionLabel: "基础数据",
    relatedFunc: () => {
      myFuncs.handleExportData([], "总览 - 基础数据数据导出");
    },
  },
  {
    optionLabel: "实时在线",
    relatedFunc: () => {
      myFuncs.handleExportData([], "总览 - 实时在线数据导出");
    },
  },
  {
    optionLabel: "周数据",
    relatedFunc: () => {
      myFuncs.handleExportData([], "总览 - 周数据导出");
    },
  },
  {
    optionLabel: "月数据",
    relatedFunc: () => {
      myFuncs.handleExportData([], "总览 - 月数据导出");
    },
  },
  {
    optionLabel: "地区分布",
    relatedFunc: () => {
      myFuncs.handleExportData([], "总览 - 地区分布数据导出");
    },
  },
];
emitter.emit("dataExport", dataExportOptionsInfoArr);
</script>

<template>
  <div></div>
</template>

<style scoped></style>

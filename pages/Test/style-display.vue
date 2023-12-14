<script lang="ts" setup>
const { unocss_theme_colors } = useProjectConstants;
</script>

<template>
  <div>
    <div class="text-center">main</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#F7F8FE">#F7F8FE 内容 Content 背景色</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#F1F2FD">#F1F2FD 菜单栏背景色</div>
    <hr class="mx-40px my-20px" />
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#FF8F6B">#FF8F6B 主按钮-positive</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#70708C">#70708C 主按钮-negative</div>

    <hr class="mx-40px my-20px" />
    <div class="text-center">dataTable</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#EDF1FE">#EDF1FE 数据表格页分行深色</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#70708C">#70708C 数据表格表头背景色</div>
    <hr class="mx-40px my-20px" />
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#29DEA7">#29DEA7 用户数据表格状态项背景色-positive</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#BBBBBB">#BBBBBB 用户数据表格状态项背景色-negative</div>

    <hr class="mx-40px my-20px" />
    <div class="text-center">t_list: tournament_status_color</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#F19EC2">#F19EC2 报名未开始</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#88ABDA">#88ABDA 报名中</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#89C997">#89C997 报名已结束，比赛未开始</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#F29B76">#F29B76 比赛中</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#8F82BC">#8F82BC 比赛已结束，未公示</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-#535353">#535353 比赛已结束，公示中</div>

    <hr class="mx-40px my-20px" />
    <div class="text-center">unocss_theme_colors</div>
    <pre>{{ unocss_theme_colors }}</pre>
    <div class="bg-main-base-header">bg-main-base-header</div>
    <div class="bg-main-base-content">bg-main-base-content</div>
    <div class="bg-main-btn_primary-positive">btn_primary-positive</div>
    <div class="bg-main-btn_primary-negative">btn_primary-negative</div>
    <div class="bg-dataTable-base-divider">bg-dataTable-base-divider</div>
    <div class="bg-#FFFFFF">#FFFFFF 纯白</div>
    <div class="bg-dataTable-base-header">bg-dataTable-base-header</div>
    <div class="bg-dataTable-state-positive">bg-dataTable-state-positive</div>
    <div class="bg-dataTable-state-negative">bg-dataTable-state-negative</div>

    <hr class="mx-40px my-20px" />
    <div class="text-center">more</div>
  </div>
</template>

<style scoped></style>

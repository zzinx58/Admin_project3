<script lang="ts" setup>
definePageMeta({
  title: "Test4",
  name: "Test4",
  layout: "pc",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});

// ----------------------------------------------------------------

// ----------------------------------------------------------------
const { t_projectInfos_constants } = useProjectConstants().tournament;
const t_store = useTournamentStore();
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
</script>

<template>
  <CustomCheckGroup
    v-bind="{
      modelValue: t_store.t_state.projects_detail,
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
        <label :class="`text-12px group-hover:text-main-btn_primary-positive`">
          {{ itemData.project_name }}</label
        >
      </div>
    </template>
  </CustomCheckGroup>
  <!-- <pre>{{ t_store.$state }}</pre> -->
  <div v-auto-animate>
    <div v-for="item in t_store.t_state.projects_detail">{{ item }}</div>
  </div>
  <hr />
  <div v-auto-animate>
    <pre>{{ t_store }}</pre>
  </div>

  <!-- <n-select
    :multiple="true"
    v-model:value="t_store.t_state.projects_detail![0].groups"
    :options="[
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
    ]"
  ></n-select> -->
  <!-- <n-input v-model:value="t_store.t_state.name"></n-input>
  <n-date-picker
    type="datetimerange"
    v-model:value="t_store.t_state.apply_time_range"
    end-placeholder="赛事结束日期时间"
    start-placeholder="赛事开始日期时间"
  ></n-date-picker> -->
</template>

<style scoped></style>

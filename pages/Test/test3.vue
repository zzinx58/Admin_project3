<script lang="ts" setup>
definePageMeta({
  title: "Test3",
  name: "Test3",
  layout: "pc",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});

const refModal = ref();
// onMounted(() => refModal.value.open());
</script>

<template>
  <FeaturesTDetailPreview
    v-bind="{
      t_info: {
        location: 'testLocation',
        organizer: 'organizer',
        t_name: '深圳青少年魔方公开赛',
        apply_web_url: 'https://www.google.com',
        organizer_web_url: 'https://www.google.com',
        apply_condition: '123456',
        type: '个人赛',
        apply_quota: 100,
        projects: ['三阶', '四阶'].join('、'),
        mode: '线下赛',
        groups: ['U18', 'U12'].join('、'),
        time_range: [
          new Date(Date.now() + 1 * 86400000).toISOString(),
          new Date(Date.now() + 2 * 86400000).toISOString(),
        ],
        apply_time_range: [
          // '',
          new Date(Date.now() - 1 * 86400000).toISOString(),
          new Date(Date.now() + 1 * 86400000).toISOString(),
        ],
      },
    }"
  ></FeaturesTDetailPreview>
  <!-- <n-button type="primary" @click="refModal?.open()">open modal</n-button>
  <ProjectStyledModal ref="refModal">
    <div class="bg-red w-full h-full">123</div>
    <div class="mt-10 bg-blue">123</div>
  </ProjectStyledModal> -->
  <n-button type="primary" @click="refModal.open()">open modal</n-button>
  <ProjectStyledModal ref="refModal" :use-display-template="true">
    <!-- <template #mail-content>1234</template> -->
    <template #display-content>
      <FeaturesTDetailPreview
        v-bind="{
          t_info: {
            t_name: '',
            location: 'testLocation',
            time_range: [
              new Date(Date.now() + 1 * 86400000).toISOString(),
              new Date(Date.now() + 2 * 86400000).toISOString(),
            ],
            apply_time_range: [
              new Date(Date.now() - 1 * 86400000).toISOString(),
              new Date(Date.now() + 1 * 86400000).toISOString(),
            ],
          },
        }"
      ></FeaturesTDetailPreview>
    </template>
  </ProjectStyledModal>
</template>

<style scoped></style>

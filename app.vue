<script setup lang="ts">
const { naiveUI_theme_styles } = useProjectConstants().projectStyles;
</script>
<template>
  <ProjectEnv />
  <!-- Directly name the layout will cause conflicts when specify the layout in page components. -->
  <!-- <NuxtLayout name="default"> -->
  <n-config-provider :theme-overrides="naiveUI_theme_styles">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
  <!-- <div>
    <NuxtWelcome />
  </div> -->
</template>
<style lang="css">
body {
  margin: 0;
  user-select: none;
  white-space: nowrap;
}
::-webkit-scrollbar {
  /* width: 8px; */
  display: none;
}
/*::-webkit-scrollbar-thumb {
  /~ &:vertical { ~/
  &:horizontal {
    background-color: yellow;
    border-radius: 24px;
    overflow: overlay;
  }
}*/
/* ::-webkit-scrollbar-track {
  border-radius: 24px;
  background-color: black;
} */
</style>

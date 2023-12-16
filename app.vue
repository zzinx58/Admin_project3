<script setup lang="ts"></script>
<template>
  <ProjectEnv />
  <!-- Directly name the layout will cause conflicts when specify the layout in page components. -->
  <!-- <NuxtLayout name="default"> -->
  <n-config-provider>
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
</style>

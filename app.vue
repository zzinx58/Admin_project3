<template>
  <!-- Directly name the layout will cause conflicts when specify the layout in page components. -->
  <!-- <NuxtLayout name="default"> -->
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
  <!-- <div>
    <NuxtWelcome />
  </div> -->
</template>
<style lang="css">
body {
  margin: 0;
}
</style>

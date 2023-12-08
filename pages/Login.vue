<script lang="ts" setup>
import type { FormInst } from "naive-ui";
import type { API_Payload_POST_Login } from "~/types/api_map_types";
// ----------------------------------------------------------------
definePageMeta({
  layout: "blank",
});
useHead({
  title: "Login - 登录",
});
// ----------------------------------------------------------------
const naiveMessage = useNaiveMessage();
// ----------------------------------------------------------------
const loginFormRef = ref<FormInst | null>();
const payload_loginForm: Ref<API_Payload_POST_Login> = ref({
  username: "",
  password: "",
});

// ----------------------------------------------------------------
const loginFormValidateRules = {
  username: {
    required: true,
    message: "用户名不可为空",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "密码不可为空",
    trigger: "blur",
  },
};
// ----------------------------------------------------------------
// const handleClickLogin = async () => {
const handleClickLogin = async (e: MouseEvent) => {
  e.preventDefault();
  loginFormRef.value?.validate(async (errors) => {
    if (!errors) {
      naiveMessage.success("表单验证通过");
      await handleValidReqSend();
    } else {
      naiveMessage.error("表单验证不通过，请检查表单内容");
    }
  });
};
const handleValidReqSend = async () => {
  const { data, statusCode, message, ok } = await adminStore().login(
    payload_loginForm.value
  );
  if (ok) {
    // Composable's could only be used in setup scope!!
    naiveMessage.success(message);
    navigateToRedirectFrom(useRoute);
  } else {
    naiveMessage.error(message);
    throw createError({
      statusCode: statusCode,
      message: message,
      data: data,
      fatal: false,
    });
  }
};
// ----------------------------------------------------------------
</script>

<template>
  <div
    class="login-form-container box-border w-400px rounded-lg shadow-lg bg-white"
    p="8"
    grid="grid-cols-[minmax(336px,1fr)] grid-rows-[repeat(3,auto)]"
  >
    <div class="header w-98px h-57px bg-black"></div>
    <div class="welcome grid place-items-center gap-6" m="b-10 t-16">
      <div class="text-24px">魔域赛事后台管理平台</div>
      <div class="text-18px">欢迎登陆!</div>
    </div>
    <n-form
      class="sign-in"
      m="b-32"
      ref="loginFormRef"
      :model="payload_loginForm"
      :rules="loginFormValidateRules"
    >
      <n-form-item label="用户名:" path="username">
        <n-input
          v-model:value="payload_loginForm.username"
          placeholder="请输入用户名"
          clearable
        ></n-input>
      </n-form-item>
      <n-form-item label="密码:" path="password">
        <n-input
          v-model:value="payload_loginForm.password"
          type="password"
          clearable
          placeholder="请输入密码"
        ></n-input>
      </n-form-item>
      <n-button
        type="primary"
        block
        attr-type="button"
        @click="handleClickLogin"
        >登陆</n-button
      >
    </n-form>
  </div>
</template>

<style lang="css" scoped>
/* .login-form-container {
  --p: 32px;
  --w: 400px;
  display: grid;
  grid-template-columns:
    var(--p)
    minmax(calc(var(--w) - 2 * var(--p)), 1fr)
    var(--p);
  grid-template-rows: var(--p) repeat(3, auto) var(--p);
  grid-template-areas:
    "... ... ..."
    "... header ..."
    "... welcome ..."
    "... sign-in ..."
    "... ... ...";
} */

/* .header {
  grid-area: header;
}
.welcome {
  grid-area: welcome;
}
.sign-in {
  grid-area: sign-in;
} */
</style>

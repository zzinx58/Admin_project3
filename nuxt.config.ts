import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
// import AutoImport from "unplugin-auto-import/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  typescript: {
    shim: false,
  },

  app: {
    head: {
      titleTemplate: "%s | MOYU",
    },
  },
  devServer: {
    https: {
      key: "./keys/zzx-local_dev.key",
      cert: "./keys/zzx-local_dev.cert",
    },
    port: 3010,
  },
  modules: [
    // 与类型“NuxtModule<ModuleOptions>”和“NuxtModule<ModuleOptions>”相比，堆栈深度过高。
    // "@hebilicious/server-block-nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "nuxt-typed-router",
    "magic-regexp/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/image",
  ],
  piniaPersistedstate: {
    storage: "localStorage",
  },
  // https://nuxt.com/docs/guide/concepts/auto-imports#auto-import-from-third-party-packages
  imports: {
    presets: [
      {
        from: "naive-ui",
        imports: [
          "useDialog",
          "useMessage",
          "useNotification",
          "useLoadingBar",
        ],
      },
    ],
  },
  vite: {
    plugins: [
      /* 
        The code in the following section is no longer needed.
        Cause auto-import has already builtin in Nuxt3. 
        You could see it in https://github.com/unplugin/unplugin-auto-import Nuxt section.
        Use the upstare imports.presets config option to import your needed functions.
      */
      // AutoImport({
      //   imports: [
      //     {
      //       "naive-ui": [
      //         "useDialog",
      //         "useMessage",
      //         "useNotification",
      //         "useLoadingBar",
      //       ],
      //     },
      //   ],
      // }),
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});

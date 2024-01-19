import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    // enabled: true,
    enabled: false,

    timeline: {
      enabled: true,
    },
  },
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
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "magic-regexp/nuxt",
    "@nuxt/image",
    "nuxt-typed-router",
    "@formkit/auto-animate/nuxt",
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
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
});

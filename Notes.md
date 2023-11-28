# Quick Notes.

- 使用 Nuxtr Vscode 插件可以提高 Nuxt3 项目开发效率。创建模版文件等功能。
- Nuxt Layout 指明 name，会导致在其他 Page 中指明 Layout 时，样式不生效。
- UnoCSS config file 创建并 export defineConfig 后，不进行额外配置，基本的样式操作也能生效。
- Error: "@hebilicious/server-block-nuxt". 与类型“NuxtModule<ModuleOptions>”相比，堆栈深度过高。
- Storybook with Nuxt3 and bun throwing errors. Use pnpm or else instead.

---

# Error handling.

- ./plugins/error-handler.ts
  - `nuxtApp.vueApp.config.errorHandler = (error, instance,info) => {}` could only capture `fatal:false` error.
  - `nuxtApp.hook('vue:error' (error, instance,info) => {})` could capture both the `fatal:false | true` error.
  - `nuxtApp.hook('app:error', (error) => {})` could capture any errors in starting your Nuxt app.
    > https://nuxt.com/docs/getting-started/error-handling#startup-errors
- `showError()` calls the `app:error` hook, but the error it create could not be captured by the `['vue:error', nuxtApp.vueApp.config.errorHandler]` . And provides a quick and simple way to show a full screen error page if needed.
- `useError()` returns the global Nuxt error that is being handled.
- Errors that created in middleware could not be capture in hook: `['vue:error', nuxtApp.vueApp.config.errorHandler]`.
- Errors that created in middleware could be capture in hook:`app:error`.
- You cannot currently define a server-side handler for these errors, but can render an error page, see the Render an Error Page section.

---

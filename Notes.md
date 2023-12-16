# Project Test.

- `expect.toBe()`: this func is used for strict equality checking.
- `expect.toEqual()`: this func is used for depth comparison checking. It focus on item's (object) content. Not the essence(such as object address in memory).
- Notice the global state effect in a module.
- Notice the fixture.
- About `test` and `it`, related to Mocha, Jasmine and Jest.
- `describe`: used for controlling test behaviour.
- `describe` could be nested. It will be regard as a test case. We can say you have `beforeEach` etc. in your test scope.
- `expect.toBeTruthy`, `expect.toBeFalsy`.
- Do you know four phase of a test?
- `beforeEach`: related to a single test case. Will be called multiple times in a describe scope.
- `beforeAll`: will be called one time in a describe scope.
- Notice that you can write your `afterEach` logic in `beforeEach` function return. So you don't need to write afterEach after your test cases. It's convenient.
- `xxx.[todo]`: it's an interesting feature!
- Use the vscode vitest snippets plugin! And the vitest related plugins.
- Do you know the TDL? Test driving learning. Live document.
- Test Debug.
  - JS debug terminal.
  - launch.json
  - Vitest plugins
  - vitest --ui
- Do you know Vitest implementation mechanism?
- `glob` npm package. About `glob.sync`.
- use `esbuild` to solve the import statement in Function problem!
- Do you know three ways to create test mock data?
  - in-line
  - delegated
  - implicit. ?..
- round-trip for rear door operation?
- Do you know the Minimum Preparation Test Data Principle? And how many ways to provide the data?
- Indirect test input data.
- `vi.mock`.

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
- When `useFetch` throws an error, you can get the brief description of the error through `statusMessage`, and get error info obj through `error.data`.

---

# Date-Fns

```typescript
const ISO_formattedTime = useDateFns_FP().parseISO(time);
const { format } = useDateFns();
const { format: format_FP } = useDateFns_FP();
useDateFns_FP().getUnixTime(useDateFns_FP().parseISO(time)), // 1702635580
useDateFns_FP().parseISO(time).toUTCString(), // GMT+0000 "Fri, 15 Dec 2023 10:19:40 GMT"
useDateFns_FP().parseISO(time).toTimeString(), // GMT+0800 "18:19:40 GMT+0800 (中国标准时间)"
useDateFns_FP().parseISO(time).toString(), // GMT+0800 "Fri Dec 15 2023 18:19:40 GMT+0800 (中国标准时间)".
useDateFns_FP().parseISO(time).toLocaleTimeString(), // GMT+0800 "18:19:40"
useDateFns_FP().parseISO(time).toLocaleString(), // GMT+0800 "2023/12/15 18:19:40"
useDateFns_FP().parseISO(time).toLocaleDateString(), // GMT+0800 "2023/12/15"
useDateFns_FP().parseISO(time).toJSON(), // GMT+0000 "2023-12-15T10:19:40.000Z"
useDateFns_FP().parseISO(time).toISOString(), // GMT+0000 "2023-12-15T10:19:40.000Z"
useDateFns_FP().parseISO(time), // GMT+0000 "2023-12-15T10:19:40.000Z"
[ISO_formattedTime].map(format("yyyy-MM-dd HH:mm:ss")), // GMT+0800 "2023-12-15 18:19:40"
format(ISO_formattedTime, "yyyy-MM-dd HH:mm:ss"), // GMT+0800 "2023-12-15 18:19:40"
```

---

# Quick Notes.

- 使用 Nuxtr Vscode 插件可以提高 Nuxt3 项目开发效率。创建模版文件等功能。
- Nuxt Layout 指明 name，会导致在其他 Page 中指明 Layout 时，样式不生效。
- UnoCSS config file 创建并 export defineConfig 后，不进行额外配置，基本的样式操作也能生效。
- Error: "@hebilicious/server-block-nuxt". 与类型“NuxtModule<ModuleOptions>”相比，堆栈深度过高。
- Storybook with Nuxt3 and bun throwing errors. Use pnpm or else instead.
- `@pinia/nuxt`'s `autoImports` option has been removed, check the link for detail: https://github.com/vuejs/pinia/blob/3eee3352c9fcabd9043df39380328c393d94ac3b/packages/nuxt/CHANGELOG.md.
- Nuxt3 autoimports seems no support for import funcs alias.
- Nuxt3 `utils` directory's auto-import are only available within the Vue part of your app. Only server/utils are auto-imported in the server/ directory.
- Remember to restart the server while you updated your files in `middleware / utils etc.` directory.
- JSON: JavaScript Object Notation.
- RegExp: Regular Expression.
- Could not use `naiveMessage, adminStore` composable funs inside store. Not initialize.
- `staging`: as project environment state. Meaning project temporary storage stage.

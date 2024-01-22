# Admin Project3

## Procedures(DESC)

### Routine -- 2024/1/19

- Component - `./components/ProjectDataExportHeader.vue`
  - Feat: Support global data export logic.
  - Update & Chore: Data export related pages logic update.
- Utils in FE - `./utils/common.ts`
  - Func: `myFuncs.handleExportData`
- Page - `./pages/UserDetail/[id].vue`
  - Page data export logic
  - Page data fetch logic
  - Page data selectively display logic
  - Page styles
- Bug Fix
  - `V_MenuBar` - `./components/V_MenuBar.vue`
    - About selected item not responsive.
- Config
  - `./ecosystem.config.cjs`

### Routine -- 2024/1/15

- Utils in FE - `./utils/common.ts`
  - Func-Update: formatterComposer => attrComposer.
  - Func: util_resetForm.
- Store - `./stores/tournament.ts`
  - Func: availableProjects
  - Func: availableRoundsTotal_for_targetProject
  - Func: availableRecordsTotal_for_targetProjectAndRound
- Constants - `./constants`
  - Insert: Page needed constants about itemStyle and itemPrefix. - `./constants/userDetail.ts`
  - Refactor: Unocss related constants to position. - `./constants/unoRelated.ts`
  - Update: added `records_total` attr to t_roundFormat_option. - `./constants/tournament.ts`
  - Insert: Provided unified entrance and exit of constants. - `./constants/index.ts`
- Composables - `./composables`
  - Update: about `ProjectNeededMenuItem`'s attrs structure. - `./composables/common.ts`
- Layout - `./layouts/pc.vue`
- Test - `./pages/Test/test6.vue`
  - Menu Test.
  - Grid Layout Test.
- Page - `./pages`
  - TDetailPage - `./pages/T_Detail.vue`
    - Feat: TDetailPreview Part.
    - Feat: TApplicantsTable Part.
    - Feat: TResultsTable Part.
  - UserDetailPage - `./pages/UserDetail/[id].vue`
    - Feat: UserDetailPreview Part.
      - Impr: about KV-Like Item's render Logic Improvement.
      - Impr: about grid layout display logic improvement.

### Routine -- 2024/1/6

- Chore

  - Project MenuItem's Assets & Constants solving.
  - UnoCSS shortcuts rules added. - `./constants/index.ts`

- Utils in FE - `./utils/common.ts`

  - Feature [useGSAP]

- Utils in BE - `./server/utils/common.ts`

  - Feature [useFaker]

- Page `./pages/T_Detail.vue`
  - Data Filtering & Fetching related logics.
  - Page UX improvements.
  - Page Styles.
  - Sub_Component - `./components/features`
    - Feature_Component [TApplicantsTable]
    - Feature_Component [TResultsTable]

### Routine -- 2023/12/28

- Component - `./components`

  - Feature [CustomCheckGroup] - `./components/CustomCheckGroup.vue`
    - Headless Component Logics
    - Component Skeleton
    - Component inner vue-related BS Logics
    - Component Test Page
  - Feature [TDetailPreview] - `./components/features/TDetailPreview.vue`
    - Component Test Page
    - Func [formatterComposer]
  - Feature [TRaceSchedule] - `./components/features/TRaceSchedule.vue`
    - Completed BS Logic
      - Func [DataParser]
    - Completed Component Style

- Composables - `./composables`

  - Scope: - `./composables/BS-related.ts`
    - Feature [use_BS_logics]
    - Func [t_roundFormat_zhcnStr]
  - Scope: - `./composables/common.ts`
    - Update: Destruct Func `useProjectConstants` to `useProjectRoutesInfo` and `useProjectConstants` , move the latter into `./utils/common.ts`.

- Utils in FE - `./utils/common.ts`

  - Added More - [useRxjs]
  - Added More - [useDateFns]
  - Added More - [lodash]
  - Added More - [lodash/FP]
  - Scope [myFuncs]
    - Func [getISODay_zhcnStr]
    - Fix [num2ChineseNum]
      - About num > 10 & num < 20 Scope problem.

- Store - `./stores`

  - Feature [useTournamentStore] as Composable - `./composables/common.ts`
  - Scope: Completed `TournamentStore`
    - Store State Final Type Structure
    - Completed Store BS Logics
    - Func: [Handle_Add/Remove_Project]
    - Func: [Handle_Add/Remove_Round]
      - Scope: `break_time`
      - Scope: `lottery_time`

- Constants - `./constants/tournament.ts`

  - Added - Tournament needed constants.
  - Update - BS needed constants update.

- Page - `./pages/T_Info.vue`

  - Feature: completed page styles.
  - Feature: completed BS Logic.
    - Validations path
    - And so on.

- UX - Improvement
  - Page [T_Info] - `./pages/T_Info.vue`
    - Feature: added animate when add `RoundLikeItem`
  - Layout [pc] - `./layouts/pc.vue`
    - Feature: Improved Project Search Platte Open Logic, now using `cmd + k`, instead of `enter(global)`.
    - Feature: Page Content in center display.
    - Fix: Fixed Layout doesn't fill all visible space problem, `<main>` content leaking, box structure damage.
  - Component [ProjectStyledModal] - `./components/ProjectStyledModal.vue`
    - Fix: Fixed content leaking, box structure damage.

### Routine. -- 2023/12/23

- Composables - `./composables`

  - Func [t_stateCalc]
  - Func [t_roundsNameArrCalc]

- Page - `./pages`

  - T_List complete - `./pages/T_List.vue`

- Components - `./components`

  - Feature [TDetailPreview]
  - Feature [BulkMailSend]
  - Feature [ProjectStyledModal]
  - Feature [ProjectStyledDataTable]
  - Feature [ProjectStyledPagination]

- Utils in FE - `./utils/common.ts`

  - Feature [useDefu]
  - Scope [myFuncs]
    - Func [num2ChineseNum]
    - Func [formatterComposer]
    - Func [isValidUrl]
    - Func [isPowerOfTen]
  - More DateFns Funcs used...

- Test
  - Page `./pages/Test/test3.vue`, about TDetailPreview.
  - Feature [Vitest] support.
  - TestCase [num2ChineseNum]
  - TestCase [formatterComposer]
  - Aware testFunc throwing behavior.
  - TestCase about date format => M-d => 7-23.

### Routine. -- 2023/12/20

- Page - `./layouts/pc.vue`
  - Feature
    - Project fuse search support & UX impr.
    - PopoverSearchInput support.
    - Page Styles.
- Project Theme Configuration.
- Utils & Composable in FE - `./utils/common.ts`
  - Move Utils - `useProjectConstants` to Composable, because `router` related info needed be compute.
- Utils in BE - `./server/utils/common.ts`
  - Feature [useSuperJson]
- API Scope
  - API `getUserList` mix fetch feats supported. - `./server/api/user/getUserList.ts`

### Routine. -- 2023/12/19

- Page - `./pages/UserList.vue`
  - Page styles.
  - Feature
    - UserListData fetch filter.
  - Fix: [About Naive DataTable select behaviors.]
    - Naive DataTable `uncheckAll` behavior seems faster than `watchArray` func behavior, essential reason don't know yet. Solved Bug through `nextTick` func.
    - Naive DataTable select behaviors, in BE page fetch circumstance and represent on `rows` parameter, will lose objects track => `undefined`, needed to get the removed items, and change BS logic to solve this behavior problem.
    - `useFetch`'s annoying auto watch behavior.'
  - API Scope - `./server/api/user/getUserList.ts`
    - Improved isFilterFetchJudge logic.
    - Combined isFilterFetch with userListPageFetch.
- Project Styles

### Routine. -- 2023/12/18

- Utils in BE - `./server/utils/common.ts`
  - Feature [useSuperJSON]
  - Feature [useNaiveDiscret]
- Project Constants
  - Project styles.
    - naiveUI_theme_styles - `./constants/projectStyles.ts`
- Page - `./pages/UserList.vue`
  - Feature
    - select user.
    - [XLSX: selected user data export].
      - Data conversions.
    - TODO: Cleaning of user data that needed export.
  - Improve
    - DataTable Ellipsis ToolTip
    - Data Fetching Logic Impr: `toRefs` for `reactive`, using in fetchParams.

### Routine. -- 2023/12/16

- API Scope
  - Types - `./types/api_map_types/index.ts`
    - Updated `API_Response_Raw_POST_getUserList` type.
    - Created `FE_itemDataType_getUserList` type.
- Composable in FE - `./composables/common.ts`
  - Improve `reAuthLogin` logic.
  - Imporve `navigateToRedirectFrom` logic.
  - Feature [route]
  - Feature [router]
  - Feature [useNaiveDialog]
  - Feature [useNaiveNotification]
  - Func: judgeError_for_ReAuthNeed
- Utils in FE - `./utils/common.ts`
  - Feature [XLSX]
    - Func: xlsx_json_to_sheet
  - Feature [date-fns]
    - Func: useDateFns
    - Func: useDateFns_FP
- Utils in BE - `./server/utils/common.ts`
  - Feature [date-fns]
    - Func: useDateFns
    - Func: useDateFns_FP
- UnoCSS - `./uno.config.ts`
  - Custom SVGs iconSet support.
- Page - `./pages/Test/style-display.vue`
  - Project assets display.
- Page - `./pages/Login.vue`
  - Feature: Now you can use `Enter` to trigger login logic, no need to click on the login button.
  - UX: Add `Enter` keyStroke feature notification.
- Chore
  - Project constants rename, management.
  - Update README.
  - Update Notes.

### Routine.(DESC) -- 2023/12/13

- Git: learn rebase command. From commit 1,2,3,4; Append commit 3 to commit 1.
- Manage project needed assets. - `./assets/svgs/*`
- Page: `projectStyles.vue`
  - display project colors.
  - display project svgs in assets.
- API Scope
  - Types: update project API response type. - `./types/api_map_types/index.ts`
  - URL_path: `./server/api-map/index.ts`
    - update url path of getUserList.
    - update project staging version base url.
- Utils in FE - `./utils/common.ts`
  - Feature: [myFuncs].
    - Func: myFuncs.fromPairs
    - Func: myFuncs.random
    - Func: myFuncs.toPairs
    - Func: myFuncs.random
  - Make immediate layer for external funcs, like lodash. Reduce application coupling.
  - Replace removeable codes that directly using external funcs with `myFuncs`.

### Routine.(DESC) -- 2023/12/11

- Utils in FE - `./utils/features.ts`
  - Feature: [XLSX]
    - Func: xlsx_sheet_to_json
  - Func: dictionary_keyValueConvertFunc
  - Func: dictionary_ObjectKeyMappingConvertFunc
  - Func: getFilesFromFileInputElements
  - TODO: Could be refactor to `./utils/features.ts`.

### Routine.(DESC) -- 2023/11/30

- Admin Module
  - Pinia: Admin Store
    - Func: login
    - Func: logout
    - Func: reAuthLogin
  - Nitro-API: `admin/login.ts`
  - Page: `Login.vue`
- API Scope
  - `./server/api-map/index.ts`
- Response Types
  - `./types/api_map_types/index.ts`
- Utils in FE. - `./utils/common.ts`
  - Feature: [useJSONPath]
  - Feature: [_ (useLodash)]
  - Feature: [useMagicRegExp]
  - Feature: [useRxjs]
- Utils in BE. - `./server/utils/common.ts`
  - Func: getAuthorization_ArrPair_fromH3EventHandlerReq
  - Func: getContextParams_fromH3EventHandlerReq
  - Feature: [useJSONPath]
  - Feature: [\_ (useLodash)]
  - Func: getProjectEnv
  - Func: getProjectBaseUrl
  - Func: getProjectAPIPath
- Composables in FE. - `./composables/common.ts`
  - Feature: [userStore]
  - Feature: [useNaiveMessage]
  - Func: navigateToRedirectFrom
- getProjectEnv
  - Upsert: `.env` file, add PROJECT_ENV parameter.
  - Components: `ProjectEnv.vue`.
  - Nitro-API: `getProjectEnv.ts`.
  - Update: `App.vue`.
- UnoCSS attributify feature enable. - `./uno.config.ts`

### Https Support.

> Some advanced features needs the https support.

- Install the needed `mkcert` npm package first.
- Create a keys maintain folder in your project's root called `keys`, use the default path in the below script: `./keys/[xxx.cert, etc. your keys and certs.]`. Or use your own valid path, don't forget to change the path either in the below script BTW (by the way).
- Add these three scripts to your package.json file's scripts section for future use.
- Run the `https-credentials-gen` script, get the cert files generated in `https-cert-script` step.
- Config the corresponding section in your project's nuxtConfig: `devServer.https & port` in your nuxt.config.ts file.
- Open your cert file you generated in `https-cert-script` script step. Not the cert file with `-ca` suffix! ( Which i used to distinguish the credentials generated in the `ca` step. ).
- Trust it though your specific OS platform procedures.
- Restart the server, and see the effort.

```typescript
// package.json
"https-credentials-gen": "bun run https-ca-script && bun run https-cert-script",

"https-ca-script": "mkcert create-ca --organization zzxLocalDev --key ./keys/zzx-local_dev-ca.key --cert ./keys/zzx-local_dev-ca.cert",

"https-cert-script": "mkcert create-cert --domain localhost --ca-key ./keys/zzx-local_dev-ca.key --ca-cert ./keys/zzx-local_dev-ca.cert --key ./keys/zzx-local_dev.key --cert ./keys/zzx-local_dev.cert"

// nuxt.config.ts
devServer: {
  https: {
    key: "./keys/zzx-local_dev.key",
    cert: './keys/zzx-local_dev.cert'
  },
  port: 3010,
},
```

---

### Create and organize project directory structure.

Highly recommended using the `Nuxtr` plugin of VSCode.
You could follow the below link tutorial's `Additional notes for an optimal setup` section.
https://nuxt.com/docs/getting-started/installation

- components

  For project common components.

  > https://nuxt.com/docs/guide/directory-structure/components

- assets

  For project assets, svg, and png files etc. that won't be served from the public/ directory.

  > https://nuxt.com/docs/guide/directory-structure/assets

  - fonts
  - svgs

- composables

  For project functional utils with auto import.

  > https://nuxt.com/docs/guide/directory-structure/composables

- keys

  For project needed certifications that supports devServer https feature.

- layouts

  For project layout components.

  > https://nuxt.com/docs/guide/directory-structure/layouts

- middleware

  For project router middleware.

  > https://nuxt.com/docs/guide/directory-structure/middleware

- mocks

  For project mocks feature.

- pages

  For project page components.

  > https://nuxt.com/docs/guide/directory-structure/pages

- plugins

  For project plugins.

  > https://nuxt.com/docs/guide/directory-structure/plugins

- stores

  For project Pinia like state management stores.

- test

  For project test files.

- public

  For project's static assets.

  > https://nuxt.com/docs/guide/directory-structure/public

- modules

  > https://nuxt.com/docs/guide/going-further/modules

  - Nuxt Kit
    > https://nuxt.com/docs/guide/going-further/kit

- server

  > https://nuxt.com/docs/guide/directory-structure/server

- utils

  The main purpose of the utils/ directory is to allow a semantic distinction between your Vue composables and other auto-imported utility functions.￼

  > https://nuxt.com/docs/guide/directory-structure/utils

---

### Install basic dependencies.

- UnoCSS.

  ```typescript
  // bash
  bun add -D @unocss/nuxt
  // nuxt.config.ts
  modules: ['@unocss/nuxt']
  // create a uno.config.ts file:
  import {defineConfig} from 'unocss'
  e..d.. defineConfig({
      //...UnoCSS options.
  })
  ```

  > https://unocss.dev/guide/config-file

- naive-ui

  ```typescript
  // bash
  bun add -D naive-ui
  // For Style overlay issues.
  // {{projectRoot}}/plugins/naive-ui.client.ts
  export default defineNuxtPlugin(async () => {

    const meta = document.createElement('meta');
    meta.name = 'naive-ui-style';
    document.head.appendChild(meta);
    // useHead({
    // meta: [{ name: 'naive-ui-style' }],
    // });
  });
  ```

  Auto-import has already builtin in Nuxt3.
  You could see it in https://github.com/unplugin/unplugin-auto-import Nuxt section.
  Use the imports.presets config option in `nuxt.config.ts` to import your needed functions of Naive-UI.

- unplugin-vue-components

  ```typescript
  // bash
  bun add -D unplugin-vue-components
  // nuxt.config.ts
  import Components from "unplugin-vue-components/vite";
  import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()],
      }),
    ],
  }
  ```

- unplugin-auto-import

  Not needed anymore in Nuxt3 though. It's already built in.

  Check the below link and nuxt.config.ts file for more info.

  https://nuxt.com/docs/guide/concepts/auto-imports#auto-import-from-third-party-packages

  ```typescript
  // bash
  bun add -D unplugin-auto-import
  // nuxt.config.ts
  import AutoImport from "unplugin-auto-import/vite"
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      })
    ]
  }
  ```

- VueUse.

  ```typescript
  // bash
  bun add @vueuse/nuxt @vueuse/core
  // For useRouteParams and query...
  bun add @vueuse/router
  // For useFuse
  bun add @vueuse/integrations fuse.js
  // For rxjs
  bun add @vueuse/rxjs rxjs
  // For vOnKeyStroke
  bun add @vueuse/components
  // nuxt.config.ts
  modules: ['@vueuse/nuxt']

  // Some useful funcs.
  // 1
  watchArray
  watchAtMost
  watchIgnorable
  watchPausable
  invoke
  until
  whenever
  watchOnce
  watchDeep
  watchImmediate
  watchThrottled
  watchDebounced
  useDropZone
  useTimeout
  useTimeoutFn
    // Time
  formatTimeAgo
  useTimeAgo
  useDateFormat
  useNow
  useTimestamp
  // 2
  useobjectUrl
  useDraggable
  useWindowScroll
  useParentElement
  useFavicon
  useEventListener
  useEyeDropper
  useFileDialog
  useFileSystemAccess
  useFullscreen
  usePermission
  useScreenSafeArea
  useTextareaAutosize
  useTitle
  useUrlSearchParams
  useVibrate
  useWakeLock
  useWebNotification - Seems not work.
  useWebWorkerFn
  onKeyStroke
  // Sensors
  useDeviceMotion
  useDeviceOrientation
  useDevicePixelRatio
  useDeviceList
  useInfiniteScroll
  useKeyModifier
  useMagicKeys
  usePageLeave
  useParallax
  useMouse
  useBroadcastChannel

  // Utilities
  createInjectionState
  - useCounterStoreWithDefaultValue
  useToggle
  useThrottleFn
  useDebouncedFn
  makeDestructurable
  get
  set
  unrefPost
  isDefined
  createEventHook
  useEventBus
  useOffsetPagination
  useAsyncQueue
  useCycleList
  useMemorize
  useStepper
  useSupported
  //
  useIdle
  ```

  > https://vueuse.org/core/createReusableTemplate/#createreusabletemplate

---

- Efficiency tools.

  - date-fns

    ```typescript
    // bash
    bun add date-fns
    ```

  - jsonpath-plus

    ```typescript
    // bash
    bun add jsonpath-plus
    ```

  - lodash

    ```typescript
    // bash
    bun add lodash
    ```

  - magic-regexp

    ```typescript
    // bash
    bun add magic-regexp
    // nuxt.config.ts
    // This will alse enable auto-imports of magic-regexp helpers.
    modules: ['magic-regexp/nuxt']
    ```

    > https://regexp.dev/getting-started/usage

  - nuxt-typed-router

    ```typescript
    // bash
    bun add -D nuxt-typed-router
    // nuxt.config.ts
    modules: ['nuxt-typed-router']
    ```

    > https://nuxt.com/modules/typed-router

  - rxjs

    ```typescript
    // bash
    bun add rxjs
    ```

  - classnames

    ```typescript
    // bash
    bun add classnames
    ```

  - @hebilicious/server-block-nuxt

    > Error: 与类型“NuxtModule<ModuleOptions>”和“NuxtModule<ModuleOptions>”相比，堆栈深度过高。

    > Till 2023-11-23, it doesn't finish support multiple server blocks in a single file TODO yet.

    ```typescript
    // bash
    bun add @hebilicious/server-block-nuxt @hebilicious/sfc-server-volar
    // nuxt.config.ts
    modules: ['@hebilicious/server-block-nuxt']
    ```

---

- UX helpful dependencies.

  - gsap

    ```typescript
    // bash
    bun add gsap
    ```

  - Auto-animate

    ```typescript
    // bash
    bun add @formkit/auto-animate
    ```

  - nuxt-swiper

    > https://swiperjs.com/demos

    ```typescript
    // bash
    bun add nuxt-swiper
    // nuxt.config.ts
    modules: ['nuxt-swiper']
    swiper: {
        // Swiper options
    }

    // Some intresting effects.
    // Routine type
    Pagination
    Space between
    Infinite loop
    Scrollbar
    Nested
    Keyboard control
    Mousewheel control
    Autoplay
    Autoplay progress
    Thumbs gallery
    Thumbs gallery loop
    Responsive breakpoints
    // Advanced type
    Effect cube
    Effect coverflow
    Effect cards
    Effect creative
    Parallax
    ```

  - vue-transitions

    > https://nuxt.com/modules/vue-transitions

  - @nuxt/ui

    ```typescript
    // bash
    bun add @nuxt/ui
        // If you want latest updates:
        // package.json
        "devDependencies": {
            "@nuxt/ui": "npm:@nuxt/ui-edge@latest"
        }
    // nuxt.config.ts
    modules: ['@nuxt/ui']
    ```

    > https://ui.nuxt.com/getting-started/installation

    As this module installs @nuxtjs/tailwindcss and @nuxtjs/color-mode for you, you should remove them from your modules and dependencies if you've previously installed them manually.

---

- Media related.

  - @nuxt/image

    ```typescript
    // bash
    bun add @nuxt/image
    // nuxt.config.ts
    modules: ['@nuxt/image']
    image: {}
    ```

    > https://image.nuxt.com/get-started/installation

  - TwicPics

    > https://nuxt.com/modules/twicpics

    Demo - Nuxt3:

    > https://twicpics-nuxt3-demo.netlify.app/?utm_campaign=components&utm_medium=organic&utm_source=github

  - nuxt-icons

    ```typescript
    // bash
    bun add nuxt-icons
    // nuxt.config.ts
    modules: ['nuxt-icons']
    ```

    > https://nuxt.com/modules/icons

  - @nuxtjs/svg-sprite

    ```typescript
    // bash
    bun add @nuxtjs/svg-sprite
    // nuxt.config.ts
    buildModules: ['@nuxtjs/svg-sprite'],
    svgSprite: {
        // manipulate module options
        // input default: ~/assets/sprite/svg
        input: '~/assets/svg/'
    }
    // Pre-requisites
    Place your svg files in ~/assets/sprite/svg/, say sample.svg and use your image with globally registered svg-icon component:
    // Then use svg-icon component.
    <svg-icon name="sample" />
    ```

    > https://nuxt.com/modules/svg-sprite

  - nuxt-svgo

    Not recommended.

    > https://nuxt.com/modules/nuxt-svgo

---

- Features Point.

  - Pinia.

    ```typescript
    // bash
    bun add @pinia/nuxt
    // nuxt.config.ts
    modules: ['@pinia/nuxt']
    ```

  - Pinia-plugin-persistedstate

    ```typescript
    //bash
    bun add -D @pinia-plugin-persistedstate/nuxt
    // nuxt.config.ts
    modules: ['@pinia-plugin-persistedstate/nuxt']
    ```

    > https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html

  - vitest

    ```typescript
    // bash
    bun add -D @nuxt/test-utils vitest
    // nuxt.config.ts
    modules: ['@vueuse/nuxt']
    ```

    > https://nuxt.com/docs/getting-started/testing

    > https://github.com/vitest-dev/vitest

  - @faker-js/faker

    ```typescript
    // bash
    bun add @faker-js/faker
    ```

    > https://fakerjs.dev/guide/usage.html

  - msw

    ```typescript
    // bash
    bun add msw
    // {{projectRoot}}/plugins/mock.client.ts
    import { worker } from "@/mocks/browser";
    export default defineNuxtPlugin(async () => {
      await worker.start({
      onUnhandledRequest: "bypass",
      });
    });
    // {{projectRoot}}/public/mockServiceWorker.js
    // {{projectRoot}}/mocks/browser.ts
    import { setupWorker } from 'msw';
    import { handlers } from './handlers';
    export const worker = setupWorker(...handlers);
    // {{projectRoot}}/mocks/handlers.ts
    // Use with @faker-js/faker.
    // Write your own mock api handlers here.
    import { rest } from "msw";
    import { fakerZH_CN as faker } from "@faker-js/faker";

    const {
      person,
      phone,
      number,
      date,
      string,
      seed,
      setDefaultRefDate,
      location,
      helpers,
      lorem,
      finance,
    } = faker;

    export const handlers = [
      rest.get(`{{Your mock api path}}`, (req,res,ctx) => {
        return res(
          ctx.status(200),
          ctx.json({{anything here}})
        )
      }),
      // rest.get()xxx, etc.
    ]
    ```

    > https://mswjs.io/docs/getting-started#step-1-install

  - xlsx

    Not certain yet, about its import methods. Check it's Docs for details.

    > https://docs.sheetjs.com/docs/getting-started/installation/standalone

    ```typescript
    // bash
    bun add xlsx
    ```

  - i18n

    ```typescript
    // bash
    bun add @nuxtjs/i18n
    // nuxt.config.ts
    modules: [
      ['@nuxtjs/i18n', {
          locales: ['en','zh-cn'],
          defaultLocale: 'en'
          vueI18n: {
            fallbackLocale: 'en',
            messages: {
              en: {
                greeting: 'Hello World!'
              },
              es: {
                greeting: ''
              }
            }
          }
        }
      ]
    ]
    // Then use it in your component.
    <h1>{{$t('greeting')}}</h1>
    <nuxt-link
      v-if="$i18n.locale !== 'en'"
      :to="switchLocalePath('en')"
    > English </nuxt-link>
    ```

  - @vite-pwa/nuxt

    ```typescript
    // bash
    bun add -D @vite-pwa/nuxt
    // nuxt.config.ts
    modules: ['@vite-pwa/nuxt'],
    pwa: {
        // PWA options
    }
    ```

    Check below link for complete guide on how to configure and use this plugin.

    > https://vite-pwa-org.netlify.app/frameworks/nuxt

  - @nuxtjs/storybook

    Throwing errors. Cause using bun. You will need a workaround or using pnpm etc. instead.

    ```typescript
    // bash
    bun add -D @nuxtjs/storybook
    // nuxt.config.ts
    modules: ['@nuxtjs/storybook']
    storybook: {
      url: "http://localhost:6006",
      storybookRoute: "/__storybook__",
      port: 6006,
    },
    ```

  - @storybook-vue/nuxt-storybook

    This module is not recommended. It's in its early stages.

    ```typescript
    //bash
    bun add -D @storybook-vue/nuxt-storybook
    // nuxt.config.ts
    modules: ['@storybook-vue/nuxt-storybook']
    storybook: {
        url: 'http://localhost:6006',
        storybookRoute: '/__storybook__',
        port: 6006
    }
    ```

  - vue-email

    ```typescript
    // bash
    bun add vue-email
    // A
    bun add @vue-email/nuxt
    // nuxt.config.ts
    ```

    > https://www.vuemail.net/server-side-rendering/nuxt#installation

  - @sidebase/nuxt-auth

    ```typescript
    // bash
    bun add -D @sidebase/nuxt-auth
        // If you want to use authjs provider, you have to install next-auth. You can find available next-auth version on npm.
        bun add next-auth@4.21.1
    // nuxt.config.ts
    modules: ['@sidebase/nuxt-auth'],
    auth: {
        provider: {
            type: 'authjs' ｜ 'local'
        }
    }
    ```

    Provider: authjs

    > ~/server/api/auth/[...].ts

    ```typescript
    // After the nuxt.config.ts setup from above you have to create the authentication handler (NuxtAuthHandler) that will setup the backend and expose the API endpoints for handling all authentication-related requests and add at least one authentication provider
    import { NuxtAuthHandler } from "#auth";
    import GithubProvider from "next-auth/providers/github";
    export default NuxtAuthHandler({
      providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
          clientId: "enter-your-client-id-here",
          clientSecret: "enter-your-client-secret-here",
        }),
      ],
    });
    ```

    Provider: local

    > https://sidebase.io/nuxt-auth/v0.6/getting-started/quick-start

---

- Ultimate dependencies.

  - @nuxtjs/web-vitals

    ```typescript
    // bash
    bun add -D @nuxtjs/web-vitals
    // nuxt.config.ts
    modules: ['@nuxtjs/web-vitals']
    webVitals: {
        // provider: '', // auto detected
        debug: false,
        disabled: false
    }
    ```

  - tresjs

    ```typescript
    // bash
    bun add @tresjs/nuxt
    // nuxt.config.ts
    modules: ['@tresjs/nuxt']
    ```

    > https://nuxt.com/modules/tresjs

  - nuxt-api-party

    ```typescript
    // bash
    bun add -D nuxt-api-party
    // nuxt.config.ts
    modules: ['nuxt-api-party']
    ```

  - Template

    ```typescript
    // bash
    bun add
    // nuxt.config.ts
    ```

  - @vue-macros/nuxt
    > https://vue-macros.dev/guide/nuxt-integration.html
  - sanity
  - primevue
  - quasar
  - maz-ui
    > https://louismazel.github.io/maz-ui-3/
  - nuxt-link-checker
    > https://nuxt.com/modules/link-checker
  - unhead
    > https://nuxt.com/modules/unhead
  - nuxt-session
    > https://nuxt.com/modules/session
  - cookie-control
    > https://nuxt.com/modules/cookie-control
  - partytown
    > https://partytown.builder.io/
  - nuxt-viewport
    > https://nuxt.com/modules/nuxt-viewport
  - nuxt-seo-experiments
    > https://nuxtseo.com/experiments/getting-started/installation
  - nuxt-mapbox
    > https://nuxt.com/modules/nuxt-mapbox
  - nuxt-electron
    > https://nuxt.com/modules/electron
  - Pinia-ORM
    > https://pinia-orm.codedredd.de/guide/getting-started/quick-start
  - Inkline
    > https://www.inkline.io/docs

---

### Init (DESC)

- bunx nuxi@latest init . --force
- setup Nuxtr Ext recommanded. Update the nuxt.config.ts file => typescript.shim = false.

  You could follow the below link tutorial's `Additional notes for an optimal setup` section.

  > https://nuxt.com/docs/getting-started/installation

- Git commit.

- Create new project in organization.

  Select License and Readme file.

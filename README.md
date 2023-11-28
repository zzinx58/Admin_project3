# Admin Project3

## Procedures(DESC)

- Install basic dependencies.

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
    watchDeep
    watchImmediate
    watchThrottled
    watchDebounced
    useDropZone
    useDraggable
    useWindowScroll
    useParentElement
    useFavicon
    useEventListener
    useEyeDropper
    useFileDialog
    useFileSystemAccess
    useFullscreen
    useobjectUrl
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
    // Time
    formatTimeAgo
    useTimeAgo
    useDateFormat
    useNow
    // Utilities
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
    // nuxt.config.ts
    modules: ['@pinia/nuxt']
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

  - @hebilicious/server-block-nuxt

    > Till 2023-11-23, it doesn't finish support multiple server blocks in a single file TODO yet.

    ```typescript
    // bash
    bun add @hebilicious/server-block-nuxt @hebilicious/sfc-server-volar
    // nuxt.config.ts
    modules: ['@hebilicious/server-block-nuxt']
    ```

  - nuxt-typed-router

    ```typescript
    // bash
    bun add -D nuxt-typed-router
    // nuxt.config.ts
    modules: ['nuxt-typed-router']
    ```

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

    ```typescript
    // bash
    bun add nuxt-swiper
    // nuxt.config.ts
    modules: ['nuxt-swiper']
    swiper: {
        // Swiper options
    }
    ```

  - vue-transitions

    > https://nuxt.com/modules/vue-transitions

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

  - @storybook-vue/nuxt-storybook

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

- Init project.

  - bunx nuxi@latest init . --force
  - setup Nuxtr Ext recommanded. Update the nuxt.config.ts file => typescript.shim = false.
    > https://nuxt.com/docs/getting-started/installation
  - Git commit.

- Create new project in organization.

  Select License and Readme file.

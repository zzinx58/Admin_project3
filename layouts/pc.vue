<script lang="ts" setup>
// Notice Here.
import { useFuse } from "@vueuse/integrations/useFuse";
import { numberAnimationProps, type InputInst } from "naive-ui";
import { registerRuntimeCompiler } from "vue";
//----------------------------------------------------------------
/* Page Templates */
const [DefineHeader, ReuseHeader] = createReusableTemplate();
const [DefineSidebarResizer, ReuseSidebarResizer] = createReusableTemplate();
const [DefineSearchResultContent, ReuseSearchResultContent] =
  createReusableTemplate();
//----------------------------------------------------------------
/* Sidebar Resize Scope */
const sidebarElRef = ref<HTMLElement>();
const resize_block = ref<HTMLElement>();
//----------------------------------------------------------------
/* Project Search Scope */
// Browser's input search effect might be little difficult to implement. Use another way temporarily.
const projectSearchContainerRef = ref<HTMLDivElement>();
const projectSearchRef = ref<InputInst>();
const searchResultContainerRef = ref<HTMLDivElement>();

const projectSearchValue = ref("");
// const projectSearchValueStage = ref("");
const projectSearchInfoData = useProjectRoutesInfo();

const { results: projectSearchResult } = useFuse(
  projectSearchValue,
  // projectSearchValueStage,
  projectSearchInfoData,
  {
    resultLimit: 9,
    fuseOptions: {
      keys: ["name", "title"],
    },
    matchAllWhenSearchEmpty: true,
  }
);

const selectListChildIndex = ref(-1);
const currentFakeSelectElIndex = computed({
  get: () => selectListChildIndex.value,
  // computed-set will return setted result.
  set: (value: number) => {
    // console.log(value);
    switch (value <= -1) {
      case true:
        selectListChildIndex.value = searchResultListChildsRef.value.length - 1;
        break;
      case false:
        if (value >= searchResultListChildsRef.value.length) {
          selectListChildIndex.value = 0;
        } else {
          selectListChildIndex.value = value;
        }
        break;
    }
  },
});
const searchResultListChildsRef = ref<HTMLElement[]>([]);
const currentFakeSelectEl = computed(
  () => searchResultListChildsRef.value[currentFakeSelectElIndex.value]
);
//----------------------------------------------------------------
const { k, command } = useMagicKeys();
const [isOpenSearchPlate, toggleSearchPlateOpen] = useToggle();
watch([command, k], (v) => {
  if (v.every((item) => item === true)) {
    toggleSearchPlateOpen();
    isOpenSearchPlate.value
      ? projectSearchRef.value?.focus()
      : projectSearchRef.value?.blur();
  }
});
onKeyStroke(
  ["Enter", "ArrowDown", "ArrowUp"],
  (e) => {
    searchResultListChildsRef.value = Array.from(
      searchResultContainerRef.value?.children as unknown as HTMLElement[]
    );
    switch (e.key) {
      case "Enter":
        currentFakeSelectEl.value.dispatchEvent(new Event("click"));
        projectSearchRef.value?.blur();
        break;
      case "ArrowDown":
        currentFakeSelectElIndex.value += 1;
        break;
      case "ArrowUp":
        currentFakeSelectElIndex.value -= 1;
        break;
    }
  },
  {
    target: projectSearchContainerRef,
  }
);
//----------------------------------------------------------------
const dontNeedRouteItems = ["login"];
// const dontNeedRouteItems = ["login", "test", "style"];
const menuItemsData = projectSearchInfoData.filter((itemA) => {
  const result = dontNeedRouteItems.some((itemB) => {
    const result = !~itemA.path.toLowerCase().indexOf(itemB);
    return result;
  });
  return result;
});
// watchEffect(() => {
//   console.log(projectSearchResult.value.map((item) => item.item));
// });
console.log(menuItemsData);
//----------------------------------------------------------------
</script>

<template>
  <DefineSearchResultContent>
    <div class="w-250px" ref="searchResultContainerRef">
      <div
        v-if="projectSearchResult.length !== 0"
        v-for="(result, index) in projectSearchResult"
        :tabindex="0"
        :data-index="index"
        @click="navigateTo(result.item.path)"
        :class="`flex items-center justify-between hover:(bg-#F3F3F5) py-1 ${
          currentFakeSelectElIndex === index ? 'bg-#F3F3F5' : ''
        }`"
      >
        <div class="text-14px">
          {{ result.item.title ?? result.item.name }}
        </div>
        <div
          :class="`${
            result.item.itemType === 'page'
              ? 'h-16px w-16px rounded-full bg-green'
              : ''
          }`"
        />
      </div>
    </div>
  </DefineSearchResultContent>
  <DefineHeader>
    <header class="h-full flex justify-between">
      <div
        class="flex items-center gap-14 mr-5"
        ref="projectSearchContainerRef"
      >
        <!-- trigger="click" -->
        <n-popover
          trigger="focus"
          :show-arrow="false"
          placement="bottom"
          class="rounded-24px"
          :style="{
            'border-radius': '10px',
          }"
        >
          <!-- :show="projectSearchFocused" -->
          <template #trigger>
            <n-input
              ref="projectSearchRef"
              size="large"
              class="flex items-center"
              placeholder="Cmd + K , 搜索系统内容..."
              :clearable="true"
              :style="{
                height: '48px',
                'border-radius': '24px',
                'font-size': '16px',
                width: '288px',
                'min-width': '200px',
              }"
              v-model:value="projectSearchValue"
            >
              <!-- @input="console.log('input')" -->
              <!-- @input-focus="projectSearchFocused = true"
              @blur="projectSearchFocused = false" -->
              <template #suffix>
                <n-button quaternary circle>
                  <template #icon>
                    <div
                      class="i-custom-base:nav-search text-20px text-main-btn_primary-positive"
                    />
                  </template>
                </n-button>
              </template>
            </n-input>
          </template>
          <ReuseSearchResultContent />
        </n-popover>
        <div
          class="i-custom-base:nav-email w-40px h-35px cursor-pointer hover:opacity-60"
          text="main-btn_primary-negative hover:main-btn_primary-positive "
        />
        <div
          class="i-custom-base:nav-ringbell w-40px h-35px cursor-pointer hover:opacity-60"
          text="main-btn_primary-negative hover:main-btn_primary-positive"
        />
      </div>

      <div class="flex items-center gap-5 mr-5">
        <span class="text-24px text-#292968">{{
          adminStore().adminInfo.username
        }}</span>
        <n-avatar round :size="50" class="bg-white">
          <div class="i-mdi:account text-35px text-main-btn_primary-negative" />
        </n-avatar>
      </div>
    </header>
  </DefineHeader>
  <DefineSidebarResizer>
    <div
      id="sidebar-resize-area"
      class="group/resize absolute left-0 top-0 h-full w-32px grid place-content-center -mx-10"
    >
      <div
        class="w-28px h-200px hover:cursor-ew-resize grid place-content-center"
        @click=""
        @pointerup="
          (e) => {
            console.log('poniterUp');
          }
        "
        ref="resize_block"
      >
        <div
          class="w-12px h-200px rounded-24px transition-colors duration-300 group-hover/resize:bg-[#B9BABE]"
        ></div>
      </div>
    </div>
  </DefineSidebarResizer>

  <div class="app">
    <!-- <div ref="sidebarElRef" class="left-scope resize-x overflow-hidden w-200px"> -->
    <!-- <div ref="sidebarElRef" class="left-scope overflow-hidden">
      <div></div>
    </div> -->
    <aside class="left-scope">
      <div class="left-header">
        <div class="i-custom-base:nav-logo h-58px w-100px bg-black" />
      </div>
      <div class="left-content mt-14">
        <VMenuBar
          v-bind="{
            menuData: menuItemsData,
            menuItemClass:
              'text-main-btn_primary-negative text-20px leading-42px hover:text-main-btn_primary-positive hover:bg-#DCDCDC rounded-e-20px',
          }"
        ></VMenuBar
      ></div>
      <div class="left-footer">123</div>
    </aside>
    <div class="right-scope mx-10 overflow-auto">
      <ReuseSidebarResizer />
      <div class="right-header">
        <ReuseHeader />
      </div>
      <!-- items-center? -->
      <!-- <div class="right-content overflow-auto grid justify-center items-center"> -->
      <div class="right-content overflow-auto">
        <!-- <main class="mx-8 mt-8 mb-19"> -->
        <main class="mx-8 mt-8 mb-12">
          <slot />
        </main>
      </div>
      <div class="right-footer"></div>
    </div>
  </div>
</template>

<style scoped lang="css">
.app {
  --uno: h-100vh grid;
  grid-template-areas: "left-scope right-scope";
  /* --uno: grid-cols-[280px_1fr]; */
  /* prettier-ignore */
  --uno: 2xl:grid-cols-[280px_1fr];
  /* prettier-ignore */
  --uno: grid-cols-[160px_1fr] duration-600;
  --uno: bg-main-base-outside;
  --headerHeight: theme("headerHeight");
  --footerHeight: theme("footerHeight");
}
/* --- */

/* --- */
.right-scope {
  --uno: grid-area-[right-scope];
  --uno: h-full grid relative;
  grid-template-areas:
    "right-header"
    "right-content"
    "right-footer";
  grid-template-rows: var(--headerHeight) 1fr var(--footerHeight);
}
.right-header {
  --uno: grid-area-[right-header];
}
.right-content {
  --uno: grid-area-[right-content];
  --uno: rounded-24px bg-main-base-content;
  --uno: shadow-inset shadow-md;
  /* prettier-ignore */
  /* --uno: grid 2xl:justify-center; */
  @media (min-width: 1536px) {
    main {
      display: grid;
      /* place-content: center; */
      justify-content: safe center;
    }
  }
}
.right-footer {
  --uno: grid-area-[right-footer];
}
/* --- */
.left-scope {
  --uno: grid-area-[left-scope];
  grid-template-areas:
    "left-header"
    "left-content"
    "left-footer";
  /* prettier-ignore */
  --uno: grid grid-rows-[var(--headerHeight)_1fr_100px];
  /* --uno: bg-green; */
  /* --uno: min-w-50px; */
  /* --uno: max-w-250px; */
}
.left-scope::-webkit-scrollbar {
  display: none;
}
.left-header {
  --uno: grid-area-[left-header];
  --uno: grid place-content-center;
}
.left-content {
  --uno: grid-area-[left-content];
}
.left-footer {
  --uno: grid-area-[left-footer];
}
</style>

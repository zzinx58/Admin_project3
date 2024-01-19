<script lang="ts" setup>
defineProps<{
  menuData: MenuItemProps[];
  menuItemClass?: string;
}>();
export type MenuItemProps = {
  itemId: number | string;
  label: string;
  parentId?: number;
  // fileCount:number;
  childrens?: MenuItemProps[];
  iconMeta?: string;
  path?: string;
};
const [DefineVMenuItem, ReuseVMenuItem] =
  createReusableTemplate<MenuItemProps>();

const refRoute = ref(route());
const projectRouteInfoData = useProjectRoutesInfo();
const currentPagePath = computed(() => refRoute.value.path.split("/").pop()!);
const selectedMenuItem = computed(
  () =>
    projectRouteInfoData.find((item) => {
      return item.path.includes(currentPagePath.value);
    })?.itemId
);
watchEffect(() =>
  console.log("cur:" + currentPagePath.value, "else:" + selectedMenuItem.value)
);
</script>

<template>
  <DefineVMenuItem v-slot="{ itemId, label, childrens, iconMeta, path }">
    <li v-if="childrens && childrens.length" class="flex flex-col">
      <input type="checkbox" hidden class="peer" :id="'' + itemId" />
      <div :class="`flex items-center contents ${menuItemClass}`">
        <div :class="`${iconMeta} text-20px`"></div>
        <label
          :for="'' + itemId"
          :class="`label-icon `"
          @click="
            () => {
              // selectedMenuItem = itemId;
              path && navigateTo(`${path}`);
            }
          "
        >
          {{ label }}
        </label>
      </div>

      <div class="subMenu">
        <ul>
          <ReuseVMenuItem
            v-for="item in childrens"
            v-bind="item"
            :key="item.itemId"
          >
          </ReuseVMenuItem>
        </ul>
      </div>
    </li>
    <li v-else>
      <div
        :class="`iconCounter flex items-center contents ${menuItemClass} ${
          selectedMenuItem === itemId ? 'selectedMenuItem' : ''
        } 
        `"
      >
        <div :class="`${iconMeta} text-20px`" />
        <label
          @click="
            () => {
              // selectedMenuItem = itemId;
              path && navigateTo(`${path}`);
            }
          "
        >
          {{ label }}
        </label>
      </div>
    </li>
  </DefineVMenuItem>

  <!--  -->
  <nav class="v_menuTree">
    <ul v-for="item in menuData">
      <ReuseVMenuItem v-bind="item"></ReuseVMenuItem>
    </ul>
  </nav>
</template>

<style scoped lang="css">
.selectedMenuItem {
  --uno: bg-white text-main-btn_primary-positive opacity-100;
  --uno: box-border border-main-btn_primary-positive border-solid border-l-12px
    border-r-0 border-y-0 ml-6;
}
.v_menuTree {
  ul {
    --uno: p-0 m-0;
    --uno: list-none;
    --uno: min-h-0;
    counter-reset: listCounter;
  }

  .iconCounter {
    /* prettier-ignore */
    --uno: 2xl:pl-12 pl-6 font-medium;
    counter-increment: listCounter;
    /* prettier-ignore */
    --uno: before:(content-[counters(listCounter, "-")] text-transparent);
  }

  label {
    --uno: flex items-center px-3;
    --uno: cursor-pointer;
    --uno: opacity-75 hover-opacity-100;
    --uno: w-full;

    /* counter-increment: listCounter; */
    /* prettier-ignore */
    /* --uno: before:(content-[counters(listCounter,'-')] text-transparent); */
    /* prettier-ignore */
    /* --uno: before:(content-[counters(listCounter,'-')] text-red); */
    /* prettier-ignore */
    /* --uno: before:(content-[""] text-20px pr-2 bg-red); */
  }

  .label-icon {
    /* prettier-ignore */
    --uno: after:(content-[""] ml-auto i-mdi:menu-down duration-200 text-30px);
    /* prettier-ignore */
    --uno: -peer-checked:after:rotate-180;
  }

  .subMenu {
    /* prettier-ignore */
    --uno: grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] overflow-hidden duration-300;
  }
}
</style>

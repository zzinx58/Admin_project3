<script lang="ts" setup>
definePageMeta({
  title: "Test5",
  name: "Test5",
  layout: "pc",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});

const { data: testData } = useFetch("/api/test/getTResult");
const { data: testData2 } = useFetch("/api/test/getTApplicants");

/* 
ApplicantsTable:
1. Get All Possible Columns from Datas.
2. Get Needed Row Data.

*/
const menuB = ref<HTMLElement | null>();
onMounted(() => {
  const menuB_raw_elements =
    menuB.value && (Array.from(menuB.value.children) as HTMLElement[]);
  const menuB_elements = menuB_raw_elements?.slice(0);
  // const menuB_elements = menuB_raw_elements?.slice(0, -1);
  const animate_shadow = menuB_raw_elements?.slice(-1)[0];

  let followEffectStyle = "";
  menuB_elements?.every((itemA, index, arr) => {
    /* Item basic styles */
    itemA.classList.add("menuItemBasic");
    itemA.addEventListener("click", () => {
      menuB_elements.forEach((itemB) =>
        itemB.classList.toggle("menuItemSelected", itemA === itemB)
      );
    });

    if (index === arr.length - 1) return false;
    followEffectStyle += `
      .menuItemBasic:nth-child(${
        index + 1
      }):hover~.menuItemBasic:last-child::before {
        --y: calc(var(--menuItemHeight) * ${index});
        opacity: 60%;
      }
      `;

    // const [itemHeight, itemWidth] = [itemA.offsetHeight, itemA.offsetWidth];
    // const [itemTop, itemLeft] = [itemA.offsetTop, itemA.offsetLeft];
    // itemA.addEventListener("mouseover", () => {});
    // itemA.addEventListener("mouseout", (e) => {
    //   const parentRect = itemA.parentElement?.getBoundingClientRect();
    //   const [itemOffsetX, itemOffsetY] = [
    //     e.clientX - parentRect!.left,
    //     e.clientY - parentRect!.top,
    //   ];

    //   console.log(e);
    //   // itemA.style.transition = "none";
    // });
    return true;
  });
  const styleTag = document.getElementById("followEffectStyle");
  styleTag && styleTag.remove();
  followEffectStyle += `
    .menuItemBasic:nth-child(${menuB_elements?.length ?? 0}):hover::before {
      --y: calc(42px * ${(menuB_elements?.length ?? 0) - 1});
      opacity: 60%;
      transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
    }
  `;
  const style = document.createElement("style");
  style.id = "followEffectStyle";
  style.innerHTML = followEffectStyle;
  document.head.appendChild(style);
});
</script>

<template>
  <!-- <pre>{{ testData }}</pre> -->
  <!-- <pre>{{ testData2 }}</pre> -->
  <div class="i-custom-aside_menu:overview"></div>
  <pre>{{ useRouter() }}</pre>
  <pre>{{ useProjectRoutesInfo() }}</pre>

  <div class="sidebar-menu">
    <aside>
      <ul>
        <li>
          <input type="checkbox" id="s1" checked hidden class="peer" />
          <label for="s1">工作台</label>
          <div class="sub">
            <ul>
              <li>项目列表</li>
              <li>数据配置器</li>
            </ul>
          </div>
        </li>
        <li>
          <input type="checkbox" id="s2" hidden class="peer" />
          <label for="s2">权限管理</label>
          <div class="sub">
            <ul>
              <li>权限申请</li>
              <li>我的申请</li>
              <li>权限审批</li>
            </ul>
          </div>
        </li>
        <li>
          <input type="checkbox" id="s3" hidden class="peer" />
          <label for="s3">后台管理</label>
          <div class="sub">
            <ul>
              <li>菜单管理</li>
              <li>站点管理</li>
              <li>角色管理</li>
              <li>用户管理</li>
              <li>接口管理</li>
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  </div>

  <div class="menuB-container" ref="menuB">
    <div>主页</div>
    <div>博客</div>
    <div>随手笔记</div>
    <div>关于此</div>
    <div>联系</div>
    <!-- <div class="animate-shadow"></div> -->
  </div>
</template>

<style scoped lang="css">
aside {
  --uno: w-200px text-white bg-#001529;
  /* --uno: self-start; */

  ul {
    --uno: list-none p-0 m-0 min-h-0;
  }
  li {
    --uno: py-0 px-4px leading-42px;
    /* Why li didn't wrap label scope? */
    /* --uno: cursor-pointer; */
  }
  label {
    --uno: flex items-center pt-0 px-10px;
    --uno: cursor-pointer;
    /* prettier-ignore */
    --uno: opacity-85 hover-opacity-100;
    /* --uno: opacity-85 hover:opacity-100; */

    /* ::after */
    /* --uno: after:(content-[""] w-15px h-15px ml-auto bg-[url("/assets/svgs/base/menu-down.svg")] bg-(center no-repeat) bg-red); */
    /* prettier-ignore */
    --uno: after:(content-[""] ml-auto i-mdi:menu-down text-30px duration-200);
    /* :checked + label::after {
      transform: scaleY(-1);
    } */
    /* prettier-ignore */
    --uno: -peer-checked:after:rotate-180;
    /* --uno: -peer-checked:after:scale-y-100; */
  }
  .sub {
    /* prettier-ignore */
    --uno: grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] duration-300 overflow-hidden;

    li {
      --uno: py-0 px-27px text-14px;
      /* prettier-ignore */
      --uno: opacity-85 hover:opacity-100;
    }
  }
}

.menuB-container {
  --uno: relative bg-gray text-white isolate;
}
.menuItemSelected {
  --uno: bg-red;
}
.menuItemBasic {
  --y: 0px;
  --menuItemHeight: 42px;
  /* prettier-ignore */
  --uno: h-[var(--menuItemHeight)] leading-[var(--menuItemHeight)] cursor-pointer px-27px;

  /* prettier-ignore */
  --uno: last:before:(content-[""] pointer-events-none block bg-#767676 h-[var(--menuItemHeight)] absolute left-0 w-full opacity-0 top-[var(--y)] -z-1);
  /* --uno: last:before:(content-["asd"] pointer-events-none block bg-blue h-42px px-27px absolute left-0 right-0 opacity-40 top-[var(--y)]); */

  /*  &:hover ~ &:last-child::before {
    opacity: 60%;
    /~ --y: 84px; ~/
  }*/
}
.menuItemBasic:hover ~ .menuItemBasic:last-child::before {
  transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
}
/*.menuItemBasic:last-child::before {
  /~ prettier-ignore ~/
  --uno: content-[""] pointer-events-none block bg-#767676 h-[var(--menuItemHeight)] absolute left-0 w-full opacity-0 top-[var(--y)] duration-500 -z-1;
}*/
</style>

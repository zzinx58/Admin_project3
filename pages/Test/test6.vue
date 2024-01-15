<script lang="ts" setup>
definePageMeta({
  title: "Test6",
  name: "Test6",
  layout: "pc",
});
useHead({
  title: `${route().meta.name} - ${route().meta.title}`,
});

type MenuItemProps = {
  itemId: number;
  label: string;
  parentId?: number;
  // fileCount:number;
  childrens?: MenuItemProps[];
  iconMeta?: string;
};
const mockMenuData: MenuItemProps = {
  label: "parent",
  itemId: 1,
  childrens: [
    {
      itemId: 2,
      label: "child-1.1",
      childrens: [
        { label: "child-1.1.1", itemId: 3 },
        {
          label: "child-1.1.2",
          itemId: 4,
        },
      ],
    },
  ],
};

const [DefineUserDetailPart1, ReuseUserDetailPart1] = createReusableTemplate();
const [DefineUserDetailPart2, ReuseUserDetailPart2] = createReusableTemplate();
const [DefineUserDetailPart3, ReuseUserDetailPart3] = createReusableTemplate();

type UserDetailPrefixInfoType = {
  key: string;
  attrLabel: string;
  formatter?: (content: any) => string;
};
const user_detail_prefix_info_arr_part1: UserDetailPrefixInfoType[] = [
  {
    attrLabel: "昵称：",
    key: "nick_name",
    // formatter: (infoObj) => {
    //   return 123;
    // },
  },
  {
    attrLabel: "ID：",
    key: "wcu_id",
  },
  {
    attrLabel: "注册时间：",
    key: "register_time",
  },
  {
    attrLabel: "实名认证：",
    key: "identity_info",
    formatter: (infoObj) => {
      return infoObj.status;
    },
  },
  {
    attrLabel: "魔方教室：",
    key: "classroom",
  },
  {
    attrLabel: "战队：",
    key: "squad_name",
  },
  {
    attrLabel: "手机号：",
    key: "phone",
  },
  {
    attrLabel: "地区：",
    key: "location",
  },
];
const user_detail_prefix_info_arr_part3: UserDetailPrefixInfoType[] = [
  {
    attrLabel: "在线总时间：",
    key: "online_time_count",
  },
  {
    attrLabel: "下载渠道：",
    key: "download_channel",
  },
  {
    attrLabel: "登录类型：",
    key: "login_method",
  },

  {
    attrLabel: "登录设备系统：",
    key: "device_agent",
    formatter: (typeId) => {
      switch (typeId) {
        case 3:
          return "pc";
        case 1:
          return "安卓设备";
        case 2:
          return "ios设备";
        default:
          return "";
      }
    },
  },
  {
    attrLabel: "登录设备型号：",
    key: "device_type",
  },
  {
    attrLabel: "CPU型号：",
    key: "cpu_model",
  },
  {
    attrLabel: "绑定智能魔方型号：",
    key: "binded_rubik_cube_model",
  },
  {
    attrLabel: "物理地址（mac）：",
    key: "mac_address",
  },
  {
    attrLabel: "设备尺寸：",
    key: "devicePixelRatio",
  },
];

const user_detail_prefix_info_arr_part4: UserDetailPrefixInfoType[] = [
  {
    attrLabel: "最后登录",
    key: "last_login_time",
    formatter: (content) => {
      return "";
      // return dayjs.unix(+content).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    attrLabel: "登出时间：",
    key: "last_logout_time",
    formatter: (content) => {
      return "";
      // return dayjs.unix(+content).format("YYYY-MM-DD HH:mm:ss");
    },
  },
];
const user_detail_prefix_info_arr_part5: UserDetailPrefixInfoType[] = [
  {
    attrLabel: "绑定时间：",
    key: "binding_time",
  },
  {
    attrLabel: "解绑时间：",
    key: "unbinding_time",
  },
];
</script>

<template>
  <hr />
  <!-- <pre>{{ mockMenuData }}</pre> -->
  <div class="w-300px">
    <VMenuBar
      v-bind="{
        menuData: [mockMenuData],
        menuItemClass: 'bg-red h-42px',
      }"
    ></VMenuBar>
  </div>
  <hr />

  <DefineUserDetailPart1>
    <dl class="userDetailPart1">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>11232222</div>
      <div>1</div>
      <div>1</div>
    </dl>
  </DefineUserDetailPart1>
  <DefineUserDetailPart2>
    <dl class="userDetailPart2">
      <div>2</div>
      <div>2</div>
    </dl>
  </DefineUserDetailPart2>
  <DefineUserDetailPart3>
    <dl class="userDetailPart3">
      <section class="col-span-3 grid grid-cols-subgrid gap-5">
        <div class="flex gap-2">
          <dt class="bg-red">label</dt>
          <dd class="bg-blue">123123</dd>
        </div>
        <div class="flex gap-2">
          <dt class="bg-red">label</dt>
          <dd class="bg-blue m-0">34567890</dd>
        </div>
        <div>123123456789789456</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <!-- <div>3</div> -->
      </section>
      <section
        class="bg-gray grid gap-5 2xl:(col-span-1 grid-cols-[auto_auto]) xl:(col-span-3 )"
      >
        <div class="w-500px bg-green col-span-full">123</div>
        <div class="col-span-full">123</div>
        <div class="xl:col-span-1">321</div>
        <div class="xl:col-span-1">321</div>
      </section>
    </dl>
  </DefineUserDetailPart3>
  <div class="userDetailPartContainer">
    <ReuseUserDetailPart1></ReuseUserDetailPart1>
    <ReuseUserDetailPart2></ReuseUserDetailPart2>
    <ReuseUserDetailPart3></ReuseUserDetailPart3>
  </div>
</template>

<style scoped lang="css">
.userDetailPartContainer {
  --uno: w-600px;
  --uno: text-white text-25px;
  --uno: divide-y divide-red;
  /* prettier-ignore */
  --uno: grid grid-rows-[repeat(3,min-content)] xl:grid-cols-[repeat(3,auto)] 2xl:grid-cols-[auto_auto_auto_auto];
  /* --uno: grid grid-rows-[min-content_min-content_min-content] xl:grid-cols-[auto_auto_auto] 2xl:grid-cols-[auto_auto_auto_auto]; */
  --uno: gap-5;
  /* --uno: bg-yellow; */

  & > dl > section > div {
    /* prettier-ignore */
    --uno: odd:bg-gray even:bg-orange;

    dd {
      --uno: m-0;
    }
  }

  & > dl > div {
    /* prettier-ignore */
    --uno: odd:bg-gray even:bg-orange;
  }
}
.userDetailPart1 {
  /* prettier-ignore */
  --uno: h-200px;
  /* --uno: bg-red; */
  --uno: col-span-full;
  --uno: grid grid-cols-subgrid gap-y-5;
  /* --uno: pt-4 pb-7 gap-5 text-16px text-white; */
}
.userDetailPart2 {
  /* prettier-ignore */
  --uno: h-100px;
  /* --uno: bg-blue; */
  --uno: col-span-full;
  --uno: grid grid-cols-subgrid gap-y-5;
}
.userDetailPart3 {
  /* prettier-ignore */
  --uno: h-300px;
  /* --uno: bg-green; */
  --uno: col-span-full;
  --uno: grid grid-cols-subgrid gap-y-5;
}
</style>

export {
  UserDetailPart1Prefix,
  UserDetailPart2Prefix,
  UserDetailPart3_subPart1Prefix,
  UserDetailPart3_subPart2Prefix,
};

export type { KeyValueLikeItemPrefixType };

type KeyValueLikeItemPrefixType = {
  label: string;
  key: string;
  formatter?: string;
  ItemClass?: string;
};

const UserDetailPart1Prefix: KeyValueLikeItemPrefixType[] = [
  {
    label: "昵称:",
    key: "nick_name",
  },
  {
    label: "ID:",
    key: "user_id",
  },
  {
    label: "注册时间:",
    key: "register_time",
  },
  {
    label: "实名认证:",
    key: "identity_info",
  },
  {
    label: "魔方教室:",
    key: "classroom",
  },
  {
    label: "战队:",
    key: "squad_name",
  },
  {
    label: "手机号:",
    key: "phone",
  },
  {
    label: "地区:",
    key: "location",
  },
];
const UserDetailPart2Prefix: KeyValueLikeItemPrefixType[] = [
  {
    label: "积分:",
    key: "points_count",
  },
  {
    label: "道具卷:",
    key: "voucher_count",
  },
];
const UserDetailPart3_subPart1Prefix: KeyValueLikeItemPrefixType[] = [
  {
    label: "在线总时间:",
    key: "online_time_count",
  },
  {
    label: "下载渠道:",
    key: "download_channel",
  },
  {
    label: "登录类型:",
    key: "login_method",
  },
  {
    label: "登录设备系统:",
    key: "device_OS",
  },
  {
    label: "登录设备型号:",
    key: "device_model",
  },
  {
    label: "CPU 型号:",
    key: "cpu_model",
  },
  {
    label: "绑定智能魔方型号:",
    key: "binded_rubikCube_model",
  },
  {
    label: "物理地址(mac):",
    key: "mac_address",
    ItemClass: "xl:col-span-2",
  },
];
const UserDetailPart3_subPart2Prefix: KeyValueLikeItemPrefixType[] = [
  {
    label: "设备屏幕尺寸:",
    key: "deviceScreenSize",
    ItemClass: "col-span-full",
  },
  {
    label: "最后登录/登出时间:",
    key: "log_in_out_time",
    ItemClass: "col-span-full",
  },
  {
    label: "绑定时间:",
    key: "binding_time",
    ItemClass: "xl:col-span-1",
  },
  {
    label: "解绑时间:",
    key: "unbinding_time",
    ItemClass: "xl:col-span-1",
  },
];

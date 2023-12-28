// ----------------------------------------------------------------
/* tournament constants */
export const t_groups_options = ["U8", "U12", "U18", "公开组", "女子组"];

export const t_roundFormat_options = [
  {
    round_format_id: 3,
    label: "五次去头去尾取平均",
  },
  {
    round_format_id: 4,
    label: "三次取平均",
  },
  {
    round_format_id: 2,
    label: "三次取最快",
  },
  {
    round_format_id: 5,
    label: "两次取最快",
  },
  {
    round_format_id: 1,
    label: "单次",
  },
];

export const t_type_options = [
  {
    type_id: 1,
    label: "个人赛",
  },
  {
    type_id: 2,
    label: "团体赛",
  },
  {
    type_id: 3,
    label: "综合赛",
  },
];

export const t_mode_options = [
  {
    mode_id: 1,
    label: "线下赛",
  },
  {
    mode_id: 2,
    label: "线上赛",
  },
];
//----------------------------------------------------------------
//----------------------------------------------------------------

export const t_roundsName_obj_standards = {
  1: ["决赛"],
  2: ["初赛", "决赛"],
  3: ["初赛", "复赛", "决赛"],
  4: ["初赛", "复赛", "半决赛", "决赛"],
  5: ["初赛", "复赛", "四分之一决赛", "半决赛", "决赛"],
};

export const t_tournamentState_constants = [
  {
    id: 1,
    label: "报名未开始",
    bg_color: "bg-#F19EC2",
  },
  {
    id: 2,
    label: "报名中",
    bg_color: "bg-#88ABDA",
  },
  {
    id: 3,
    label: "报名已结束 比赛未开始",
    bg_color: "bg-#89C997",
  },
  {
    id: 4,
    label: "比赛中",
    bg_color: "bg-#F29B76",
  },
  {
    id: 5,
    label: "比赛已结束 未公示",
    bg_color: "bg-#8F82BC",
  },
  {
    id: 6,
    label: "比赛已结束 公示中",
    bg_color: "bg-#535353",
  },
];

export const t_projectInfos_constants: {
  project_id: number;
  project_name: string;
  iconMeta: string;
}[] = [
  {
    project_id: 9,
    project_name: "智能三阶",
    iconMeta: "i-custom-t_projects:ai-third-order",
  },
  {
    project_id: 1,
    project_name: "三阶",
    iconMeta: "i-custom-t_projects:third-order",
  },
  {
    project_id: 3,
    project_name: "二阶",
    iconMeta: "i-custom-t_projects:second-order",
  },
  {
    project_id: 5,
    project_name: "四阶",
    iconMeta: "i-custom-t_projects:fourth-order",
  },
  {
    project_id: 10,
    project_name: "五阶",
    iconMeta: "i-custom-t_projects:fifth-order",
  },
  {
    project_id: 11,
    project_name: "六阶",
    iconMeta: "i-custom-t_projects:sixth-order",
  },
  {
    project_id: 12,
    project_name: "七阶",
    iconMeta: "i-custom-t_projects:seventh-order",
  },
  {
    project_id: 8,
    project_name: "三盲",
    iconMeta: "i-custom-t_projects:blind-third-order",
  },
  {
    project_id: 18,
    project_name: "最少步",
    iconMeta: "i-custom-t_projects:minimum-steps",
  },
  {
    project_id: 7,
    project_name: "单手",
    iconMeta: "i-custom-t_projects:one-hand-twisted",
  },
  {
    project_id: 19,
    project_name: "魔表",
    iconMeta: "i-custom-t_projects:magic-watch",
  },
  {
    project_id: 14,
    project_name: "五魔方",
    iconMeta: "i-custom-t_projects:megaminx",
  },
  {
    project_id: 2,
    project_name: "金字塔",
    iconMeta: "i-custom-t_projects:pyramid",
  },
  {
    project_id: 4,
    project_name: "斜转",
    iconMeta: "i-custom-t_projects:oblique-rotation",
  },
  {
    project_id: 13,
    project_name: "SQ1",
    iconMeta: "i-custom-t_projects:sq1",
  },
  {
    project_id: 15,
    project_name: "四盲",
    iconMeta: "i-custom-t_projects:blind-fourth-order",
  },
  {
    project_id: 16,
    project_name: "五盲",
    iconMeta: "i-custom-t_projects:blind-fifth-order",
  },
  {
    project_id: 17,
    project_name: "多盲",
    iconMeta: "i-custom-t_projects:blind-multiple",
  },
];

export const t_detail_attrs_obj_withSequence_constants = {
  organizer: {
    iconMeta: "i-custom-t_detail:organizer",
    attrLabel: "主办方",
  },
  apply_weburl: {
    iconMeta: "i-custom-t_detail:apply-weburl",
    attrLabel: "报名链接",
  },
  location: {
    iconMeta: "i-custom-t_detail:location",
    attrLabel: "地点",
  },
  mode: {
    iconMeta: "i-custom-t_detail:mode",
    attrLabel: "比赛模式",
  },
  groups: {
    iconMeta: "i-custom-t_detail:groups",
    // attrLabel: "组别",
    attrLabel: "参赛组别",
  },
  apply_condition: {
    iconMeta: "i-custom-t_detail:apply-conditions",
    attrLabel: "报名条件",
  },
  organizer_weburl: {
    iconMeta: "i-custom-t_detail:weburl",
    attrLabel: "主办方网站",
  },
  apply_time_range: {
    iconMeta: "i-custom-t_detail:apply-time-range",
    attrLabel: "报名截止日期",
  },
  time_range: {
    iconMeta: "i-custom-t_detail:time-range",
    attrLabel: "比赛时间",
  },
  type: {
    iconMeta: "i-custom-t_detail:type",
    attrLabel: "比赛类型",
  },
  projects: {
    iconMeta: "i-custom-t_detail:projects",
    attrLabel: "比赛项目",
  },
  apply_quota: {
    iconMeta: "i-custom-t_detail:apply-quota",
    attrLabel: "报名名额",
  },
};

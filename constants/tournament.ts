// ----------------------------------------------------------------
/* tournament constants */
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
//----------------------------------------------------------------
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
//----------------------------------------------------------------
export const t_projectInfos_constants: {
  project_id: number;
  project_name: string;
  iconMeta: string;
}[] = [
  {
    project_id: 9,
    project_name: "智能三阶",
    iconMeta: "i-custom-svg:ai-third-order",
  },
  {
    project_id: 1,
    project_name: "三阶",
    iconMeta: "i-custom-svg:third-order",
  },
  {
    project_id: 3,
    project_name: "二阶",
    iconMeta: "i-custom-svg:second-order",
  },
  {
    project_id: 5,
    project_name: "四阶",
    iconMeta: "i-custom-svg:fourth-order",
  },
  {
    project_id: 10,
    project_name: "五阶",
    iconMeta: "i-custom-svg:fifth-order",
  },
  {
    project_id: 11,
    project_name: "六阶",
    iconMeta: "i-custom-svg:sixth-order",
  },
  {
    project_id: 12,
    project_name: "七阶",
    iconMeta: "i-custom-svg:seventh-order",
  },
  {
    project_id: 8,
    project_name: "三盲",
    iconMeta: "i-custom-svg:blind-third-order",
  },
  {
    project_id: 18,
    project_name: "最少步",
    iconMeta: "i-custom-svg:minimum-steps",
  },
  {
    project_id: 7,
    project_name: "单手",
    iconMeta: "i-custom-svg:one-hand-twisted",
  },
  {
    project_id: 19,
    project_name: "魔表",
    iconMeta: "i-custom-svg:magic-watch",
  },
  {
    project_id: 14,
    project_name: "五魔方",
    iconMeta: "i-custom-svg:megaminx",
  },
  {
    project_id: 2,
    project_name: "金字塔",
    iconMeta: "i-custom-svg:pyramid",
  },
  {
    project_id: 4,
    project_name: "斜转",
    iconMeta: "i-custom-svg:oblique-rotation",
  },
  {
    project_id: 13,
    project_name: "SQ1",
    iconMeta: "i-custom-svg:sq1",
  },
  {
    project_id: 15,
    project_name: "四盲",
    iconMeta: "i-custom-svg:blind-fourth-order",
  },
  {
    project_id: 16,
    project_name: "五盲",
    iconMeta: "i-custom-svg:blind-fifth-order",
  },
  {
    project_id: 17,
    project_name: "多盲",
    iconMeta: "i-custom-svg:blind-multiple",
  },
];

export { overview, tournament, projectStyles, unocssRelated, projectMenuItems };

import * as overview from "./overview";
import * as tournament from "./tournament";
import * as projectStyles from "./projectStyles";

/* Project needed UnoCSS SafeList export. */

import { unocss_theme_colors, unocss_theme_constants } from "./projectStyles";
import { JSONPath } from "jsonpath-plus";
import {
  t_projectInfos_constants,
  t_tournamentState_constants,
  t_detail_attrs_obj_withSequence_constants,
} from "./tournament";
import { overview_gridItemInfos_constants } from "./overview";
import { quick_unocss_constants } from "./quick";

const needed_unocss_constants = [
  ...t_projectInfos_constants.map((item) => item.iconMeta),
  ...t_tournamentState_constants.map((item) => item.bg_color),
  ...overview_gridItemInfos_constants.map((item) => item.iconMeta),
  ...JSONPath({
    json: t_detail_attrs_obj_withSequence_constants,
    path: "$..iconMeta",
  }),
  ...quick_unocss_constants,
];

import type { UserShortcuts } from "unocss";

const unocss_shortcuts: UserShortcuts<any> = [
  [/^prb-(.*)$/, ([, c]) => `pr-${c} pb-${c}`],
  [/^plt-(.*)$/, ([, c]) => `pl-${c} pt-${c}`],
];

const unocssRelated = {
  unocss_theme_colors,
  unocss_theme_constants,
  needed_unocss_constants,
  unocss_shortcuts,
};

const projectMenuItems = {
  overview: {
    iconMeta: "i-custom-aside_menu:overview",
  },
  marketplace: {
    iconMeta: "i-custom-aside_menu:marketplace",
  },
  students: {
    iconMeta: "i-custom-aside_menu:students",
  },
  teams: {
    iconMeta: "i-custom-aside_menu:teams",
  },
  "user-data": {
    iconMeta: "i-custom-aside_menu:user-data",
  },
};

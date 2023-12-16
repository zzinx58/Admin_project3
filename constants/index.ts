import * as overview from "./overview";
import * as tournament from "./tournament";
import * as projectStyles from "./projectStyles";
export { overview, tournament, projectStyles };

/* Project needed UnoCSS SafeList export. */
import {
  t_projectInfos_constants,
  t_tournamentState_constants,
  t_detail_attrs_obj_withSequence_constants,
} from "./tournament";
import { overview_gridItemInfos_constants } from "./overview";
import { JSONPath } from "jsonpath-plus";

export const needed_unocss_constants = [
  ...t_projectInfos_constants.map((item) => item.iconMeta),
  ...t_tournamentState_constants.map((item) => item.bg_color),
  ...overview_gridItemInfos_constants.map((item) => item.iconMeta),
  ...JSONPath({
    json: t_detail_attrs_obj_withSequence_constants,
    path: "$..iconMeta",
  }),
];

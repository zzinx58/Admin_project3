export {
  overview,
  tournament,
  projectStyles,
  unocssRelated,
  projectMenuItems,
  userDetail,
};

import type { KeyValueLikeItemPrefixType } from "./userDetail";

export type { KeyValueLikeItemPrefixType };

import * as overview from "./overview";
import * as tournament from "./tournament";
import * as projectStyles from "./projectStyles";
import * as userDetail from "./userDetail";
import { unocssRelated as unocssRelated_temp } from "./unoRelated";

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

const { needed_unocss_constants } = unocssRelated_temp;
const unocssRelated = {
  ...unocssRelated_temp,
  needed_unocss_constants: [
    ...needed_unocss_constants,
    ...Object.values(projectMenuItems).map((item) => item.iconMeta),
  ],
};

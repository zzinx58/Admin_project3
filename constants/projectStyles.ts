/* UnoCSS needed safeList. */
// ----------------------------------------------------------------
/* background-colors */
const bg_dataTable = {
  base: {
    header: "#70708C",
    divider: "#EDF1FE",
    hintText: "#707070",
  },
  state: {
    positive: "#29DEA7",
    negative: "#BBBBBB",
  },
};

const bg_project_main = {
  base: {
    outside: "#F1F2FD",
    content: "#F7F8FE",
  },
  btn_primary: {
    positive: "#FF8F6B",
    negative: "#70708C",
  },
};

export const unocss_theme_colors = {
  dataTable: bg_dataTable,
  main: bg_project_main,
};

export const unocss_theme_constants = {
  headerHeight: "100px",
  footerHeight: "68px",
};

import type { GlobalThemeOverrides } from "naive-ui";
export const naiveUI_theme_styles: GlobalThemeOverrides = {
  InternalSelection: {
    borderRadius: "10px",
  },
  InternalSelectMenu: {
    color: "#8989A2",
    optionColorActive: "#E7E7EC",
    optionTextColorActive: "#292968",
    optionTextColor: "white",
    optionColorPending: bg_project_main.btn_primary.positive,
    optionTextColorPressed: "white",
  },
  Collapse: {},
  DataTable: {
    thTextColor: "white",
    tdColor: bg_project_main.base.content,
    tdColorStriped: bg_dataTable.base.divider,
    tdColorHover: "none",
    // borderRadius: "10px",
    // thColor: '#70708C',
    // thFontWeight: '800',
  },
  Pagination: {
    itemColorActive: bg_project_main.btn_primary.positive,
    itemTextColor: bg_project_main.btn_primary.positive,
    itemColorActiveHover: bg_project_main.btn_primary.positive,
    itemTextColorActive: "white",
    itemBorder: "none",
    itemBorderHover: "none",
    itemBorderActive: "none",
  },
  common: {
    primaryColor: bg_project_main.btn_primary.positive,
    primaryColorHover: bg_project_main.btn_primary.positive,
    primaryColorPressed: bg_project_main.btn_primary.positive,
  },
  Input: {},
  Button: {},
  Select: {},
  CollapseTransition: {},
};

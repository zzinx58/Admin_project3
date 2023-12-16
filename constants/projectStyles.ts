/* UnoCSS needed safeList. */
// ----------------------------------------------------------------
/* background-colors */
const bg_dataTable = {
  base: {
    header: "#70708C",
    divider: "#EDF1FE",
  },
  state: {
    positive: "#29DEA7",
    negative: "#BBBBBB",
  },
};

const bg_project_main = {
  base: {
    header: "#F1F2FD",
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

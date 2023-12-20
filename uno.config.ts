import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
} from "unocss";
import { stringToColor, compareColors } from "@iconify/utils/lib/colors";
import {
  importDirectory,
  cleanupSVG,
  parseColors,
  runSVGO,
  deOptimisePaths,
} from "@iconify/tools";
import type { IconSet } from "@iconify/tools";
import type { IconifyJSON } from "@iconify/types";
import type { CustomIconLoader } from "@iconify/utils/lib/loader/types";
import { unocssRelated } from "./constants";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      provider: "google", //default
    }),
    presetIcons({
      autoInstall: false,
      collections: {
        "custom-base": () =>
          loadCustomIconSet_IconifyJSON("./assets/svgs/base"),
        "custom-overview": () =>
          loadCustomIconSet_IconifyJSON("./assets/svgs/overview"),
        "custom-t_detail": () =>
          loadCustomIconSet_IconifyJSON("./assets/svgs/t_detail"),
        "custom-t_projects": () =>
          loadCustomIconSet_IconifyJSON("./assets/svgs/t_projects"),
        "custom-quick": () =>
          loadCustomIconSet_IconifyJSON("./assets/svgs/quick"),
        // "custom-overview": loadCustomIconSet_CustomIconLoader(
        //   "./assets/svgs/overview"
        // ),
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      ...unocssRelated.unocss_theme_colors,
    },
    ...unocssRelated.unocss_theme_constants,
  },
  safelist: [...unocssRelated.needed_unocss_constants],
});

async function loadCustomIconSet_IconifyJSON(
  svgsFolderPath: string
): Promise<IconifyJSON> {
  const iconSet = await importDirectory(svgsFolderPath, {
    prefix: "svg",
  });
  await iconSet.forEach(async (name) => {
    const svg = await cleanup_parseColor_SVG(iconSet, name);
    runSVGO(svg);
    await deOptimisePaths(svg);
    iconSet.fromSVG(name, svg);
  });
  return iconSet.export();
}

const cleanup_parseColor_SVG = async (iconSet: IconSet, name: string) => {
  const svg = iconSet.toSVG(name)!;
  cleanupSVG(svg);
  const blackColor = stringToColor("black")!;
  await parseColors(svg, {
    defaultColor: "currentColor",
    callback: (attr, colorString, parsedColor, tagName, item) => {
      if (parsedColor && compareColors(parsedColor, blackColor))
        return "currentColor";
      switch (parsedColor?.type) {
        case "none":
        case "current":
          return parsedColor;
      }
      return "currentColor";
    },
  });
  return svg;
};

function loadCustomIconSet_CustomIconLoader(
  svgsFolderPath: string
): CustomIconLoader {
  const promise = new Promise<IconSet>(async (resolve, reject) => {
    const iconSet = await importDirectory(svgsFolderPath, {});
    await iconSet
      .forEach(async (name) => {
        const svg = await cleanup_parseColor_SVG(iconSet, name);
        runSVGO(svg);
        await deOptimisePaths(svg);
        iconSet.fromSVG(name, svg);
      })
      .then(() => {
        resolve(iconSet);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return async (name: string) => {
    const iconSet = await promise;
    return iconSet.toSVG(name)?.toMinifiedString();
  };
}

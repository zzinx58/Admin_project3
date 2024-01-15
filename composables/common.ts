export const navigateToRedirectFrom = (timeout: number) => {
  return () => {
    const waitReady = useTimeout(timeout);
    watchOnce(waitReady, () =>
      navigateTo(`${(route().query.callback ??= "/")}`)
    );
  };
};

/* UseNaiveUI Setup Scope */
export const useNaiveMessage = useMessage;
export const useNaiveNotification = useNotification;
export const useNaiveDialog = useDialog;
/* UseNaiveUI NonSetup Scope */
import { createDiscreteApi } from "naive-ui";
export const useNaiveDiscrete = () =>
  createDiscreteApi(["message", "notification", "dialog", "loadingBar"], {});

export const adminStore = useAdminStore;
export const tournamentStore = useTournamentStore;

export const route = useRoute;
export const router = useRouter;

export const reAuthLogin = (currentPath: string, timeout: number) => {
  useNaiveMessage().info("登录信息过期，请重新登录");
  adminStore().$reset();
  return () => {
    const waitReady = useTimeout(timeout);
    watchOnce(waitReady, () => navigateTo(`/Login?callback=${currentPath}`));
  };
};
export const judgeError_for_ReAuthNeed = (
  fetchErrorDataObj: Record<string, any>,
  timeout: number
) => {
  if (fetchErrorDataObj.statusCode === 401) {
    const LoginNavigateCallback = reAuthLogin(route().fullPath, timeout);
    LoginNavigateCallback();
  }
};

/* Project Search Info-Meterials. */
import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
const genProjectNeededMenuItem = (
  routeItem: RouteRecordNormalized
): MenuItemProps & { path: string; itemType: "page"; name: string } => ({
  name: routeItem.name as string,
  itemId: routeItem.name as string,
  label: routeItem.meta.title as string,
  path: routeItem.path,
  itemType: "page",
  iconMeta: Object.entries(projectMenuItems).find(([key, value]) => {
    return key === routeItem.name;
  })?.[1].iconMeta,
  childrens: routeItem.children.map((item) =>
    genProjectNeededMenuItem(item as RouteRecordNormalized)
  ),
});

const projectMenuItems = useProjectConstants().projectMenuItems;
import type { MenuItemProps } from "../components/V_MenuBar.vue";

// export const useProjectRoutesInfo = () =>
//   router()
//     .getRoutes()
//     .map((item) => ({
//       name: item.name as string,
//       title: item.meta.title as string,
//       path: item.path,
//       itemType: "page",
//       iconMeta: Object.entries(projectMenuItems).find(([key, value]) => {
//         return key === item.name;
//       })?.[1].iconMeta,
//       childrens: item.children as Array<any>,
//     }));
export const useProjectRoutesInfo = () =>
  router()
    .getRoutes()
    .map((item) => genProjectNeededMenuItem(item));

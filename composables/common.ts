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
import * as constants from "@/constants";
export const useProjectConstants = () => ({
  ...constants,
  projectSearchInfoMeterials: () => [
    ...router()
      .getRoutes()
      .map((item) => ({
        name: item.name,
        title: item.meta.title,
        path: item.path,
        itemType: "page",
      })),
  ],
});

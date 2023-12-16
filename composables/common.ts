export const navigateToRedirectFrom = (timeout: number) => {
  return () => {
    const waitReady = useTimeout(timeout);
    watchOnce(waitReady, () =>
      navigateTo(`${(route().query.callback ??= "/")}`)
    );
  };
};

export const useNaiveMessage = useMessage;
export const useNaiveNotification = useNotification;
export const useNaiveDialog = useDialog;

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

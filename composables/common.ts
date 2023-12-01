export const navigateToRedirectFrom = (routeInstance: typeof useRoute) => {
  navigateTo(`${(routeInstance().query.callback ??= "/")}`);
};

export const useNaiveMessage = useMessage;

export const adminStore = useAdminStore;

export const reAuthLogin = (currentPath: string) => {
  useNaiveMessage().info("登录信息过期，请重新登录");
  adminStore().$reset();
  navigateTo(`/Login?callback=${currentPath}`);
};

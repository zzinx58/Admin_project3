export const userStore = () => useUserStore();
export const useNaiveMessage = () => useMessage();
export const navigateToRedirectFrom = (routeInstance: typeof useRoute) => {
  navigateTo(`${(routeInstance().query.callback ??= "/")}`);
};

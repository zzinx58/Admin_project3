export default defineNuxtPlugin((nuxtApp) => {
  useNuxtApp().vueApp.config.warnHandler = () => null;
});

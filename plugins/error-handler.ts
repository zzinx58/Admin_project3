export default defineNuxtPlugin((nuxtApp) => {
  /* 
    Could not capture fatal:true error.
    Able to capture fatal:false error
    Var => info: where error happened.
  */
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log("errorHandler: => :", error);
  };
  /* 
    Captured fatal:true | false error.
    Fatal error will block the page, showing the error page if it exist.
  */
  nuxtApp.hook("vue:error", (error, instance, info) => {
    console.log("hook: => vue:error", error);
  });

  nuxtApp.hook("app:error", (error) => {
    console.log("hook: => app:error", error);
  });
});

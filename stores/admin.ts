type TypeUtil_RequireOneOrBoth<T, Keys extends keyof T = keyof T> = {
  // !!
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
  // [K in Keys]-?: Required<Pick<T, K>>;
}[Keys];

type User_LoginFormDataType = {
  username: string;
  password: string;
};
type ErrorMessageType = TypeUtil_RequireOneOrBoth<{
  message: string;
  // Since we won't use it, in vue part.
  // statusMessage: string;
}>;

type User_LoginResponseType = {
  statusCode?: number;
  data?: any;
  ok: boolean;
} & ErrorMessageType;

export const useUserStore = defineStore("Admin", {
  persist: true,

  state: (): {
    [key: string]: any;
    isLogin: boolean;
    token: string;
    adminInfo: Partial<{
      [key: string]: any;
      username: string;
      user_id: string;
      login_type: string;
      roles: string | number[];
    }>;
  } => {
    return {
      isLogin: false,
      token: "",
      adminInfo: {},
    };
  },

  actions: {
    async login(
      loginFormData: User_LoginFormDataType
    ): Promise<User_LoginResponseType> {
      // [error, status] will never be used for BE logic.
      const { data, error, refresh, pending, status } = await useFetch(
        "/api/admin/login",
        {
          method: "POST",
          body: loginFormData,
        }
      );
      console.log(data.value);
      if (data.value && !data.value?.error) {
        this.token = data.value.data.token;
        return {
          ok: true,
          statusCode: data.value.code,
          message: "登录成功，正在进行页面跳转...",
          data: data.value,
        };
      } else {
        return {
          ok: false,
          statusCode: data.value?.code,
          message: "登录失败，请检查账户名和密码",
          data: data.value,
        };
      }
    },

    async logout() {
      this.$reset();
    },

    reAuthLogin(currentPath: string) {
      useNaiveMessage().info("登录信息过期，请重新登录");
      userStore().$reset();
      navigateTo(`/Login?callback=${currentPath}`);
    },
  },
});

/* 
  ```typescript
  type TypeUtil_RequireOne<T, Keys extends keyof T = keyof T> = {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
  }[Keys];
  ```
  - `Keys extends keyof T = keyof T`, the `keyof T = keyof T` part means if Keys Type is not defined,
  then use the keyof T as the Type of the `Keys`.
  - `type RequiredOne<T, Keys extends keyof T = keyof T>`, 
  the `[Keys]` part is a way of using Index Access Type.
  It allows you to use an index type from one type to obtain the property type of another type.
  It's function in util is to iterate on each key in the Keys type, in order to process the corresponding properties.
  - `{[K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;}`,
  `[K in Keys]` part iterates each key in the Keys.
  - `-?` symbol means every property here is required, also means every properties in object could not be undefined.
  - `Pick<T,K>` part means take K correspond type from T object.
  - `Omit<T,K>` part means omit K type from T object.
  - `Partial<T>` part means set the type of attrs in T object to optional.
*/
// type TypeUtil_RequireOneOrBoth<T, Keys extends keyof T = keyof T> = {
// type TypeUtil_RequireOneOrBoth<T, Keys extends keyof T = keyof T> = {
// [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
// [K in Keys]-?: Required<Pick<T, K> & Omit<T, K>>;
//   [K in Keys]-?: Required<Pick<T, K>>;
// }[Keys];
// type test = TypeUtil_RequireOneOrBoth<{
//   message: string;
//   statusMessage: string;
// }>;
// const testa: test = {
//   message: "",
//   statusMessage: "",
// };

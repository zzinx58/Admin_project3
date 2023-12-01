export const api_map = {
  baseurl: {
    stagging: "http://wcucube.fun",
  },
  users: {
    /* 
    GET
    List QueryParams available.
    Token needed.
    */
    getUserList: "/admin-api/account/user/list",
  },
  admin: {
    /* 
    POST
    */
    login: "/admin-api/oauth/login",
    /* 
    POST
    Content-Type: application/x-www-form-urlencoded
    */
    logout: "/admin-api/oauth/logout",
    /* 
    GET
    Token needed.
    */
    getAdminInfo: "/admin-api/account/current_admin",
    /* 
    POST
    Token needed.
    Conetnt-Type: application/json
    */
    createAdmin: "/admin-api/account/admin",
    /* 
    GET
    List QueryParams available.
    Token needed.
    */
    getAdminList: "/admin-api/account/admin/list",
  },
};

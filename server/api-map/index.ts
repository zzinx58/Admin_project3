export const api_map = {
  baseurl: {
    // It's staging, not stagging.
    // stagging: "http://wcucube.fun",
    staging: "http://wcucube.yicloud.vip",
  },
  user: {
    /* 
    GET
    List QueryParams available.
    Token needed.
    */
    getUserList: "/admin-api/user/list",
    filterUserList: "/admin-api/user/search",
    getUserDetail: "/admin-api/user/",
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

// ----------------------------------------------------------------
// Common response types Section.
// ----------------------------------------------------------------

type Response_Raw_Error_CommonType = {
  error?: string;
};
type List_QueryParams_CommonType = {
  page: number;
  size: number;
};
type Admin_Type_CommonType = "super" | "internal" | "external";
type User_Type_CommonType = "admin" | "robot" | "user";

// ----------------------------------------------------------------
// Admin Section.
// ----------------------------------------------------------------

export type API_Payload_POST_Login = {
  username: string;
  password: string;
};
export type API_Response_Raw_POST_Login = {
  code: number;
  data:
    | {
        token: string;
      }
    | undefined;
} & Response_Raw_Error_CommonType;
// ----------------------------------------------------------------
export type API_Response_Raw_POST_Logout = {
  code: number;
  data: {};
} & Response_Raw_Error_CommonType;
// ----------------------------------------------------------------
export type API_Response_Raw_GET_getAdminInfo = {
  code: number;
  data:
    | {
        id: number;
        username: string;
        phone: string | null;
        email: string | null;
        admin_type: Admin_Type_CommonType;
        roles: string[];
        deleted: boolean;
        inserted_at: string;
        updated_at: string;
      }
    | undefined;
} & Response_Raw_Error_CommonType;
// ----------------------------------------------------------------
export type API_Payload_POST_createAdmin = {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  admin_type?: Admin_Type_CommonType;
};
export type API_Response_Raw_POST_createAdmin = {
  code: number;
  data:
    | {
        id: number;
        username: string;
        phone: string;
        email: string;
        admin_type: Admin_Type_CommonType;
        roles: string[];
        deleted: boolean;
        inserted_at: string;
        updated_at: string;
      }
    | undefined;
} & Response_Raw_Error_CommonType;
// ----------------------------------------------------------------
export type API_Response_Raw_POST_getAdminList = {
  code: number;
  data:
    | {
        total: number;
        items: {
          id: number;
          username: string;
          phone: string;
          email: string;
          admin_type: Admin_Type_CommonType;
          roles: string[];
          deleted: boolean;
          inserted_at: string;
          updated_at: string;
        }[];
      }
    | undefined;
} & Response_Raw_Error_CommonType;

// ----------------------------------------------------------------
// Users Section.
// ----------------------------------------------------------------
export type API_Response_Raw_POST_getUserList = {
  code: number;
  data:
    | {
        total: number;
        items: {
          type: User_Type_CommonType;
          level: number; // 用户等级
          signature: string; // 用户签名
          location: {
            city_name: string;
            country_name: string;
            region_name: string;
          };
          uid: number;
          username: string;
          nickname: string;
          deleted: boolean;
          inserted_at: string;
          updated_at: string;
          email: string;
          channel: string; // 下载渠道
          background: string; // 背景图片 url
          phone: string;
          banned: boolean; // 账号是否被禁用
          gender: string;
          flag_id: number; // 旗帜 ID
          recover_effects_id: number; // 复原特效 ID
          enter_effects_id: number; // 进入特效 ID
          avatar_box_id: number; // 头像框 ID
          avatar: string; // 头像 url
        }[];
      }
    | undefined;
} & Response_Raw_Error_CommonType;

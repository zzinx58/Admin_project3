// ----------------------------------------------------------------
// Common response types Section.
// ----------------------------------------------------------------

export type Response_Raw_Error_CommonType = {
  code: number;
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
/* Updated: ID_1, before 2023/12/16 */
/* Updated: ID_2, 2023/12/16 */
export type API_Response_Raw_POST_getUserList = {
  code: number;
  data:
    | {
        total: number;
        items: {
          // type: User_Type_CommonType;
          // level: number; // 用户等级
          // signature: string; // 用户签名
          location: {
            city_name: string;
            country_name: string;
            region_name: string;
          };
          uid: number;
          // username: string;
          nickname: string;
          // deleted: boolean;
          // inserted_at: string;
          // updated_at: string;
          register_at: string;
          online_status: boolean;
          // email: string;
          channel: string; // 下载渠道
          // background: string; // 背景图片 url
          phone: string;
          // banned: boolean; // 账号是否被禁用
          // gender: string;
          // flag_id: number; // 旗帜 ID
          // recover_effects_id: number; // 复原特效 ID
          // enter_effects_id: number; // 进入特效 ID
          // avatar_box_id: number; // 头像框 ID
          // avatar: string; // 头像 url
        }[];
      }
    | undefined;
} & Response_Raw_Error_CommonType;

export type FE_itemDataType_getUserList = {
  user_id: number;
  nickname: string;
  location_city: string;
  register_time: string;
  phone: string;
  online_status: boolean;
  download_channel: string;
};

// ----------------------------------------------------------------
export type API_Response_Raw_GET_getUserDetail = {
  code: number;
  data: {
    binded_equipments: {
      address: string;
      bind_ts: number;
      version: string;
    }[];
    comp_qualifier: {
      cup_num: number;
      drawn_num: number;
      lose_num: number;
      max_cup_num: number;
      max_win_streak: number;
      win_num: number;
      win_streak: number;
    };
    comp_single: {
      finish_num: number;
      used_num: number;
    };
    comp_time_traial: {
      best_ao100: number;
      best_ao12: number;
      best_ao5: number;
      best_duration: number;
      current_ranking: number;
      finish_num: number; // 复原场数
      highest_num: number;
      used_num: number; // 总共场数
    };
    user_info: {
      location: {
        city_name: string;
        country_name: string;
        region_name: string;
      };
      nickname: string;
      phone: string;
      register_datetime: string;
      register_ts: number;
      uid: number;
    };
  };
} & Response_Raw_Error_CommonType;

export type FE_dataType_getUserDetail = {
  userDetailPart: {
    //
    nickname: string;
    user_id: string;
    register_time: number;
    identity_info?: string;
    classroom?: string;
    squad_name?: string;
    phone: string;
    location: string;
    //
    points_count?: number;
    voucher_count?: number;
    //
    online_time_count?: number;
    download_channel?: string;
    login_method?: string;
    device_OS?: string;
    device_model?: string;
    cpu_model?: string;
    binded_rubikCube_model?: string;
    mac_address?: string;
    //
    deviceScreenSize?: string;
    log_in_out_time?: string;
    binding_time?: string;
    unbinding_time?: string;
    //
  };
  userDataPart1: {
    userDataPart1tab1: {
      best_duration: number;
      best_ao5_duration: number;
      best_ao12_duration: number;
      best_ao100_duration: number;
      current_ranking: number;
      highest_ranking: number;
      completions_count_timeTrial: number;
      completion_rate?: number;
    };
    //
    userDataPart1tab2: {
      cup_data: string;
      rank_data?: string;
      win_data: string;
      lose_data: string;
      draw_data: string;
      winning_streak_data: string;
    };
    //
    userDataPart1tab3: {
      participations_count: number;
      completions_count_multiQuickTwist: number;
    };
    userDataPart1tab4?: {};
    userDataPart1tab5?: {};
  };
  userDataPart2: {};
  userDataPart3: {
    userDataPart3tab1?: {};
    userDataPart3tab2?: {};
  };
};
// ----------------------------------------------------------------

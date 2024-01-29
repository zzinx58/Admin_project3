import type {
  API_Response_Raw_GET_getUserDetail,
  FE_dataType_getUserDetail,
} from "@/types/api_map_types";
import { result } from "lodash";
export default defineEventHandler(async (event) => {
  const uid = getQuery(event).uid;
  const { code, error, data } =
    await $fetch<API_Response_Raw_GET_getUserDetail>(
      getProjectAPIPath(`$.user.getUserDetail`) + `/${uid}/details`,
      {
        method: "GET",
        headers: myFuncs.fromPairs([
          getAuthorization_ArrPair_fromH3EventHandlerReq(event),
        ]),
      }
    );
  //
  const { finish_num, used_num } = data.comp_single;
  data.comp_single = {
    finish_num_compSingle: finish_num,
    used_num_compSingle: used_num,
  } as any;
  //

  let resultData: FE_dataType_getUserDetail | undefined;
  // return data;
  // return myFuncs.flattenObject(data);
  if (!error && data) {
    const tempData = myFuncs.flattenObject(data);
    const {
      nickname,
      uid,
      register_ts,
      country_name,
      city_name,
      region_name,
      phone,
      //
      best_ao5,
      best_ao12,
      best_ao100,
      best_duration,
      current_ranking,
      highest_ranking,
      finish_num_compSingle,
      used_num_compSingle,
      //
      cup_num,
      max_cup_num,
      win_streak,
      max_win_streak,
      win_num,
      drawn_num,
      lose_num,
      //
      finish_num,
      used_num,
    } = tempData;

    resultData = {
      userDetailPart: {
        nickname: nickname,
        user_id: uid,
        register_time: register_ts,
        phone: phone,
        location: country_name + region_name + city_name,
      },
      // binded_equipments
      //
      //
      userDataPart1: {
        userDataPart1tab1: {
          best_ao5_duration: best_ao5,
          best_ao12_duration: best_ao12,
          best_ao100_duration: best_ao100,
          best_duration: best_duration,
          current_ranking: current_ranking,
          highest_ranking: highest_ranking,
          completion_rate: used_num !== 0 ? finish_num / used_num : 0,
          completions_count_timeTrial: used_num,
        },
        //
        userDataPart1tab2: {
          cup_data: `${cup_num} / ${max_cup_num}`,
          win_data: win_num,
          lose_data: lose_num,
          winning_streak_data: `${win_streak} / ${max_win_streak}`,
          draw_data: drawn_num,
        },
        userDataPart1tab3: {
          //
          participations_count: finish_num_compSingle,
          completions_count_multiQuickTwist: used_num_compSingle,
        },
      },
      userDataPart2: {},
      userDataPart3: {},
    };
  }
  return { code, resultData, error };
});

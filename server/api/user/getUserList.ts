import type {
  API_Response_Raw_POST_getUserList,
  FE_itemDataType_getUserList,
} from "~/types/api_map_types";

export default defineEventHandler(async (event) => {
  const { code, data, error } = await $fetch<API_Response_Raw_POST_getUserList>(
    getProjectAPIPath("$.user.getUserList"),
    {
      method: "GET",
      headers: myFuncs.fromPairs([
        getAuthorization_ArrPair_fromH3EventHandlerReq(event),
      ]),
      query: getQuery(event),
    }
  );

  let resultData;
  if (!error && data) {
    const { total, items } = data;
    resultData = {
      items_total: total,
      items:
        items.map((item): FE_itemDataType_getUserList => {
          return {
            user_id: item.uid,
            nickname: item.nickname,
            location_city:
              item.location.country_name +
              item.location.region_name +
              item.location.city_name,
            download_channel: item.channel,
            register_time: item.register_at,
            phone: item.phone,
            online_status: item.online_status,
          };
          // Notice Here.
        }) ?? [],
    };
  }

  return { code, resultData, error };
});

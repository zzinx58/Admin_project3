import type { API_Response_Raw_POST_getAdminList } from "~/types/api_map_types";

export default defineEventHandler(async (event) => {
  const { code, data, error } =
    await $fetch<API_Response_Raw_POST_getAdminList>(
      getProjectAPIPath("$.admin.getAdminList"),
      {
        method: "GET",
        headers: myFuncs.fromPairs([
          getAuthorization_ArrPair_fromH3EventHandlerReq(event),
        ]),
        query: getQuery(event),
      }
    );
  return { code, data, error };
});

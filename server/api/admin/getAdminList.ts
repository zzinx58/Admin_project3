import { API_Response_Raw_POST_getAdminList } from "~/types/api_map_types";

export default defineEventHandler(async (event) => {
  const { code, data, error } =
    await $fetch<API_Response_Raw_POST_getAdminList>(
      getProjectAPIPath("$.admin.getAdminList"),
      {
        method: "GET",
        headers: Object.fromEntries([
          getAuthorization_ArrPair_fromH3EventHandlerReq(event),
        ]),
        query: getQuery(event),
        // query: Object.fromEntries(
        //   getQuery_ArrPair_fromH3EventHandlerReq(event)
        // ),
      }
    );
  return { code, data, error };
});

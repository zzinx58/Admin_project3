import { API_Response_Raw_GET_getAdminInfo } from "~/types/api_map_types";

export default defineEventHandler(
  async (event): Promise<API_Response_Raw_GET_getAdminInfo> => {
    //   const apiPath_envSpecific = getProjectAPIPath("$.admin.getAdminInfo");
    const { error, data, code } =
      await $fetch<API_Response_Raw_GET_getAdminInfo>(
        getProjectAPIPath("$.admin.getAdminInfo"),
        {
          method: "GET",
          headers: myFuncs.fromPairs([
            getAuthorization_ArrPair_fromH3EventHandlerReq(event),
          ]),
        }
      );
    return { error, data, code };
  }
);

import type { EventHandler, EventHandlerRequest, H3Event } from "h3";
// export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (
//   handler: EventHandler<T, D>
// ): EventHandler<T, D> =>
//     defineEventHandler<T>(async (event) => {
//       try {
//         return { response }
//       } catch (err) {
//       // Error handling
//         return { err }
//       }
//     })
export const getAuthorization_ArrPair_fromH3EventHandlerReq = (
  event: H3Event<EventHandlerRequest>
) => {
  // Could be refactor for function overload.
  // const authorization = event.node.req.headers.authorization;
  // const authorization = getHeaders(event).authorization;
  const authorization = getHeader(event, "authorization");
  return ["Authorization", authorization];
};
export const getQuery_ArrPair_fromH3EventHandlerReq = (
  event: H3Event<EventHandlerRequest>
) => {
  // Could be refactor for function overload.
  /* 
    getContextParams_fromH3EventHandlerReq
    The below line code not working.
    const reqContextParams = event.context.params;
  */
  const queryObject = getQuery(event);
  // const result = Object.entries(queryObject);
  const result = _.toPairs(queryObject);
  return result;
};
// ----------------------------------------------------------------
import * as JSONPathPlus from "jsonpath-plus";
export const useJSONPath = JSONPathPlus.JSONPath;
// ----------------------------------------------------------------
import useLodash from "lodash";
export const _ = useLodash;
// ----------------------------------------------------------------
import { api_map } from "../api-map/index";
type ProjectEnv_Type = "LOCAL" | "STAGGING" | "PRODUCTION" | undefined;
export const getProjectEnv = (): ProjectEnv_Type => {
  return process.env.PROJECT_ENV as ProjectEnv_Type;
};
export const getProjectBaseUrl = () => {
  switch (getProjectEnv()) {
    case "LOCAL":
      return api_map.baseurl.staging;
    case "STAGGING":
      return api_map.baseurl.staging;
    case "PRODUCTION":
      return api_map.baseurl.staging;
    default:
      return "/undefinedPath";
  }
};
export const getProjectAPIPath = (jsonPathToAPI: string) => {
  return (
    getProjectBaseUrl() +
    useJSONPath({
      json: api_map,
      path: jsonPathToAPI,
    })
  );
};
// ----------------------------------------------------------------
export const myFuncs = {
  fromPairs: _.fromPairs,
};

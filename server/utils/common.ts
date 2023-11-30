import * as JSONPathPlus from "jsonpath-plus";
export const JSONPath = JSONPathPlus.JSONPath;

// import type { EventHandler, EventHandlerRequest } from 'h3'
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

import { api_map } from "../api-map/index";
type ProjectEnv_Type = "LOCAL" | "STAGGING" | "PRODUCTION" | undefined;
export const getProjectEnv = (): ProjectEnv_Type => {
  return process.env.PROJECT_ENV as ProjectEnv_Type;
};
export const getProjectBaseUrl = () => {
  switch (getProjectEnv()) {
    case "LOCAL":
      return api_map.baseurl.stagging;
    case "STAGGING":
      return api_map.baseurl.stagging;
    case "PRODUCTION":
      return api_map.baseurl.stagging;
    default:
      return "/undefinedPath";
  }
};
export const getProjectAPIPath = (jsonPathToAPI: string) => {
  return (
    getProjectBaseUrl() +
    JSONPath({
      json: api_map,
      path: jsonPathToAPI,
    })
  );
};

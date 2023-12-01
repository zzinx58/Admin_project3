import type { API_Response_Raw_POST_Login } from "@/types/api_map_types";
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const apiPath_envSpecific = getProjectAPIPath("$.admin.login");
  const { error, data, code } = await $fetch<API_Response_Raw_POST_Login>(
    apiPath_envSpecific,
    {
      method: "POST",
      body: {
        username,
        password,
      },
    }
  );
  // console.log({ error, data, code });
  return { error, data, code };
});

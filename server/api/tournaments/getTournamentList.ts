export default defineEventHandler(async (event) => {
  type Temp = {
    data: {
      total: number;
      items: any[];
    };
    code: number;
    error: string | undefined;
  };

  const {
    code = 458,
    error = "",
    data = {
      total: 12,
      items: [
        {
          t_id: 123,
          t_name: "teq",
          t_time_range: [
            new Date(Date.now() + 3 * 86400000).toISOString(),
            new Date(Date.now() + 4 * 86400000).toISOString(),
          ],
          t_apply_time_range: [
            new Date(Date.now() - 2 * 86400000).toISOString(),
            new Date(Date.now() + 2 * 86400000).toISOString(),
          ],
          t_status_obj: { abc: 123 },
        },
        {
          t_id: 123,
          t_name: "teq",
          t_time_range: [
            new Date(Date.now() + 3 * 86400000).toISOString(),
            new Date(Date.now() + 3 * 86400000).toISOString(),
          ],
          t_apply_time_range: [
            new Date(Date.now() - 2 * 86400000).toISOString(),
            new Date(Date.now() + 2 * 86400000).toISOString(),
          ],
          t_status_obj: { abc: 123 },
        },
      ],
    },
  } = await $fetch<Temp>(getProjectAPIPath(""), {
    method: "GET",
    headers: myFuncs.fromPairs([
      getAuthorization_ArrPair_fromH3EventHandlerReq(event),
    ]),
    query: getQuery(event),
  });

  let resultData;
  if (!error && data) {
    const { total, items } = data;
    resultData = {
      items_total: total,
      items: items.map((item) => ({
        ...item,
      })),
    };
  }
  return { code, resultData, error };
});

const { t_tournamentState_constants, t_roundsName_obj_standards } =
  useProjectConstants().tournament;
const { isAfter, isBefore, isWithinInterval } = useDateFns();

export const t_stateCalc = (
  t_time_range: [string, string],
  t_apply_time_range: [string, string]
) => {
  const t_time_range_parsedTimedInterval_temp = t_time_range.map(
    useDateFns_FP().parseISO
  ) as [Date, Date];
  const t_apply_time_range_parsedTimeInterval_temp = t_apply_time_range.map(
    useDateFns_FP().parseISO
  ) as [Date, Date];
  const convert2Interval = (time_range: [Date, Date]) => {
    return {
      start: time_range[0],
      end: time_range[1],
    };
  };
  switch (true) {
    case isBefore(new Date(), t_apply_time_range_parsedTimeInterval_temp[0]):
      return t_tournamentState_constants[0];
    case isWithinInterval(
      new Date(),
      convert2Interval(t_apply_time_range_parsedTimeInterval_temp)
    ):
      return t_tournamentState_constants[1];
    case isWithinInterval(
      new Date(),
      convert2Interval([
        t_apply_time_range_parsedTimeInterval_temp[1],
        t_time_range_parsedTimedInterval_temp[0],
      ])
    ):
      return t_tournamentState_constants[2];
    case isWithinInterval(
      new Date(),
      convert2Interval(t_time_range_parsedTimedInterval_temp)
    ):
      return t_tournamentState_constants[3];
    case isAfter(new Date(), t_time_range_parsedTimedInterval_temp[1]):
      return t_tournamentState_constants[4];
  }
};

export const t_roundsNameArrCalc = (roundsTotal: number) => {
  switch (roundsTotal) {
    case 1:
      return t_roundsName_obj_standards["1"];
    case 2:
      return t_roundsName_obj_standards["2"];
    case 3:
      return t_roundsName_obj_standards["3"];
    case 4:
      return t_roundsName_obj_standards["4"];
    case 5:
      return t_roundsName_obj_standards["5"];
    default:
      return ["Invalid rounds total"];
  }
};

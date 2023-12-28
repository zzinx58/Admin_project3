export const useTournamentStore = definePiniaStore("Tournament", () => {
  const t_state = ref<
    Partial<{
      name: string;
      mode: string;
      type: string;
      organizer: string;
      organizer_weburl: string;
      apply_weburl: string;
      apply_quota: number;

      append_message: string | null;
      time_range: [number, number];
      apply_time_range: [number, number];
      award_time_range: [number, number];
      signin_time_range: [number, number];
      lottery_time: {
        id: number;
        time_range?: [number, number];
      }[];
      break_time: { id: number; time_range?: [number, number] }[];
      location: string;
      apply_condition: string;
      display_on_homepage: boolean;
      display_order: number;
      banner: {
        name: string;
        url: string;
        uploadApiUrl: string;
      };
    }> & {
      break_time: { id: number; time_range?: [number, number] }[];
      lottery_time: { id: number; time_range?: [number, number] }[];
      projects_detail: ({
        id: number;
        name: string;
        iconMeta: string;
        groups?: string[];
        rule?: string;
        reduction_limit?: number;
        passline?: number;
      } & {
        rounds: {
          total?: number;
          details: {
            id: number;
            time_range?: [number, number];
            promotion_quota?: number;
            round_format?: number;
          }[];
        };
      })[];
    }
  >({
    projects_detail: [],
    break_time: [
      {
        id: 0,
      },
    ],
    lottery_time: [
      {
        id: 0,
      },
    ],
  });

  const $reset = () => {
    const resolvedObj = {
      ...Object.fromEntries(
        Object.entries(t_state.value).map(([key, value]) => {
          if (typeof value !== "object") {
            return [key, null];
          } else {
            return [key, value];
          }
        })
      ),
      ...{
        projects_detail: [],
        break_time: [
          {
            id: 0,
          },
        ],
        lottery_time: [
          {
            id: 0,
          },
        ],
      },
    };
    t_state.value = resolvedObj as unknown as typeof t_state.value;
  };

  const _projectDetailTemplate = {
    rounds: {
      total: 1,
      details: [{ id: 0 }],
    },
  };

  type projectBaseInfoType = { p_id: number; iconMeta: string; p_name: string };

  const handleProjectSelect = (projectBaseInfo: projectBaseInfoType) => {
    t_state.value.projects_detail.push({
      id: projectBaseInfo.p_id,
      name: projectBaseInfo.p_name,
      iconMeta: projectBaseInfo.iconMeta,
      rounds: myFuncs.cloneDeep(_projectDetailTemplate.rounds),
    });
  };
  const handleProjectRemove = (projectBaseInfo: projectBaseInfoType) => {
    const removedProjectId = projectBaseInfo.p_id;
    const itemIndexToRemove = t_state.value.projects_detail.findIndex(
      (item) => {
        item.id === removedProjectId;
      }
    );
    const removedItem = t_state.value.projects_detail.splice(
      itemIndexToRemove,
      1
    );
    return removedItem;
  };

  const handleRemoveBreakTimeRound = () => {
    t_state.value.break_time?.pop();
  };
  const handleRemoveLotteryTimeRound = () => {
    t_state.value.lottery_time?.pop();
  };
  const _addTimeRoundLogic = (roundsArr: any[]) => {
    const prevRoundsTotal = roundsArr.length;
    roundsArr.push({
      id: prevRoundsTotal,
    });
  };
  const handleAddBreakTimeRound = () => {
    const break_time_arr = t_state.value.break_time;
    break_time_arr && _addTimeRoundLogic(break_time_arr);
  };
  const handleAddLotteryTimeRound = () => {
    const lottery_time_arr = t_state.value.lottery_time;
    lottery_time_arr && _addTimeRoundLogic(lottery_time_arr);
  };

  return {
    t_state,
    $reset,
    test,
    handleProjectSelect,
    handleProjectRemove,
    handleAddBreakTimeRound,
    handleRemoveLotteryTimeRound,
    handleAddLotteryTimeRound,
    handleRemoveBreakTimeRound,
  };
});

const test = (...args: any[]) => {
  // navigateTo("/Test/test3");
};

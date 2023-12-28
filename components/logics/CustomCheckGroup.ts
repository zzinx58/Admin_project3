export const useCustomCheckGroupLogic = <T>(
  inspectArr: T[],
  targetAttr: keyof T,
  selectStrategy: "multiple" | "single",
  user_isItemSelectedFunc?: (inspectArr: T[], targetItem: T) => boolean
) => {
  const isItemSelected = (targetItem: T) => {
    const _isItemSelectFunc =
      (user_isItemSelectedFunc &&
        user_isItemSelectedFunc(inspectArr, targetItem)) ??
      _isItemSelectedFunc(targetItem);
    return _isItemSelectFunc;
  };
  const onItemSelect = (targetItem: T) => {
    if (isItemSelected(targetItem)) {
      _itemRemoveBehavior(targetItem);
    } else {
      _itemAddBehavior(targetItem);
    }
  };
  // ----------------------------------------------------------------
  const _itemAddBehavior = (targetItem: T) => {
    if (selectStrategy === "single") inspectArr.splice(0, inspectArr.length);
    inspectArr.push(targetItem);
  };
  const _itemRemoveBehavior = (targetItem: T) => {
    const itemToRemoveIndex = _getItemIndexFunc(targetItem);
    if (itemToRemoveIndex !== -1) {
      inspectArr.splice(itemToRemoveIndex, 1);
    }
  };
  const _isItemSelectedFunc = (targetItem: T) => {
    return _getItemIndexFunc(targetItem) === -1 ? false : true;
  };
  const _getItemIndexFunc = (targetItem: T) => {
    return inspectArr.findIndex((value, index, selfArr) => {
      return value[targetAttr] === targetItem[targetAttr];
    });
  };
  return {
    isItemSelected,
    onItemSelect,
  };
};

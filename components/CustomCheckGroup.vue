<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: any[];
    itemsInfoList?: any[];
    selectStrategy?: "multiple" | "single";
    targetAttr?: string | number;
    isItemSelected?: (inspectArr: any[], targetItem: any) => boolean;
  }>(),
  {
    selectStrategy: "multiple",
    targetAttr: "id",
  }
);
const emits = defineEmits<{
  "update:modelValue": any[];
  "delete:deletedItem": any;
}>();
import { useCustomCheckGroupLogic } from "./logics/CustomCheckGroup";
const { onItemSelect, isItemSelected } = useCustomCheckGroupLogic(
  props.modelValue,
  props.targetAttr,
  props.selectStrategy
);
watch(props.modelValue, (target) => {
  emits("update:modelValue", target);
});
</script>

<template>
  <div>
    <div
      v-for="item in props.itemsInfoList"
      @click="
        () => {
          onItemSelect(item);
        }
      "
    >
      <slot
        name="item"
        :item-data="item"
        :isItemSelected="isItemSelected(item)"
      ></slot>
    </div>
  </div>
</template>

<style scoped></style>

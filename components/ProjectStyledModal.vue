<script lang="ts" setup>
const refOpen = ref(false);
defineExpose({
  toggleModal: () => (refOpen.value = !refOpen.value),
});

const props = withDefaults(
  defineProps<{
    useMailTemplate?: boolean;
    useDisplayTemplate?: boolean;
    mailTemplate?: {
      modalBaseClass?: string;
      modalHeaderClass?: string;
      modalTitle?: string;
      modalContentWrapperClass?: string;
    };
    displayTemplate?: {
      modalBaseClass?: string;
      modalContentWrapperClass?: string;
    };
  }>(),
  {}
);
const mailTemplateDefaultConfig = {
  modalTitle: "邮件",
  modalBaseClass: "h-550px w-888px rounded-20px",
  modalHeaderClass:
    "grid place-content-center relative rounded-t-20px h-50px bg-main-btn_primary-negative text-white text-28px",
  modalContentWrapperClass: "pt-10 px-8",
};
const displayTemplateDefaultConfig = {
  modalBaseClass:
    "bg-#B0B0C4! min-w-740px max-w-1340px py-5 px-6 overflow-auto rounded-10px",
  modalContentWrapperClass:
    "bg-#6F6F8B pt-5 pb-10 px-8 rounded-10px min-w-740px",
};

const finalMailTemplateConfig = useDefu(
  props.mailTemplate,
  mailTemplateDefaultConfig
);
const finalDisplayTemplateConfig = useDefu(
  props.displayTemplate,
  displayTemplateDefaultConfig
);

const modalBaseClass = props.useMailTemplate
  ? finalMailTemplateConfig.modalBaseClass
  : props.useDisplayTemplate
    ? finalDisplayTemplateConfig.modalBaseClass
    : "";
</script>

<template>
  <n-modal v-model:show="refOpen">
    <n-card
      :bordered="false"
      :class="modalBaseClass"
      content-style="padding:0px"
    >
      <slot>
        <!-- default slot -->
        <slot name="mailTemplate" v-if="useMailTemplate">
          <div
            id="mail-header"
            :class="finalMailTemplateConfig.modalHeaderClass"
          >
            <div>{{ finalMailTemplateConfig.modalTitle }}</div>
            <slot name="mail-modal-closer">
              <div
                class="i-mdi-close absolute right-5 top-3 hover:opacity-70 hover:cursor-pointer"
                @click="refOpen = false"
              />
            </slot>
          </div>
          <div
            id="mail-content"
            :class="finalMailTemplateConfig.modalContentWrapperClass"
          >
            <slot name="mail-content"></slot>
          </div>
        </slot>

        <slot name="displayTemplate" v-if="useDisplayTemplate">
          <div :class="finalDisplayTemplateConfig.modalContentWrapperClass">
            <slot name="display-content"></slot>
          </div>
        </slot>
      </slot>
      <!-- <div
        class="i-mdi:arrow-up-bold text-gray text-34px fixed left-50% top-5 -mx-8 animate-bounce"
      ></div>
      <div
        class="i-mdi:arrow-down-bold text-gray text-34px fixed left-50% bottom-5 -mx-8 animate-bounce"
      ></div> -->
    </n-card>
  </n-modal>
</template>

<style scoped></style>

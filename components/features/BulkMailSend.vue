<script lang="ts" setup>
defineProps<{
  modalTitle?: string;
}>();
const refModalShow = ref(false);
const refBulkMailSendForm = ref();
defineExpose({
  refModalShow,
});
</script>

<template>
  <n-modal v-model:show="refModalShow">
    <n-card
      :bordered="false"
      class="h-550px w-888px rounded-20px bg-red"
      content-style="padding:0px"
    >
      <div>
        <slot name="header">
          <div
            id="header"
            class="grid place-content-center relative rounded-t-20px h-50px bg-main-btn_primary-negative text-white text-28px"
          >
            <div>{{ modalTitle }}</div>
            <slot name="rt-closer">
              <div
                class="i-mdi-close absolute right-5 top-3 hover:opacity-70 hover:cursor-pointer"
                @click="refModalShow = false"
              />
            </slot>
          </div>
        </slot>
        <slot name="content">
          <div id="content" class="pt-10 px-8">
            <n-form
              ref="refBulkMailSendForm"
              label-placement="left"
              label-width="80px"
            >
              <div class="grid grid-cols-2 gap-6">
                <n-form-item label="模版:" label-style="font-size: 20px">
                  <n-select placeholder="可选邮件模版"></n-select>
                </n-form-item>
                <n-form-item
                  label="定时发送:"
                  label-style="font-size: 20px"
                  class="gap-3"
                >
                  <n-date-picker
                    type="datetime"
                    clearable
                    format="yyyy-MM-dd HH:mm"
                    placeholder="请选择定时发送时间"
                  />
                </n-form-item>
              </div>
              <n-form-item label="主题:" label-style="font-size: 20px">
                <n-input placeholder="请输入邮件主题" />
              </n-form-item>
              <n-form-item label="收件人:" label-style="font-size: 20px">
                <n-select
                  placeholder="可手动输入收件人Id，按回车键确认"
                  :show="false"
                  tag
                  :show-arrow="false"
                  filterable
                  multiple
                />
              </n-form-item>
              <n-form-item label="内容:" label-style="font-size: 20px">
                <n-input
                  type="textarea"
                  placeholder="请输入邮件内容"
                  :autosize="{
                    minRows: 8,
                  }"
                />
              </n-form-item>
              <div class="flex justify-end">
                <n-button
                  type="primary"
                  role="submit"
                  icon-placement="left"
                  :bordered="false"
                  class="bg-main-btn_primary-positive w-100px h-40px text-white rounded-10px text-20px"
                  @click=""
                >
                  <template #icon>
                    <div
                      class="i-mingcute:send-plane-fill text-white text-20px"
                    ></div>
                  </template>
                  发送</n-button
                >
              </div>
            </n-form>
          </div>
        </slot>
      </div>
    </n-card>
  </n-modal>
</template>

<style scoped></style>

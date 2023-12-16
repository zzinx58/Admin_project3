<script lang="ts" setup>
useHead({
  title: "XLSX",
});
const fileInputRef = ref();
const fileData_in_json = ref();
const convertedFileData_in_json = ref();
const dictionary = {
  赛事编号: "t_id",
  项目编号: "p_id",
  项目: "p_name",
  账号ID: "user_id",
  姓名: "name",
  选手编号: "t_number",
  轮次: "项目",
  第一回合成绩: "r1_duration",
  第二回合成绩: "r2_duration",
  第三回合成绩: "r3_duration",
  第四回合成绩: "r4_duration",
  第五回合成绩: "r5_duration",
  赛制类型编号: "round_format",
};
const handleFileUpload = async () => {
  const fileRawArr = getFilesFromFileInputElements(fileInputRef.value);
  if (fileRawArr?.length) {
    // console.log(fileRawArr[0]);
    // const fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(fileRawArr[0]);
    // fileReader.onloadend = (loadEndEvent) => {
    //   const fileArrayBuffer = loadEndEvent.target?.result;
    //   // console.log(fileArrayBuffer);
    // };
    const sheetRawResult_in_json = await xlsx_sheet_to_json(fileRawArr[0]);
    // console.log(result);
    fileData_in_json.value = sheetRawResult_in_json;
    const test = dictionary_ObjectKeyMappingConvertFunc(
      dictionary,
      sheetRawResult_in_json
    );
    convertedFileData_in_json.value = test;
  }
};
const convertResult = dictionary_keyValueConvertFunc(dictionary, "p_id");
console.log(convertResult);

/* jsonpath dev use test. */
const { t_detail_attrs_obj_withSequence_constants } =
  useProjectConstants.tournament;
const jsonpath_test = useJSONPath({
  json: t_detail_attrs_obj_withSequence_constants,
  path: "$..iconMeta",
});
</script>

<template>
  <input type="file" ref="fileInputRef" @change="handleFileUpload" />
  <hr />
  <pre>{{ fileData_in_json }}</pre>
  <hr />
  <pre>{{ convertedFileData_in_json }}</pre>
  <hr />
  <pre>{{ jsonpath_test }}</pre>
</template>

<style scoped></style>

// ----------------------------------------------------------------
import { defineStore } from "pinia";
export const definePiniaStore = defineStore;
// ----------------------------------------------------------------
import * as xlsx from "xlsx";
const { read: xlsx_read, utils: xlsx_utils } = xlsx;
const { sheet_to_json: xlsx_utils_sheet_to_json } = xlsx_utils;
export const getFilesFromFileInputElements = (
  fileInputElement: HTMLInputElement
) => {
  return fileInputElement.files;
};
export const xlsx_sheet_to_json = (
  fileObj:
    | {
        raw: File;
        [key: string]: any;
      }
    | File
): Promise<Array<any>> => {
  // export const fileReader = new FileReader() ?;
  const fileReader = new FileReader();
  if ("raw" in fileObj) {
    fileReader.readAsArrayBuffer(fileObj.raw);
  } else {
    fileReader.readAsArrayBuffer(fileObj);
  }
  // fileReader.onload ? or onloadEnd?.
  // fileReader.onloadend is a callback, won't return any results.
  const result = new Promise<Array<any>>((resolve, reject) => {
    fileReader.onloadend = (loadEndEvent) => {
      const fileArrayBuffer = loadEndEvent.target?.result;
      const workbook = xlsx_read(fileArrayBuffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      const sheet1Name = sheetNames[0];
      const sheet1Data = workbook.Sheets[sheet1Name];
      const sheet1Data_in_Json = xlsx_utils_sheet_to_json(sheet1Data);
      resolve(sheet1Data_in_Json);
    };
  });
  return result;
};
export const xlsx_json_to_sheet = (
  sheetName: string,
  fileName: string,
  dataArr: Record<string, any>[]
) => {
  const jsonWorkSheet = xlsx.utils.json_to_sheet(dataArr);
  const workbook: xlsx.WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    },
  };
  return xlsx.writeFile(workbook, fileName);
};
// ----------------------------------------------------------------
export const dictionary_keyValueConvertFunc = (
  dictionary: Record<string, string>,
  value: string
) => {
  const pathToResult = `$[?(@property === "${value}" || @ === "${value}")]`;
  const itemInfos = useJSONPath<Array<any>>({
    path: pathToResult,
    json: dictionary,
    resultType: "all",
  });
  const firstItemInfo = itemInfos[0];
  // const result = [firstItemInfo.parentProperty, firstItemInfo.value];
  let result = undefined;
  if (itemInfos.length) {
    result =
      value === firstItemInfo.parentProperty
        ? firstItemInfo.value
        : firstItemInfo.parentProperty;
  }
  return result;
};
export const dictionary_ObjectKeyMappingConvertFunc = (
  dictionary: Record<string, string>,
  objItemsArr: Array<Object>
) => {
  return objItemsArr.map((objItem) => {
    const itemKVArr = Object.entries(objItem);
    const convertedKVArr = itemKVArr.map((kvItem) => {
      const [key, value] = kvItem;
      return [dictionary_keyValueConvertFunc(dictionary, key), value];
    });
    return myFuncs.fromPairs(convertedKVArr);
  });
};
// ----------------------------------------------------------------
import * as JSONPathPlus from "jsonpath-plus";
export const useJSONPath = JSONPathPlus.JSONPath;
// ----------------------------------------------------------------
import useLodash from "lodash";
export const _ = useLodash;
// ----------------------------------------------------------------
import {
  defaultIfEmpty,
  pipe,
  of,
  interval,
  takeUntil,
  map,
  startWith,
  scan,
} from "rxjs";
export const useRxjs = () => {
  return {
    // rxjs
    defaultIfEmpty,
    pipe,
    of,
    interval,
    takeUntil,
    map,
    startWith,
    scan,
    // @vueuse/rxjs
    useObservable,
    from,
    useSubscription,
  };
};
// ----------------------------------------------------------------
import {
  createRegExp,
  exactly,
  maybe,
  oneOrMore,
  anyOf,
  charIn,
  charNotIn,
  digit,
  char,
  wordChar,
  wordBoundary,
  word,
  dotAll,
  sticky,
  whitespace,
  withIndices,
  tab,
  unicode,
  global,
  letter,
  linefeed,
  carriageReturn,
  caseInsensitive,
  not,
  multiline,
} from "magic-regexp";
// RegExp: Regular Expression.
export const useMagicRegexp = () => ({
  createRegExp,
  exactly,
  maybe,
  oneOrMore,
  anyOf,
  charIn,
  charNotIn,
  digit,
  char,
  wordChar,
  wordBoundary,
  word,
  dotAll,
  sticky,
  whitespace,
  withIndices,
  tab,
  unicode,
  global,
  letter,
  linefeed,
  carriageReturn,
  caseInsensitive,
  not,
  multiline,
});
// ----------------------------------------------------------------

// ----------------------------------------------------------------
/* 
targetString:"2023-12-15T10:19:40Z"
parseISO & parseJSON funcs's result seems same at present. 
useDateFns_FP().getUnixTime(useDateFns_FP().parseISO(time)), // 1702635580
useDateFns_FP().parseISO(time).toUTCString(), // GMT+0000 "Fri, 15 Dec 2023 10:19:40 GMT"
useDateFns_FP().parseISO(time).toTimeString(), // GMT+0800 "18:19:40 GMT+0800 (中国标准时间)"
useDateFns_FP().parseISO(time).toString(), // GMT+0800 "Fri Dec 15 2023 18:19:40 GMT+0800 (中国标准时间)".
useDateFns_FP().parseISO(time).toLocaleTimeString(), // GMT+0800 "18:19:40"
useDateFns_FP().parseISO(time).toLocaleString(), // GMT+0800 "2023/12/15 18:19:40"
useDateFns_FP().parseISO(time).toLocaleDateString(), // GMT+0800 "2023/12/15"
useDateFns_FP().parseISO(time).toJSON(), // GMT+0000 "2023-12-15T10:19:40.000Z"
useDateFns_FP().parseISO(time).toISOString(), // GMT+0000 "2023-12-15T10:19:40.000Z"
useDateFns_FP().parseISO(time), // GMT+0000 "2023-12-15T10:19:40.000Z"
[ISO_formattedTime].map(format_FP("yyyy-MM-dd HH:mm:ss")), // GMT+0800 "2023-12-15 18:19:40"
format(ISO_formattedTime, "yyyy-MM-dd HH:mm:ss"),
*/
import * as dateFns_FP from "date-fns/fp";
export const useDateFns_FP = () => ({
  ...dateFns_FP,
});
import {
  parse,
  parseISO,
  parseJSON,
  getUnixTime,
  fromUnixTime,
  // format: Return the formatted date string in the given format. The result may vary by locale.
  format,
} from "date-fns";
export const useDateFns = () => ({
  parse,
  parseISO,
  parseJSON,
  getUnixTime,
  fromUnixTime,
  format,
});
// ----------------------------------------------------------------

export const myFuncs = {
  fromPairs: _.fromPairs,
  random: _.random,
  toPairs: _.toPairs,
  defaultTo: _.defaultTo,
};

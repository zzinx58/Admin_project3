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
export const myFuncs = {
  fromPairs: _.fromPairs,
};

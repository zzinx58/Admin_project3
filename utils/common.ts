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
import mitt from "mitt";
export const useMitt = mitt;
export const emitter = useMitt();
// ----------------------------------------------------------------
import * as JSONPathPlus from "jsonpath-plus";
export const useJSONPath = JSONPathPlus.JSONPath;
// ----------------------------------------------------------------
import gsap from "gsap";
export const useGSAP = () => gsap;
// ----------------------------------------------------------------
import useLodash from "lodash";
import useLodash_FP from "lodash/fp";
export const _ = useLodash;
export const _FP = useLodash_FP;
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
  take,
  zip,
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
    take,
    zip,
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
import { defu } from "defu";
export const useDefu = defu;
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
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  isDate,
  isValid,
  isPast,
  isFuture,
  // interval
  isWithinInterval,
  getTime,
  type Interval,
  getDay,
  getISODay,
  differenceInCalendarDays,
} from "date-fns";

export const useDateFns = () => ({
  parse,
  parseISO,
  parseJSON,
  getUnixTime,
  fromUnixTime,
  format,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  isDate,
  isValid,
  isPast,
  isFuture,
  isWithinInterval,
  getTime,
  getDay,
  getISODay,
  differenceInCalendarDays,
});
const getISODay_zhcnStr = (dayISOIdentifier: number | string) => {
  if (isNaN(parseInt("" + dayISOIdentifier)))
    return "Invalid ISO dayIdentifier";
  switch (dayISOIdentifier) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 7:
      return "星期天";
    default:
      return "Outof valid dayIdentifier";
  }
};
// ----------------------------------------------------------------
const isValidUrl_js = (strOrAny: any) => {
  if (typeof strOrAny === "string") {
    return strOrAny.startsWith("https://");
  } else return false;
};
const num2ChineseNum = (num: number) => {
  const chineseNumbers = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  /* mutation:
    10: (一)十(零)
    21: 二十一
    100: 一百
    101: 一百[(十)零]一
    110: 一百一十
    1010: 一千[(百)零]一十
    10001: 一万[(千百十)零]一
    10010: 一万[(千百)零]一十
  */
  const chineseMagnitudeWords = ["", "十", "百", "千", "万"];
  const numStr = String(num);
  const unitsArr = chineseMagnitudeWords.slice(0, numStr.length);
  const useDigit = (index: number) => parseInt(numStr.charAt(index));
  let result = "";

  if (num < 0) return "不支持负数";
  if (num === 0) return chineseNumbers[0];
  if (num === 10) return unitsArr.pop();
  for (let i = 0; i < numStr.length; i++) {
    const digit = useDigit(i);
    if (num > 10 && num < 20) {
      return unitsArr.pop() + chineseNumbers[useDigit(i + 1)];
    }
    if (digit !== 0) {
      result += chineseNumbers[digit] + unitsArr.pop();
    } else {
      if (numStr.charAt(i - 1) !== "0") {
        unitsArr.pop();
        if (
          numStr
            .slice(i)
            .split("")
            .findIndex((item) => item !== "0") === -1
        )
          break;
        result += "零";
      } else {
        unitsArr.pop();
      }
    }
  }
  return result;
};

// IsMagnitudeWord. 10, 1000, 10000 ...
const isPowerOfTen = (num: number) => Number.isInteger(Math.log10(num));

const attrComposer = (
  attrsObj: Record<string, (args: any) => any>,
  sourcesObj: Record<string, any>,
  targetAttr: string
): {
  [key: string]: {
    [key: string]: any;
    formatter?: (args: any) => any;
  };
} => {
  const isFormattersObjMatchSourceObj = Object.keys(attrsObj).every(
    (key) => key in sourcesObj
  );
  if (!isFormattersObjMatchSourceObj) {
    throw new Error("Invalid formattersObj");
  }
  Object.entries(attrsObj).forEach(([key, value]) => {
    sourcesObj[key][targetAttr] = value;
  });
  return sourcesObj;
};

const util_resetForm = (
  targetRef: Ref<Record<string, any>>,
  additionalsObject: Record<string, any>
) => {
  const resolvedObj = {
    ...Object.fromEntries(
      Object.entries(targetRef.value).map(([key, value]) => {
        if (typeof value !== "object") {
          return [key, null];
        } else {
          return [key, value];
        }
      })
    ),
    ...additionalsObject,
  };
  targetRef.value = resolvedObj;
};

const handleExportData = (dataArr: Record<string, any>[], fileName: string) => {
  const sheetName = `Sheet1`;
  const finalFileName = `${fileName} - ${useDateFns().format(
    new Date(),
    "yyyy年MM月dd日_HH时mm分"
  )}.xlsx`;
  xlsx_json_to_sheet(sheetName, finalFileName, dataArr);
};

export const myFuncs = {
  fromPairs: _.fromPairs,
  random: _.random,
  toPairs: _.toPairs,
  defaultTo: _.defaultTo,
  flow: _FP.flow,
  compose: _FP.compose,
  over: _FP.over,
  cloneDeep: _.cloneDeep,
  isValidUrl: isValidUrl_js,
  num2ChineseNum: num2ChineseNum,
  isPowerOfTen: isPowerOfTen,
  attrComposer: attrComposer,
  findIndex: _.findIndex,
  getISODay_zhcn: getISODay_zhcnStr,
  util_resetForm,
  handleExportData,
};

/* Project Search Info-Meterials. */
import * as constants from "@/constants";
export const useProjectConstants = () => ({
  ...constants,
});

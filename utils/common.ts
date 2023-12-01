import * as JSONPathPlus from "jsonpath-plus";
export const useJSONPath = JSONPathPlus.JSONPath;

import useLodash from "lodash";
export const _ = useLodash;

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

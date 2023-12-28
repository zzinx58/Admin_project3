import {
  test,
  it,
  describe,
  expect,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import { myFuncs } from "./common";

describe("numberToChinese", () => {
  const { num2ChineseNum: numberConvertToChinese } = myFuncs;
  /* mutation:
    10: 十
    21: 二十一
    100: 一百
    101: 一百零一
    110: 一百一十
  */
  test("should be invalid", () => {
    expect(numberConvertToChinese(-1)).toEqual("不支持负数");
  });
  test("should be zero", () => {
    expect(numberConvertToChinese(0)).toEqual("零");
  });
  // mutation
  test("should be ten", () => {
    expect(numberConvertToChinese(10)).toEqual("十");
  });
  test("should be elevent", () => {
    expect(numberConvertToChinese(11)).toEqual("十一");
  });
  // mutation
  test("should be twenty one", () => {
    expect(numberConvertToChinese(21)).toEqual("二十一");
  });
  // mutation
  test("should be one hundred", () => {
    expect(numberConvertToChinese(100)).toEqual("一百");
  });
  // mutation
  test("should be one hundred and one", () => {
    expect(numberConvertToChinese(101)).toEqual("一百零一");
  });
  // mutation
  test("should be one hundred and ten", () => {
    expect(numberConvertToChinese(110)).toEqual("一百一十");
  });
  test("should be one thousand", () => {
    expect(numberConvertToChinese(1000)).toEqual("一千");
  });
  test("should be one thousand and one", () => {
    expect(numberConvertToChinese(1001)).toEqual("一千零一");
  });
  test("should be one thousand and ten", () => {
    expect(numberConvertToChinese(1010)).toEqual("一千零一十");
  });
  test("should be ten thousands", () => {
    expect(numberConvertToChinese(10000)).toEqual("一万");
  });
  test.concurrent("should pass serial tests", () => {
    expect(numberConvertToChinese(0)).toEqual("零");
    expect(numberConvertToChinese(10)).toEqual("十");
    expect(numberConvertToChinese(11)).toEqual("十一");
    expect(numberConvertToChinese(21)).toEqual("二十一");
    expect(numberConvertToChinese(100)).toEqual("一百");
    expect(numberConvertToChinese(101)).toEqual("一百零一");
    expect(numberConvertToChinese(110)).toEqual("一百一十");
    expect(numberConvertToChinese(1000)).toEqual("一千");
    expect(numberConvertToChinese(1001)).toEqual("一千零一");
    expect(numberConvertToChinese(1010)).toEqual("一千零一十");
    expect(numberConvertToChinese(10000)).toEqual("一万");
  });
});

import * as dateFNS from "date-fns";
import * as dateFNS_FP from "date-fns/fp";
import * as _FP from "lodash/fp";
import * as _ from "lodash";
describe("date-fns-related", () => {
  test("should be '1-23'", () => {
    let testArr = ["2023-01-23T07:04:06.480Z", "2023-12-23T07:04:06.480Z"].map(
      dateFNS_FP.parseISO
    );
    const result = dateFNS.format(testArr[0], "M-dd");
    expect(result).toEqual("1-23");
  });
});

describe("formatter composer", () => {
  const formattersObj = {
    obj1: () => {
      console.log("from obj1 formatter");
    },
  };
  const sourcesObj = {
    obj2: {
      attr: "123",
    },
  };
  const { formatterComposer } = myFuncs;
  test("should combine formatter in object", () => {
    const sourcesObj = {
      obj1: {
        attr: "123",
      },
    };
    const resultObj = formatterComposer(formattersObj, sourcesObj);
    console.log(formatterComposer(formattersObj, sourcesObj));
    const formatter = formatterComposer(formattersObj, sourcesObj).obj1
      .formatter;
    formatter ? formatter(123) : 123;
    expect(_.isMatch(resultObj, sourcesObj)).toBeTruthy();
  });

  test("should throw Error", () => {
    expect(() => formatterComposer(formattersObj, sourcesObj)).toThrow(
      /Invalid/
    );
  });
});

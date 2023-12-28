import { beforeEach, afterEach, it, expect, describe, vi } from "vitest";
// import { onItemSelectTemp } from "./CustomCheckGroup";

// const testArr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
// const onItemSelect = onItemSelectTemp(testArr, "single");
// onItemSelect({ id: 1 });
// console.log(testArr);
// onItemSelect({ id: 2 });
// console.log(testArr);
//
// const onItemSelect = onItemSelectTemp(testArr, "multiple");
// onItemSelect({ id: 1 });
// console.log(testArr);
// onItemSelect({ id: 2 });
// console.log(testArr);
// onItemSelect({ id: 6 });
// console.log(testArr);

// describe("test", () => {
//   it.each([[1, 2, 3]])("test: %i + %i = %i", (a, b, c) => {
//     expect(a + b).toEqual(c);
//   });
// });

import { getISODay, getDay, parseISO } from "date-fns";

console.log(getISODay(parseISO("2023-12-15T10:19:40.000Z").getTime()));
console.log(getDay(parseISO("2023-12-17T10:19:40.000Z").getTime()));

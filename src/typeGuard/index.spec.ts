import { array, instanceOf, number, scanner, string } from "..";
import {
  isArray,
  isBoolean,
  isDate,
  isInstanceOf,
  isNull,
  isNumber,
  isOptional,
  isString,
  isUnion,
} from ".";

// isUnion
describe("isUnion", () => {
  type Foo = {
    a: string;
    b: number;
  };

  const isFoo = scanner<Foo>({
    a: string,
    b: number,
  });

  it("to be true", () => {
    expect(isUnion<string | number>(1, isString, isNumber)).toBe(true);
    expect(isUnion<string | number>("", isString, isNumber)).toBe(true);
    expect(
      isUnion<string[] | number[]>([""], array(string), array(number))
    ).toBe(true);
    expect(isUnion<Foo | null>(null, isFoo, isNull));
  });
  it("to be false", () => {
    expect(isUnion<string | boolean>(1, isString, isBoolean)).toBe(false);
    expect(
      isUnion<string[] | number[]>([true], array(string), array(number))
    ).toBe(false);
    expect(isUnion<Foo | Date>(1, isFoo, instanceOf(Date)));
  });
});

// isArray
describe("isArray", () => {
  it("to be true (primitive)", () => {
    expect(isArray(["foo", "hoge"], isString)).toBe(true);
    expect(isArray([1, 2, 3], isNumber)).toBe(true);
    expect(isArray([true, false], isBoolean)).toBe(true);
  });
  it("to be false (primitive)", () => {
    expect(isArray([1, 2, 3], isString)).toBe(false);
    expect(isArray([1, "2"], isString)).toBe(false);
  });

  it("to be true (union)", () => {
    expect(
      isArray<string | number | boolean | Date>(
        [1, "2", 3, false, new Date()],
        isString,
        isNumber,
        isBoolean,
        isDate
      )
    ).toBe(true);
  });
  it("to be false (union)", () => {
    expect(
      isArray<string | number | boolean>(
        [1, "2", 3, false, new Date()],
        isString,
        isNumber,
        isBoolean
      )
    ).toBe(false);
  });
});

// isOptional
describe("isOptional", () => {
  it("to be true (primitive)", () => {
    expect(isOptional("", isString)).toBe(true);
    expect(isOptional(undefined, isString)).toBe(true);
    expect(isOptional(undefined, isArray)).toBe(true);
  });
  it("to be false (primitive)", () => {
    expect(isOptional(1, isString)).toBe(false);
  });

  it("to be true (union)", () => {
    expect(isOptional<string | number>("", isString, isNumber)).toBe(true);
  });

  it("to be false (union)", () => {
    expect(isOptional<string | number>(new Date(), isString, isNumber)).toBe(
      false
    );
  });
});

// isInstanceOf
describe("isInstanceOf", () => {
  class Timestamp {
    constructor(public seconds: number, public nanoseconds: number) {}
  }

  const timestamp = new Timestamp(1, 2) as unknown;

  it("to be true", () => {
    expect(isInstanceOf(timestamp, Timestamp)).toBe(true);
  });

  it("to be false", () => {
    expect(isInstanceOf({}, Timestamp)).toBe(false);
  });
});

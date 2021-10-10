import {
  isArray,
  isBoolean,
  isDate,
  isNumber,
  isOptional,
  isString,
} from "./typeGuard";

// isArray
describe("isArray", () => {
  it("primitive success", () => {
    expect(isArray(["foo", "hoge"], isString)).toBe(true);
    expect(isArray([1, 2, 3], isNumber)).toBe(true);
    expect(isArray([true, false], isBoolean)).toBe(true);
  });
  it("primitive error", () => {
    expect(isArray([1, 2, 3], isString)).toBe(false);
    expect(isArray([1, "2"], isString)).toBe(false);
  });

  it("union success", () => {
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
  it("union error", () => {
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
  it("primitive success", () => {
    expect(isOptional("", isString)).toBe(true);
    expect(isOptional(undefined, isString)).toBe(true);
    expect(isOptional(undefined, isArray)).toBe(true);
  });
  it("primitive error", () => {
    expect(isOptional(1, isString)).toBe(false);
  });

  it("union success", () => {
    expect(isOptional<string | number>("", isString, isNumber)).toBe(true);
  });

  it("union error", () => {
    expect(isOptional<string | number>(new Date(), isString, isNumber)).toBe(
      false
    );
  });
});

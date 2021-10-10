import { isArray, isBoolean, isDate, isNumber, isOptional, isString } from ".";

describe("isArray test", () => {
  it("string success", () => {
    expect(isArray<string>(["foo", "hoge"], isString)).toBe(true);
  });
  it("string error1", () => {
    expect(isArray<string>([1, 2, 3], isString)).toBe(false);
  });
  it("string error2", () => {
    expect(isArray<string>([1, "2"], isString)).toBe(false);
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

describe("isOptional test", () => {
  it("string success", () => {
    expect(isOptional("", isString)).toBe(true);
  });
  it("string error", () => {
    expect(isOptional(1, isString)).toBe(false);
  });
  it("undefined success", () => {
    expect(isOptional(undefined, isString)).toBe(true);
  });
});

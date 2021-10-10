import { isArray, isOptional, isString } from ".";

describe("isArray test", () => {
  it("string success", () => {
    expect(isArray<string>(["foo", "hoge"], isString)).toBe(true);
  });
  it("string error", () => {
    expect(isArray<string>([1, 2, 3], isString)).toBe(false);
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

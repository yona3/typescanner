import {
  array,
  boolean,
  date,
  list,
  number,
  optional,
  scan,
  scanner,
  string,
} from "..";

describe("scan", () => {
  type Foo = {
    a: string;
    b: number;
    c: boolean;
    d: Date;
    e: string[];
    f?: string;
    g: "a" | "b" | "c";
  };
  const foo = {
    a: "a",
    b: 2,
    c: true,
    d: new Date(),
    e: ["a", "b"],
    f: "f",
    g: "a",
  } as unknown;

  const isFoo = scanner<Foo>({
    a: string,
    b: number,
    c: boolean,
    d: date,
    e: array(string),
    f: optional(string),
    g: list(["a", "b", "c"]),
  });

  it("success (primitive)", () => {
    expect(scan("hello" as unknown, string)).toBe("hello");
    expect(scan(1 as unknown, number)).toBe(1);
  });

  it("success (object)", () => {
    expect(scan(foo, isFoo)).toEqual(foo);
  });

  it("throw error", () => {
    expect(() => scan("hello" as unknown, number)).toThrow(
      /type assertion is failed./
    );
    expect(() => scan({} as unknown, isFoo)).toThrow(
      /type assertion is failed./
    );
  });

  it("throw custom error", () => {
    expect(() =>
      scan("hello" as unknown, number, () => {
        throw new Error("custom error");
      })
    ).toThrow(/custom error/);
    expect(() =>
      scan({} as unknown, isFoo, () => {
        throw new Error("value is invalid.");
      })
    ).toThrow(/value is invalid./);
  });
});

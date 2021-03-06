import {
  array,
  boolean,
  date,
  list,
  Null,
  number,
  optional,
  scan,
  scanner,
  string,
  union,
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
    h: string | null;
    i: string | number;
  };
  const foo = {
    a: "a",
    b: 2,
    c: true,
    d: new Date(),
    e: ["a", "b"],
    f: "f",
    g: "a",
    h: "",
    i: 3,
  } as unknown;

  const isFoo = scanner<Foo>({
    a: string,
    b: number,
    c: boolean,
    d: date,
    e: array(string),
    f: optional(string),
    g: list(["a", "b", "c"]),
    h: union(string, Null),
    i: union<string | number>(string, number),
  });

  type Bar = {
    a: string;
    b: Foo | null;
    c: string | null;
    d?: Foo | null;
  };

  const bar = {
    a: "a",
    b: null,
    c: null,
    d: undefined,
  };

  const isBar = scanner<Bar>(
    {
      a: string,
      b: union(isFoo, Null),
      c: union(string, Null),
      d: optional(isFoo, Null),
    },
    { outputLog: true }
  );

  it("success (primitive)", () => {
    expect(scan("hello" as unknown, string)).toBe("hello");
    expect(scan(1 as unknown, number)).toBe(1);
  });

  it("success (object)", () => {
    expect(scan(foo, isFoo)).toEqual(foo);
  });

  it("success (object in union: object | null)", () => {
    expect(scan(bar, isBar)).toEqual(bar);
  });

  it("throw error", () => {
    expect(() => scan("hello" as unknown, number)).toThrow(
      /type assertion is failed./
    );

    // output error log
    expect(() =>
      scan({ a: "", b: null, c: null, d: {} } as unknown, isBar)
    ).toThrow(/type assertion is failed./);

    expect(() => scan({} as unknown, isFoo)).toThrow(
      /type assertion is failed./
    );
  });
});

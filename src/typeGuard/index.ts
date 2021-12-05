import type { Condition, WouldBe } from "../types";

export const isString: Condition<string> = (value: unknown): value is string =>
  typeof value === "string";

export const isNumber: Condition<number> = (value: unknown): value is number =>
  typeof value === "number";

export const isBoolean: Condition<boolean> = (
  value: unknown
): value is boolean => typeof value === "boolean";

export const isSymbol: Condition<symbol> = (value: unknown): value is symbol =>
  typeof value === "symbol";

export const isBigint: Condition<bigint> = (value: unknown): value is bigint =>
  typeof value === "bigint";

export const isUndefined: Condition<undefined> = (
  value: unknown
): value is undefined => typeof value === "undefined";

export const isNull: Condition<null> = (value: unknown): value is null =>
  value === null;

export const isDate: Condition<Date> = (value: unknown): value is Date =>
  value instanceof Date;

export const isUnion = <T>(
  value: unknown,
  ...conditions: Condition<T>[]
): value is T => conditions.some((condition) => condition(value));

export const isArray = <T>(
  array: unknown,
  ...conditions: ((value: unknown) => value is T)[]
): array is T[] =>
  Array.isArray(array) &&
  array.every((value) => conditions.some((cond) => cond(value)));

export const isObject = <T extends Record<string, unknown>>(
  value: unknown
): value is WouldBe<T> => typeof value === "object" && value !== null;

export const isOptional = <T>(
  value: unknown,
  ...conditions: ((value: unknown) => value is T)[]
): value is T | undefined => {
  return value === undefined || conditions.some((cond) => cond(value));
};

export const isList = <T>(
  value: unknown,
  array: Exclude<T[], never[]>
): value is T => array.length !== 0 && array.includes(value as T);

export const isInstanceOf = <T>(
  value: unknown,
  constructor: new (...args: any[]) => T
): value is T => value instanceof constructor;

import type { WouldBe } from "./types";

/**
 * @package
 */
export const isString = (value: unknown): value is string =>
  typeof value === "string";

/**
 * @package
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

/**
 * @package
 */
export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

/**
 * @package
 */
export const isSymbol = (value: unknown): value is symbol =>
  typeof value === "symbol";

/**
 * @package
 */
export const isBigint = (value: unknown): value is bigint =>
  typeof value === "bigint";

/**
 * @package
 */
export const isUndefined = (value: unknown): value is undefined =>
  typeof value === "undefined";

/**
 * @package
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * @package
 */
export const isDate = (value: unknown): value is Date => value instanceof Date;

/**
 * @package
 */
export const isArray = <T>(
  array: unknown,
  ...conditions: ((value: unknown) => value is T)[]
): array is T[] =>
  Array.isArray(array) &&
  array.every((value) => conditions.some((cond) => cond(value)));

/**
 * @package
 */
export const isOptional = <T>(
  value: unknown,
  ...conditions: ((value: unknown) => value is T)[]
): value is T | undefined => {
  return value === undefined || conditions.some((cond) => cond(value));
};

/**
 * @package
 */
export const isObject = <T>(value: unknown): value is WouldBe<T> =>
  typeof value === "object" && value !== null;

import {
  isArray,
  isBigint,
  isBoolean,
  isDate,
  isNull,
  isNumber,
  isOptional,
  isString,
  isSymbol,
  isUndefined,
} from "./typeGuard";
import type { Condition } from "./types";

/**
 * @package
 */
export const string = isString;

/**
 * @package
 */
export const number = isNumber;

/**
 * @package
 */
export const boolean = isBoolean;

/**
 * @package
 */
export const symbol = isSymbol;

/**
 * @package
 */
export const bigint = isBigint;

/**
 * @package
 */
export const Undefined = isUndefined;

/**
 * @package
 */
export const Null = isNull;

/**
 * @package
 */
export const date = isDate;

/**
 * @package
 */
export const union = <T>(...conditions: Condition<T>[]): Condition<T>[] =>
  conditions;

/**
 * @package
 */
export const array =
  <T>(...conditions: Condition<T>[]) =>
  (value: unknown): value is T[] =>
    isArray(value, ...conditions);

/**
 * @package
 */
export const optional = <T>(
  ...conditions: Condition<T>[]
): ((value: unknown) => value is T | undefined) => {
  return (value: unknown): value is T | undefined =>
    isOptional(value, ...conditions);
};

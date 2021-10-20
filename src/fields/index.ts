import {
  isArray,
  isBigint,
  isBoolean,
  isDate,
  isInstanceOf,
  isList,
  isNull,
  isNumber,
  isOptional,
  isString,
  isSymbol,
  isUndefined,
} from "../typeGuard";
import type { Condition } from "../types";

export const string: Condition<string> = isString;
export const number: Condition<number> = isNumber;
export const boolean: Condition<boolean> = isBoolean;
export const symbol: Condition<symbol> = isSymbol;
export const bigint: Condition<bigint> = isBigint;
export const Undefined: Condition<undefined> = isUndefined;
export const Null: Condition<null> = isNull;
export const date: Condition<Date> = isDate;

export const union = <T>(...conditions: Condition<T>[]): Condition<T>[] =>
  conditions;

export const array =
  <T>(...conditions: Condition<T>[]): Condition<T[]> =>
  (value: unknown): value is T[] =>
    isArray(value, ...conditions);

export const optional = <T>(
  ...conditions: Condition<T>[]
): Condition<T | undefined> => {
  return (value: unknown): value is T | undefined =>
    isOptional(value, ...conditions);
};

export const list = <T>(array: Exclude<T[], never[]>): Condition<T> => {
  return (value: unknown): value is T => isList(value, array);
};

export const instanceOf = <T>(
  constructor: new (...args: any[]) => T
): Condition<T> => {
  return (value: unknown): value is T => isInstanceOf(value, constructor);
};

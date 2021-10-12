import {
  isArray,
  isBigint,
  isBoolean,
  isDate,
  isList,
  isNull,
  isNumber,
  isOptional,
  isString,
  isSymbol,
  isUndefined,
} from "../typeGuard";
import type { Condition } from "../types";

export const string = isString;
export const number = isNumber;
export const boolean = isBoolean;
export const symbol = isSymbol;
export const bigint = isBigint;
export const Undefined = isUndefined;
export const Null = isNull;
export const date = isDate;

export const union = <T>(...conditions: Condition<T>[]): Condition<T>[] =>
  conditions;

export const array =
  <T>(...conditions: Condition<T>[]) =>
  (value: unknown): value is T[] =>
    isArray(value, ...conditions);

export const optional = <T>(
  ...conditions: Condition<T>[]
): ((value: unknown) => value is T | undefined) => {
  return (value: unknown): value is T | undefined =>
    isOptional(value, ...conditions);
};

export const list = <T>(
  array: Exclude<T[], never[]>
): ((value: unknown) => value is T) => {
  return (value: unknown): value is T => isList(value, array);
};

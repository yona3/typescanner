import { isObject } from "./typeGuard";
import type { Condition } from "./types";

// fields
export {
  array,
  bigint,
  boolean,
  date,
  Null,
  number,
  optional,
  string,
  symbol,
  Undefined,
} from "./fields";

// type guard
export {
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

export const scanner = <T>(obj: { [key in keyof T]: Condition<any> }): ((
  value: unknown
) => value is T) => {
  return (value: unknown): value is T =>
    isObject<T>(value) &&
    typeof obj === "object" &&
    obj !== null && // check is object
    Object.entries<Condition<T>>(obj).every(
      ([key, condition]) => condition((value as any)[key]) // todo: any
    );
};

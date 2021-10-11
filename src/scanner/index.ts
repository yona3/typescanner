import { isObject } from "./typeGuard";
import type { Condition } from "./types";

// fields
export {
  array,
  bigint,
  boolean,
  date,
  list,
  Null,
  number,
  optional,
  string,
  symbol,
  Undefined,
  union,
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

// scanner
export const scanner = <T>(fields: {
  [key in keyof T]: Condition<any> | Condition<any>[];
}): ((value: unknown) => value is T) => {
  return (value: unknown): value is T =>
    // init value (convert all values to unknown)
    isObject<T>(value) &&
    // check fields is object
    typeof fields === "object" &&
    fields !== null &&
    // check each value
    Object.entries<Condition<T> | Condition<T>[]>(fields).every(
      ([key, condition]) => {
        if (Array.isArray(condition)) {
          // if union
          return condition.some((cond) => cond((value as any)[key]));
        } else {
          return condition((value as any)[key]);
        }
      }
    );
};

import { isObject } from "../typeGuard";
import type { Condition } from "../types";

export const scanner = <T extends Record<string, unknown>>(fields: {
  [key in keyof Required<T>]: Condition<any> | Condition<any>[];
}): ((value: unknown) => value is T) => {
  return (value: unknown): value is T =>
    // check each value
    isObject<T>(value) &&
    Object.entries<Condition<T> | Condition<T>[]>(fields).every(
      ([key, condition]) =>
        Array.isArray(condition)
          ? condition.some((cond) => cond((value as any)[key]))
          : condition((value as any)[key])
    );
};

import { isObject } from "../typeGuard";
import type { Condition } from "../types";

export const scanner = <T extends Record<string, unknown>>(
  fields: {
    [K in keyof Required<T>]: Condition<T[K]> | Condition<T[K]>[];
  },
  option?: { outputLog: boolean }
): Condition<T> => {
  return (value: unknown): value is T => {
    if (!isObject<T>(value)) {
      if (option?.outputLog) console.error("value is not object");
      return false;
    }

    // check each value
    return Object.entries<Condition<T[keyof T]> | Condition<T[keyof T]>[]>(
      fields
    ).every(([key, condition]) => {
      // if union type or not
      const isMeet = Array.isArray(condition)
        ? condition.some((cond) => cond(value[key]))
        : condition(value[key]);

      if (isMeet) return true;

      if (option?.outputLog)
        console.error(`value.${key} does not meet the condition.`);
      return false;
    });
  };
};

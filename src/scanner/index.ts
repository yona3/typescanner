import { isObject } from "../typeGuard";
import type { Condition } from "../types";

export const scanner = <T extends Record<string, unknown>>(fields: {
  [K in keyof Required<T>]: Condition<T[K]> | Condition<T[K]>[];
}): ((value: unknown) => value is T) => {
  return (value: unknown): value is T => {
    // check each value
    const isMeetCondition =
      isObject<T>(value) &&
      Object.entries<Condition<T[keyof T]> | Condition<T[keyof T]>[]>(
        fields
      ).every(([key, condition]) => {
        const isMeet = Array.isArray(condition)
          ? condition.some((cond) => cond((value as any)[key]))
          : condition((value as any)[key]);

        if (isMeet) return true;

        throw new Error(`value.${key} does not meet the condition.`);
      });

    if (isMeetCondition) return true;

    throw new Error("value does not meet the condition.");
  };
};

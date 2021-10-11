import { isObject } from "./typeGuard";
import type { Condition } from "./types";

/**
 * @package
 */
export const scanner = <T>(fields: {
  [key in keyof T]: Condition<any> | Condition<any>[];
}): ((value: unknown) => value is T) => {
  // check fields
  if (!(typeof fields === "object" && fields !== null)) false;

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

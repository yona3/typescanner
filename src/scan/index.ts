import type { Condition } from "../types";

export const scan = <T>(value: unknown, condition: Condition<T>): T => {
  if (condition(value)) return value;
  throw new Error(`type assertion is failed. (value: ${value})`);
};

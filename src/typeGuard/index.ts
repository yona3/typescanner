export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const isSymbol = (value: unknown): value is symbol =>
  typeof value === "symbol";

export const isBigint = (value: unknown): value is bigint =>
  typeof value === "bigint";

export const isUndefined = (value: unknown): value is undefined =>
  typeof value === "undefined";

export const isNull = (value: unknown): value is null => value === null;

export const isDate = (value: unknown): value is Date => value instanceof Date;

export const isArray = <T>(
  array: unknown,
  ...conditions: ((value: unknown) => value is T)[]
): array is T[] =>
  Array.isArray(array) &&
  array.every((value) => conditions.some((cond) => cond(value)));

export const isOptional = <T>(
  value: unknown,
  condition: (value: unknown) => value is T
): value is T | undefined => {
  return value === undefined || condition(value);
};

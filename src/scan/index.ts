export const scan = <T>(
  value: T,
  condition: (value: unknown) => value is T,
  callback?: (value: unknown) => void
): T => {
  if (condition(value)) return value;
  if (callback) callback(value);
  throw new Error(`type assertion is failed. (value: ${value})`);
};

export const scan = <T>(
  value: unknown,
  condition: (value: unknown) => value is T
): T => {
  if (condition(value)) return value;
  throw new Error(`type assertion is failed. (value: ${value})`);
};

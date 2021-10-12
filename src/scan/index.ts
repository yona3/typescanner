export const scan = <T>(
  value: unknown,
  condition: (value: unknown) => value is T,
  handleError?: (value: unknown) => void
): T => {
  if (condition(value)) return value;
  if (handleError) handleError(value);
  throw new Error(`type assertion is failed. (value: ${value})`);
};

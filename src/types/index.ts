export type WouldBe<T> = { [P in keyof T]?: unknown };
export type Condition<T> = (value: unknown) => value is T;

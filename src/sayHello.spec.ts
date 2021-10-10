import { sayHello } from "./sayHello";

describe("sayHello test", () => {
  it("should say hello John", () => {
    expect(sayHello("John")).toBe("Hello, John!");
  });
});

// utils.test.ts
import { capitalizeFirstLetter } from "./textUtils";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("test")).toBe("Test");
    expect(capitalizeFirstLetter("TEST")).toBe("Test");
  });

  it("should return the original string if it is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should handle strings with only one character", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
    expect(capitalizeFirstLetter("B")).toBe("B");
  });

  it("should not alter non-alphabetical characters", () => {
    expect(capitalizeFirstLetter("123hello")).toBe("123hello");
  });
});

import { generateRandomId } from "../../src/data/IdGenerator";

describe("IdGenerator test suite", () => {
  it("should return random string", () => {
    const actual = generateRandomId();

    expect(actual.length).toBe(20);
  });
});

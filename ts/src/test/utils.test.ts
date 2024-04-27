import { StringUtils, getStringInfo, toUpper } from "../app/utils";

// METHOD 1
// describe("utils.ts test suite", () => {
//   test("should return uppercase", () => {
//     const result = toUpper("abc");
//     expect(result).toBe("ABC");
//   });
// });

// METHOD 2
// this is the correct way
describe("utils.ts test suite", () => {
  it("should return uppercase of valid string", () => {
    // arrange:
    const sut = toUpper;
    const expected = "ABC";

    // act:
    const actual = sut("abc");

    // assert:
    expect(actual).toBe(expected);
  });

  // parametrized testing
  describe("ToUpperCase examples", () => {
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpper(input);
      expect(actual).toBe(expected);
    });
  });

  //  this is not correct way to test. hard to find the errors
  it("should return info for valid string", () => {
    const actual = getStringInfo("My-String");

    expect(actual.lowerCase).toBe("my-string");
    expect(actual.extraInfo).toEqual({});

    expect(actual.characters.length).toBe(9);
    expect(actual.characters).toHaveLength(9);

    // test arrays
    expect(actual.characters).toEqual([
      "M",
      "y",
      "-",
      "S",
      "t",
      "r",
      "i",
      "n",
      "g",
    ]);
    expect(actual.characters).toContain<string>("M");
    expect(actual.characters).toEqual(
      expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
    );

    // test objects
    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).not.toBeUndefined();
    expect(actual.extraInfo).toBeDefined();
    expect(actual.extraInfo).toBeTruthy();
  });

  // this is the best way to do multiple tests
  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
    });
    test("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });
    test("return right upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });
    test("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
      );
    });
    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
    });
  });

  //  hooks - beforeEach, afterEach, beforeAll, afterAll
  describe("StringUtils tests", () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log("Setup");
    });

    afterEach(() => {
      // clearing mocks
      console.log("Teardown");
    });

    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");

      expect(actual).toBe("ABC");
      console.log("Actual test");
    });
  });
});

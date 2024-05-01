import { IncomingMessage } from "http";
import { getRequestBody } from "../../src/utils/Utils";

const mockRequest = {
  on: jest.fn(),
};

const someObject = {
  name: "John",
  age: 30,
};
const someObjectAsString = JSON.stringify(someObject);

describe("getRequestBody test suite", () => {
  it("should return object for valid JSON", async () => {
    // we can't use mockImplementationOnce. the fn called 3 times
    mockRequest.on.mockImplementation((event, cb) => {
      if (event === "data") {
        cb(someObjectAsString);
      } else cb();
    });

    const actual = await getRequestBody(mockRequest as any as IncomingMessage);
    expect(actual).toEqual(someObject);
  });

  it("should throw error for invalid JSON", async () => {
    // we can't use mockImplementationOnce. the fn called 3 times
    mockRequest.on.mockImplementation((event, cb) => {
      if (event === "data") {
        cb("a " + someObjectAsString);
      } else cb();
    });

    await expect(getRequestBody(mockRequest as any)).rejects.toThrow();
  });
  it("should throw error for unexpected error", async () => {
    const someError = new Error("something went wrong");
    // we can't use mockImplementationOnce. the fn called 3 times
    mockRequest.on.mockImplementation((event, cb) => {
      if (event === "error") {
        cb(someError);
      }
    });

    await expect(getRequestBody(mockRequest as any)).rejects.toThrow(
      someError.message
    );
  });
});

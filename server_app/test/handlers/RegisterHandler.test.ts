import { IncomingMessage, ServerResponse } from "http";
import { RegisterHandler } from "../../src/handlers/RegisterHandler";
import * as getRequestBody from "../../src/utils/Utils";
import { Account } from "../../src/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../src/model/ServerModel";
import { Authorizer } from "../../src/auth/Authorizer";

const mockGetRequestBody = jest.fn();

jest.mock("../../src/utils/Utils", () => ({
  getRequestBody: () => mockGetRequestBody(),
}));

describe("RegisterHandler test suite", () => {
  let sut: RegisterHandler;

  const request = { method: "" };
  const mockResponse = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  };
  const mockAuthorizer = {
    registerUser: jest.fn(),
  };

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };
  const someId = "1234";

  beforeEach(() => {
    sut = new RegisterHandler(
      request as IncomingMessage,
      mockResponse as any as ServerResponse,
      mockAuthorizer as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register valid account in request", async () => {
    request.method = HTTP_METHODS.POST;
    mockGetRequestBody.mockResolvedValueOnce(someAccount);
    mockAuthorizer.registerUser.mockResolvedValueOnce(someId);

    await sut.handleRequest();

    expect(mockResponse.statusCode).toBe(HTTP_CODES.CREATED);
    expect(mockResponse.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify({
        userId: someId,
      })
    );
  });

  it("should not register invalid account in request", async () => {
    request.method = HTTP_METHODS.POST;
    mockGetRequestBody.mockResolvedValueOnce({});

    await sut.handleRequest();

    expect(mockResponse.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(mockResponse.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.BAD_REQUEST,
      {
        "Content-Type": "application/json",
      }
    );
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify("userName and password required")
    );
  });

  it("should do nothing for not supported method", async () => {
    request.method = HTTP_METHODS.GET;

    await sut.handleRequest();

    expect(mockResponse.writeHead).not.toHaveBeenCalled();
    expect(mockResponse.write).not.toHaveBeenCalled();
    expect(mockGetRequestBody).not.toHaveBeenCalled();
  });
});

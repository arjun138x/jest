import { IncomingMessage, ServerResponse } from "http";
import { RegisterHandler } from "../../src/handlers/RegisterHandler";
import * as getRequestBody from "../../src/utils/Utils";
import { Account } from "../../src/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../src/model/ServerModel";
import { Authorizer } from "../../src/auth/Authorizer";
import { LoginHandler } from "../../src/handlers/LoginHandler";

const mockGetRequestBody = jest.fn();

jest.mock("../../src/utils/Utils", () => ({
  getRequestBody: () => mockGetRequestBody(),
}));

describe("LoginHandler test suite", () => {
  let sut: LoginHandler;

  const request = { method: "" };
  const mockResponse = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  };
  const mockAuthorizer = {
    login: jest.fn(),
  };

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };
  const someId = "1234";

  beforeEach(() => {
    sut = new LoginHandler(
      request as IncomingMessage,
      mockResponse as any as ServerResponse,
      mockAuthorizer as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return token for valid account in request", async () => {
    request.method = HTTP_METHODS.POST;
    mockGetRequestBody.mockResolvedValueOnce(someAccount);
    mockAuthorizer.login.mockResolvedValueOnce(someId);

    await sut.handleRequest();

    expect(mockResponse.statusCode).toBe(HTTP_CODES.CREATED);
    expect(mockResponse.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify({
        token: someId,
      })
    );
  });

  it("should not return token for invalid account in request", async () => {
    request.method = HTTP_METHODS.POST;
    mockGetRequestBody.mockResolvedValueOnce(someAccount);
    mockAuthorizer.login.mockResolvedValueOnce(undefined);

    await sut.handleRequest();

    expect(mockAuthorizer.login).toBeCalledWith(
      someAccount.userName,
      someAccount.password
    );
    expect(mockResponse.statusCode).toBe(HTTP_CODES.NOT_fOUND);
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify("wrong username or password")
    );
  });

  it("should return bad request for invalid requests", async () => {
    request.method = HTTP_METHODS.POST;
    mockGetRequestBody.mockResolvedValueOnce({});

    await sut.handleRequest();

    expect(mockAuthorizer.login).not.toBeCalled();
    expect(mockResponse.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
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

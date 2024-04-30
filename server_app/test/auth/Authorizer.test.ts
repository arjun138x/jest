import { Authorizer } from "../../src/auth/Authorizer";
import { SessionTokenDataAccess } from "../../src/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../src/data/UserCredentialsDataAccess";
import * as IdGenerator from "../../src/data/IdGenerator";

// SessionTokenDataAccess mocks:
const mockIsValidToken = jest.fn();
const mockGenerateToken = jest.fn();
const mockInvalidateToken = jest.fn();

jest.mock("../../src/data/SessionTokenDataAccess", () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: mockIsValidToken,
        generateToken: mockGenerateToken,
        invalidateToken: mockInvalidateToken,
      };
    }),
  };
});

// UserCredentialsDataAccess mocks
const mockAddUser = jest.fn();
const mockGetUserByUserName = jest.fn();

jest.mock("../../src/data/UserCredentialsDataAccess", () => {
  return {
    UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
      return { addUser: mockAddUser, getUserByUserName: mockGetUserByUserName };
    }),
  };
});

describe("Authorizer test suite", () => {
  let sut: Authorizer;
  const someId = "1234";
  const someUserName = "someUserName";
  const somePassword = "somePassword";

  beforeEach(() => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toHaveReturnedTimes(1);
    expect(UserCredentialsDataAccess).toHaveReturnedTimes(1);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate token", async () => {
    mockIsValidToken.mockResolvedValueOnce(true);

    const actual = await sut.validateToken(someId);

    expect(actual).toBe(true);
  });

  it("should return id for new registered user", async () => {
    mockAddUser.mockResolvedValueOnce(someId);

    const actual = await sut.registerUser(someUserName, somePassword);

    expect(actual).toBe(someId);
    expect(mockAddUser).toHaveBeenCalledWith({
      id: someId,
      password: somePassword,
      userName: someUserName,
    });
  });

  it("should return tokenId for valid credentials", async () => {
    mockGetUserByUserName.mockResolvedValueOnce({
      password: somePassword,
    });
    mockGenerateToken.mockResolvedValueOnce(someId);

    const actual = await sut.login(someUserName, somePassword);

    expect(actual).toBe(someId);
  });

  it("should return undefined for invalid credentials", async () => {
    mockGetUserByUserName.mockResolvedValueOnce({
      password: somePassword,
    });

    const actual = await sut.login(someUserName, "updated password");

    expect(actual).toBeUndefined();
  });

  it("should  invalidate token on logout", async () => {
    await sut.logout(someId);

    expect(mockInvalidateToken).toHaveBeenCalledWith(someId);
  });
});

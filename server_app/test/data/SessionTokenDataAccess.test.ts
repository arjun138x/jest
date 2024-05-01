import { mock } from "node:test";
import { DataBase } from "../../src/data/DataBase";
import { SessionTokenDataAccess } from "../../src/data/SessionTokenDataAccess";
import { Account, SessionToken } from "../../src/model/AuthModel";
import * as idGenerator from "../../src/data/IdGenerator";

const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockGetBy = jest.fn();

jest.mock("../../src/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        // mock require methods
        insert: mockInsert,
        update: mockUpdate,
        getBy: mockGetBy,
      };
    }),
  };
});

const someId = "1234";
const someUser: Account = {
  id: "",
  userName: "someUserName",
  password: "somePassword",
};

describe("SessionTokenDataAccess test suite", () => {
  let sut: SessionTokenDataAccess;

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(global.Date, "now").mockReturnValue(0);
    jest.spyOn(idGenerator, "generateRandomId").mockReturnValue(someId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should generate token for account", async () => {
    mockInsert.mockResolvedValueOnce(someId);
    const actual = await sut.generateToken(someUser);

    expect(actual).toEqual(someId);
    expect(mockInsert).toHaveBeenCalledWith({
      id: someId,
      userName: someUser.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60),
    });
  });

  it("should invalidate token by tokenId", async () => {
    await sut.invalidateToken(someId);

    expect(mockUpdate).toHaveBeenCalledWith(someId, "valid", false);
  });

  it("should check valid token", async () => {
    mockGetBy.mockResolvedValueOnce({ valid: true });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(true);
  });

  it("should check invalid token", async () => {
    mockGetBy.mockResolvedValueOnce({ valid: false });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });

  it("should check inexistent token", async () => {
    mockGetBy.mockResolvedValueOnce(undefined);

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });
});

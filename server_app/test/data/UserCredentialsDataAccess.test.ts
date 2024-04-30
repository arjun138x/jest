import { DataBase } from "../../src/data/DataBase";
import { UserCredentialsDataAccess } from "../../src/data/UserCredentialsDataAccess";
import { Account } from "../../src/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../src/data/DataBase", () => {
  return {
    // calling constructor
    DataBase: jest.fn().mockImplementation(() => {
      return {
        // mock required methods
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("UserCredentialsDataAccess test suite", () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };

  const someId = "1234";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add user and return id", async () => {
    insertMock.mockResolvedValue(someId);

    const actual = await sut.addUser(someAccount);

    expect(actual).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it("should get user by id", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actual = await sut.getUserById(someId);

    expect(actual).toBe(someAccount);
    expect(getByMock).toHaveBeenCalledWith("id", someId);
  });

  it("should get user by name", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actual = await sut.getUserByUserName(someAccount.userName);

    expect(actual).toBe(someAccount);
    expect(getByMock).toHaveBeenCalledWith("userName", someAccount.userName);
  });
});

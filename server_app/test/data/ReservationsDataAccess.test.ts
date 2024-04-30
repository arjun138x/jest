import { mock } from "node:test";
import { DataBase } from "../../src/data/DataBase";
import { ReservationsDataAccess } from "../../src/data/ReservationsDataAccess";
import { Reservation } from "../../src/model/ReservationModel";
import * as IdGenerator from "../../src/data/IdGenerator";

const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockGetBy = jest.fn();
const mockGetAllElements = jest.fn();

jest.mock("../../src/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        // mock required methods
        insert: mockInsert,
        update: mockUpdate,
        delete: mockDelete,
        getBy: mockGetBy,
        getAllElements: mockGetAllElements,
      };
    }),
  };
});

describe("ReservationsDataAccess test suite", () => {
  let sut: ReservationsDataAccess;
  const someId = "1234";

  const someReservation: Reservation = {
    endDate: "someEndDate",
    startDate: "someStartDate",
    id: "",
    room: "someRoom",
    user: "someUser",
  };

  beforeEach(() => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create reservation", async () => {
    mockInsert.mockResolvedValueOnce(someId);

    const actual = await sut.createReservation(someReservation);

    expect(actual).toBe(someId);
    expect(mockInsert).toHaveBeenCalledWith(someReservation);
  });

  it("should update reservation", async () => {
    await sut.updateReservation(someId, "room", "updatedRoom");

    expect(mockUpdate).toHaveBeenCalledWith(someId, "room", "updatedRoom");
  });

  it("should delete reservation", async () => {
    await sut.deleteReservation(someId);

    expect(mockDelete).toHaveBeenCalledWith(someId);
  });

  it("should return reservation details by id", async () => {
    mockGetBy.mockResolvedValueOnce(someReservation);

    const actual = await sut.getReservation(someId);

    expect(actual).toEqual(someReservation);
    expect(mockGetBy).toHaveBeenCalledWith("id", someId);
  });

  it("should return all reservations", async () => {
    mockGetAllElements.mockResolvedValueOnce([
      someReservation,
      someReservation,
    ]);

    const actual = await sut.getAllReservations();

    expect(actual).toEqual([someReservation, someReservation]);
    expect(mockGetAllElements).toHaveBeenCalledTimes(1);
  });
});

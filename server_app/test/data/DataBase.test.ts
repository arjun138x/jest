import { DataBase } from "../../src/data/DataBase";
import * as idGenerator from "../../src/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DataBase test suite", () => {
  let sut: DataBase<someTypeWithId>;
  const fakeId = "1234";
  const fakeData1: someTypeWithId = { id: "", name: "john", color: "red" };
  const fakeData2: someTypeWithId = { id: "", name: "john", color: "red" };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(idGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return the id after insert", async () => {
    const actual = await sut.insert(fakeData1);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const id = await sut.insert(fakeData1);

    const actual = await sut.getBy("id", id);

    // console.log({ actual, fakeData });
    expect(actual).toBe(fakeData1);
  });

  it("should find all elements with the same property", async () => {
    await sut.insert(fakeData1);
    await sut.insert(fakeData2);

    const expected = [fakeData1, fakeData2];
    const actual = await sut.findAllBy("color", "red");

    expect(actual).toEqual(expected);
  });

  it("should change the color of object", async () => {
    const id = await sut.insert(fakeData1);
    const expected = "green";
    await sut.update(id, "color", expected);

    const actual = await sut.getBy("id", id);

    expect(actual.color).toBe(expected);
  });

  it("should delete object", async () => {
    const id = await sut.insert(fakeData1);
    await sut.delete(id);

    const actual = await sut.getBy("id", id);

    expect(actual).toBeUndefined();
  });

  it("should should get all elements", async () => {
    await sut.insert(fakeData1);
    await sut.insert(fakeData2);

    const expected = [fakeData1, fakeData2];
    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});

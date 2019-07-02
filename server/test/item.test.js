const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");

describe("Item", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
    console.log(mongoURI);
    connection = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true
    });

    const uriArray = mongoURI.split("/");
    const dbName = uriArray[uriArray.length - 1];
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  it("GET / should return Hello world", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello world");
  });

  describe("/item", () => {});
});

const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");
const { userData } = require("../utils/seed");

describe("User", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoURI = global.__MONGO_URI__;
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

  describe("/users/:id", () => {
    it("GET / should return all of the user's lists", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const userLists = [
        { id: "1", items: [{ id: "1", text: "Week 1", children: [] }] },
        { id: "2", items: [{ id: "2", text: "Week 2", children: [] }] }
      ];

      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(userLists);
    });

    it("POST / should create a new user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "2";
      const userLists = [
        { id: "1", items: [{ id: "1", text: "Week 1", children: [] }] },
        { id: "2", items: [{ id: "1", text: "", children: [] }] }
      ];

      // seeded userData has userLists[0], post userLists[1] to test
      const response = await request(app)
        .post(`/users/${userId}`)
        .send(userLists[1]);
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(userLists);
    });
  });

  describe.only("/users/:id/lists/:id", () => {
    it.only("PUT / should update a user's list", () => {});

    it("DELETE / should remove a user's list", () => {});
  });

  // xit("/PUT should modify a pokemon from database", async () => {
  //   const collection = db.collection("pokemons");
  //   await collection.insertMany(pokemonData);
  //   const response = await request(app)
  //     .put(`/pokemon/${id}`)
  //     .send({ "base.HP": 1 });

  //   expect(response.status).toEqual(200);
  //   expect(response.body.name.english).toEqual("Pikachu");
  //   expect(response.body.base.HP).toEqual(1);
  // });

  // xit("/DELETE should remove a pokemon from database", async () => {
  //   const collection = db.collection("pokemons");
  //   await collection.insertMany(pokemonData);
  //   const response = await request(app).delete(`/pokemon/${id}`);

  //   expect(response.status).toEqual(200);
  //   expect(response.body.name.english).toEqual("Pikachu");
  // });

  xdescribe("/users/:id/lists/:id/items/", () => {
    it("POST / should create a new list item in the user's list", () => {});

    it("PUT / should update a list item in the user's list", () => {});

    it("DELETE / should remove a list item in the user's list", () => {});
  });
});

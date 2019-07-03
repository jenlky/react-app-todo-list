const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");
const { userData, itemData } = require('../utils/seed')

describe("User", () => {
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

  describe.only("/users/:id", () => {
    it.only("GET / should return all of the user's lists", () => {
      const users = db.collection("users")
      const items = db.collection("items");
      await users.insertMany(userData);
      await items.insertMany(itemData);

      const user = { id: "2" };

      const response = await request(app).get("/pokemon");
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(pokemonData);
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
  });


  xdescribe("/users/:id/lists/:id", () => {
    it("POST / should create a new user's list", () => {});

    it("PUT / should update a user's list", () => {});

    it("DELETE / should remove a user's list", () => {})
  });

  xdescribe("/users/:id/lists/:id/items/", () => {
    it("POST / should create a new list item in the user's list", () => {});

    it("PUT / should update a list item in the user's list", () => {});

    it("DELETE / should remove a list item in the user's list", () => {})
  });
});

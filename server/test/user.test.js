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

  xdescribe("/users/:id", () => {
    it("GET / should return all of the user's lists", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const userLists = [
        {
          id: "1",
          name: "JumpStart",
          items: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "SUSS",
          items: [
            { id: "2", text: "Object Oriented Programming", children: [] }
          ]
        }
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
        {
          id: "1",
          name: "JumpStart",
          items: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "",
          items: [{ id: "1", text: "", children: [] }]
        }
      ];

      // seeded userData has userLists[0], post userLists[1] to test
      const response = await request(app)
        .post(`/users/${userId}`)
        .send(userLists[1]);
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(userLists);
    });
  });

  describe("/users/:userId/lists/:listId", () => {
    it("PUT / should update a user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "2";
      const userLists = [
        {
          id: "1",
          name: "JumpStart",
          items: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "PUT you in your place",
          items: [
            { id: "2", text: "Object Oriented Programming", children: [] }
          ]
        }
      ];

      const response = await request(app).put(
        `/users/${userId}/lists/${listId}?name=${userLists[1].name}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(userLists);
    });

    it("DELETE / should remove a user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "2";
      const listId = "1";

      const response = await request(app).delete(
        `/users/${userId}/lists/${listId}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  xdescribe("/users/:id/lists/:id/items/", () => {
    it("POST / should create a new list item in the user's list", () => {});

    it("PUT / should update a list item in the user's list", () => {});

    it("DELETE / should remove a list item in the user's list", () => {});
  });
});

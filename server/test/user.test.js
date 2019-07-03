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
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "SUSS",
          listItems: [
            { id: "2", text: "Object Oriented Programming", children: [] }
          ]
        }
      ];

      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });

    it("POST / should create a new user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "2";
      // Insert lists[1] and expect lists
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "",
          listItems: []
        }
      ];

      const response = await request(app)
        .post(`/users/${userId}`)
        .send(lists[1]);
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(lists);
    });
  });

  describe("/users/:userId/lists/:listId", () => {
    it("PUT / should update a user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "2";

      // Update lists[1].name and expect lists
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "PUT you in your place",
          listItems: [
            { id: "2", text: "Object Oriented Programming", children: [] }
          ]
        }
      ];

      const response = await request(app).put(
        `/users/${userId}/lists/${listId}?name=${lists[1].name}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });

    // is this the correct behaviour? Should I expect {}?
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

  describe("/users/:userId/lists/:listId/items/", async () => {
    it("POST / should create first child item in the user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "3";
      const listId = "1";
      // I may not need itemId because I don't really use it
      const itemId = undefined;

      // Insert lists[0].children and expect lists
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ id: "1-1", text: "", children: [] }]
        }
      ];

      const response = await request(app).post(
        `/users/${userId}/lists/${listId}/items?id=${itemId}`
      );
      // console.log("response.body", response.body);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(lists);
    });

    xit("POST / should create subsequent child item in the user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "2";
      const listId = "1";
      const itemId = undefined;

      // Insert lists[0].children[1] and expect lists
      const lists = [
        {
          id: "1",
          text: "Week 1",
          children: [
            { id: "1-1", text: "", children: [] },
            { id: "1-2", text: "", children: [] }
          ]
        }
      ];

      const response = await request(app).post(
        `/users/${userId}/lists/${listId}/items?id=${itemId}`
      );
      // console.log("response.body", response.body);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(lists);
    });

    xit("PUT / should update a list item in the user's list", async () => {});

    xit("DELETE / should remove a list item in the user's list", async () => {});
  });
});

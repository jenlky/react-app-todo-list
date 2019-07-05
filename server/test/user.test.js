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
          listItems: [{ text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "SUSS",
          listItems: [{ text: "Object Oriented Programming", children: [] }]
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
          listItems: [{ text: "Week 1", children: [] }]
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
    it("PUT / should update user's list name", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "2";

      // Update lists[1].name and expect lists
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "PUT updates list name",
          listItems: [{ text: "Object Oriented Programming", children: [] }]
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

  describe("/users/:userId/lists/:listId/items", () => {
    it("PUT / should overwrite all the items in user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "1";
      const list = {
        id: "1",
        name: "JumpStart",
        listItems: [
          {
            text: "Week 1",
            children: [
              { text: "Week 1", children: [] },
              {
                text: "Drink driving",
                children: [
                  {
                    text: "Look Ma no hands!",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      };

      const response = await request(app)
        .put(`/users/${userId}/lists/${listId}/items`)
        .send(list);
      console.log(response.body);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(list);
    });
  });
});

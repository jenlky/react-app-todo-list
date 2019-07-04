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
            { id: "1", text: "Object Oriented Programming", children: [] }
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
    it("POST / should create listItem in the user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "2";
      const listId = "1";

      // Insert lists[0].children and expect lists
      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [
            { id: "1", text: "Week 1", children: [] },
            { id: "2", text: "", children: [] }
          ]
        }
      ];

      const response = await request(app).post(
        `/users/${userId}/lists/${listId}`
      );
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(lists);
    });

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
          listItems: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "PUT updates list name",
          listItems: [
            { id: "1", text: "Object Oriented Programming", children: [] }
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

  describe("/users/:userId/lists/:listId/items/:itemId", () => {
    it("PUT / should update a listItem's text in the user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "2";
      const itemId = "1";

      // Update lists[1].name and expect lists
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
            { id: "1", text: "PUT updates listItems text", children: [] }
          ]
        }
      ];

      const response = await request(app).put(
        `/users/${userId}/lists/${listId}/items/${itemId}?text=${
          lists[1].listItems[0].text
        }`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });

    it.only("DELETE / should remove a list item in the user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const userId = "1";
      const listId = "2";
      const itemId = "1";

      const lists = [
        {
          id: "1",
          name: "JumpStart",
          listItems: [{ id: "1", text: "Week 1", children: [] }]
        },
        {
          id: "2",
          name: "SUSS",
          listItems: []
        }
      ];

      const response = await request(app).delete(
        `/users/${userId}/lists/${listId}/items/${itemId}`
      );
      // console.log(response);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });
  });
});

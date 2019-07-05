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

  describe.only("POST /signup and POST /login", () => {
    it.only("users can signup with validated name, username, email address and password", async () => {
      const users = db.collection("users");
      // await users.insertMany(userData[0]); // Eddie

      const user = {
        name: "Eddie",
        username: "EdsonElson",
        email: "eddie@gmail.com",
        password: "selamatdatang"
      };

      const response = await request(app)
        .post(`/signup`)
        .send(user);
      expect(response.status).toEqual(201);
      // expect(response.body).toMatchObject(lists);
    });

    it("users can login with validated username/email address and password", async () => {});
  });

  describe("/users/:username", () => {
    it("GET / should return all of the user's lists", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const username = "EdsonElson";
      const lists = [
        {
          id: 1,
          name: "JumpStart",
          listItems: [{ text: "Week 1", children: [] }]
        },
        {
          id: 2,
          name: "SUSS",
          listItems: [{ text: "Object Oriented Programming", children: [] }]
        }
      ];

      const response = await request(app).get(`/users/${username}`);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });

    it("POST / should create a new user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const username = "jenlky";
      // Insert lists[1] and expect lists
      const lists = [
        {
          id: 1,
          name: "JumpStart",
          listItems: [{ text: "Week 1", children: [] }]
        },
        {
          id: 2,
          name: "",
          listItems: []
        }
      ];

      const response = await request(app)
        .post(`/users/${username}`)
        .send(lists[1]);
      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject(lists);
    });
  });

  describe("/users/:username/lists/:id", () => {
    it("PUT / should update user's list name", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const username = "EdsonElson";
      const id = 2;

      // Update lists[1].name and expect lists
      const lists = [
        {
          id: 1,
          name: "JumpStart",
          listItems: [{ text: "Week 1", children: [] }]
        },
        {
          id: 2,
          name: "PUT updates list name",
          listItems: [{ text: "Object Oriented Programming", children: [] }]
        }
      ];

      const response = await request(app)
        .put(`/users/${username}/lists/${id}`)
        .send({ name: lists[1].name });
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(lists);
    });

    it("DELETE / should remove a user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const username = "jenlky";
      const listId = 1;

      const response = await request(app).delete(
        `/users/${username}/lists/${listId}`
      );
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe("/users/:username/lists/:id/items", () => {
    it("PUT / should overwrite all the items in user's list", async () => {
      const users = db.collection("users");
      await users.insertMany(userData);

      const username = "EdsonElson";
      const id = 1;
      const list = {
        id: 1,
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
        .put(`/users/${username}/lists/${id}/items`)
        .send(list);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(list.listItems);
    });
  });
});

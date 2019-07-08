const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../app");
const { userData } = require("../utils/seed");
const { verifyToken } = require("../utils/token");

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

  describe.only("POST /signup, POST /login and GET /secure", () => {
    it("users can POST /signup with validated name, username, email address and password", async () => {
      const user = {
        name: "Eddie",
        username: "EdsonElson",
        email: "eddie@gmail.com",
        password: "selamatdatang"
      };

      // I get back the token, on client side I'm supposed to set it in authorization header
      // ONLY when I interact with the endpoints/server, when I do CRUD
      const response = await request(app)
        .post("/signup")
        .send(user);
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(user.username);
    });

    it("users can POST /login with validated username and password", async () => {
      const user = {
        name: "Eddie",
        username: "EdsonElson",
        email: "eddie@gmail.com",
        password: "selamatdatang"
      };

      await request(app)
        .post("/signup")
        .send(user);

      const response = await request(app)
        .post("/login")
        .send({ username: user.username, password: user.password });
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(user.username);
    });

    xit("GET /secure checks if users have valid token before giving them access", async () => {
      // doesn't work because nodeJS does not have sessionStorage
      //   const user = {
      //     name: "Eddie",
      //     username: "EdsonElson",
      //     email: "eddie@gmail.com",
      //     password: "selamatdatang"
      //   };
      //   const signupResponse = await request(app)
      //     .post("/signup")
      //     .send(user);
      //   const jwt = signupResponse.body.jwt;
      //   if (jwt) {
      //     sessionStorage.setItem("jwt", jwt);
      //     headers.Authorization = "Bearer " + jwt;
      //   }
      //   const response = await request(app).get("/secure");
      //   console.log(response.body.username);
      //   expect(response.body.username).toEqual(user.username);
    });
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

    // error
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

const { MongoClient } = require("mongodb");
const request = require("supertest");
const app = require("../src/app");
const { userData } = require("../src/utils/seed");
const { verifyToken } = require("../src/utils/token");

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

  const eddie = {
    name: "Eddie",
    username: "EdsonElson",
    email: "eddie@gmail.com",
    password: "selamatdatang",
    lists: [
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
    ]
  };

  const jenssen = {
    name: "Jenssen",
    username: "jenlky",
    email: "jenssen.lee@gmail.com",
    password: "jumpstart",
    lists: [
      {
        id: 1,
        name: "JumpStart",
        listItems: [{ text: "Week 1", children: [] }]
      }
    ]
  };

  describe("POST /signup and POST /login", () => {
    it("users can POST /signup with validated name, username, email address and password", async () => {
      // I get back the token, on client side I'm supposed to set it in authorization header
      // ONLY when I interact with the endpoints/server, when I do CRUD
      const response = await request(app)
        .post("/signup")
        .send(eddie);
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(eddie.username);
    });

    it("users can POST /login with validated username and password", async () => {
      await request(app)
        .post("/signup")
        .send(eddie);

      const response = await request(app)
        .post("/login")
        .send({ username: eddie.username, password: eddie.password });
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(eddie.username);
    });
  });

  describe("/users/:username", () => {
    it("GET / should return all of the user's lists", async () => {
      await request(app)
        .post("/signup")
        .send(eddie);

      const loginResponse = await request(app)
        .post("/login")
        .send({ username: eddie.username, password: eddie.password });
      sessionStorage.setItem("jwt", loginResponse.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      const response = await request(app)
        .get(`/users/${eddie.username}`)
        .set("Authorization", jwt);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([]);
    });

    it("POST / should create a new user's list", async () => {
      await request(app)
        .post("/signup")
        .send(jenssen);

      const loginResponse = await request(app)
        .post("/login")
        .send({ username: jenssen.username, password: jenssen.password });
      sessionStorage.setItem("jwt", loginResponse.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      const response = await request(app)
        .post(`/users/${jenssen.username}`)
        .set("Authorization", jwt);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchObject({
        id: 1,
        name: "",
        listItems: []
      });
    });
  });

  describe("/users/:username/lists/:id", () => {
    it("PUT / should update user's list name", async () => {
      await request(app)
        .post("/signup")
        .send(eddie);

      const loginResponse = await request(app)
        .post("/login")
        .send({ username: eddie.username, password: eddie.password });
      sessionStorage.setItem("jwt", loginResponse.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${eddie.username}`)
        .set("Authorization", jwt);

      const response = await request(app)
        .put(`/users/${eddie.username}/lists/1`)
        .send({ name: "JumpStart" })
        .set("Authorization", jwt);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: 1,
        name: "JumpStart",
        listItems: []
      });
    });

    it("DELETE / should remove a user's list", async () => {
      await request(app)
        .post("/signup")
        .send(jenssen);

      const loginResponse = await request(app)
        .post("/login")
        .send({ username: jenssen.username, password: jenssen.password });
      sessionStorage.setItem("jwt", loginResponse.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${jenssen.username}`)
        .set("Authorization", jwt);

      const response = await request(app)
        .delete(`/users/${jenssen.username}/lists/1`)
        .set("Authorization", jwt);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe("/users/:username/lists/:id/items", () => {
    it("PUT / should overwrite all the items in user's list", async () => {
      await request(app)
        .post("/signup")
        .send(eddie);

      const loginResponse = await request(app)
        .post("/login")
        .send({ username: eddie.username, password: eddie.password });
      sessionStorage.setItem("jwt", loginResponse.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${eddie.username}`)
        .set("Authorization", jwt);

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
        .put(`/users/${eddie.username}/lists/1/items`)
        .send(list)
        .set("Authorization", jwt);
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(list.listItems);
    });
  });
});

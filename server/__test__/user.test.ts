import MongoClient from "mongodb";
import request from "supertest";
import app from "../src/app";

describe("User", () => {
  let connection: any;
  let db: any;

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

  afterEach(async () => {
    await db.dropDatabase();
  });

  interface urlResponse {
    status: string;
    body: [];
  }

  let eddieLogin: {};
  let jenssenLogin: {};
  beforeEach(async () => {
    await request(app)
      .post("/signup")
      .send(eddie);
    eddieLogin = await request(app)
      .post("/login")
      .send({ username: eddie.username, password: eddie.password });

    await request(app)
      .post("/signup")
      .send(jenssen);
    jenssenLogin = await request(app)
      .post("/login")
      .send({ username: jenssen.username, password: jenssen.password });
  });

  it("GET / should return Hello world", async () => {
    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello world");
  });

  const eddie = {
    name: "Eddie",
    username: "EdsonElson",
    email: "eddie@gmail.com",
    password: "selamatdatang"
  };

  const jenssen = {
    name: "Jenssen",
    username: "jenlky",
    email: "jenssen.lee@gmail.com",
    password: "jumpstart"
  };

  describe("POST /signup and POST /login", () => {
    it("users can POST /signup with validated name, username, email address and password", async () => {
      const response = await request(app)
        .post("/signup")
        .send(eddie);
      expect(response.status).toBe(201);
      expect(response.body.username).toBe(eddie.username);
    });

    it("users can POST /login with validated username and password", async () => {
      expect(eddieLogin.status).toBe(200);
      expect(eddieLogin.body.username).toBe(eddie.username);
    });
  });

  describe("/users/:username", () => {
    it("GET / should return all of the user's lists", async () => {
      sessionStorage.setItem("jwt", eddieLogin.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      const response = await request(app)
        .get(`/users/${eddie.username}`)
        .set("Authorization", jwt);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([]);
    });

    it("POST / should create a new user's list", async () => {
      sessionStorage.setItem("jwt", jenssenLogin.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      const response = await request(app)
        .post(`/users/${jenssen.username}`)
        .set("Authorization", jwt);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: 1,
        name: "",
        listItems: []
      });
    });
  });

  describe("/users/:username/lists/:id", () => {
    it("PUT / should update user's list name", async () => {
      sessionStorage.setItem("jwt", eddieLogin.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${eddie.username}`)
        .set("Authorization", jwt);

      const response = await request(app)
        .put(`/users/${eddie.username}/lists/0`)
        .send({ name: "JumpStart" })
        .set("Authorization", jwt);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: "JumpStart",
        listItems: []
      });
    });

    it("DELETE / should remove a user's list", async () => {
      sessionStorage.setItem("jwt", jenssenLogin.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${jenssen.username}`)
        .set("Authorization", jwt);

      const response = await request(app)
        .delete(`/users/${jenssen.username}/lists/0`)
        .set("Authorization", jwt);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({});
    });
  });

  describe("/users/:username/lists/:id/items", () => {
    it("PUT / should overwrite all the items in user's list", async () => {
      sessionStorage.setItem("jwt", eddieLogin.body.jwt);
      const jwt = "Bearer " + sessionStorage.getItem("jwt");

      await request(app)
        .post(`/users/${eddie.username}`)
        .set("Authorization", jwt);

      const listItems = [
        {
          id: "1-1",
          text: "Week 1",
          children: [
            { id: "1-1-1", text: "Week 1", children: [] },
            {
              id: "1-1-2",
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
      ];

      const response = await request(app)
        .put(`/users/${eddie.username}/lists/0/items`)
        .send(listItems)
        .set("Authorization", jwt);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(listItems);
    });
  });
});

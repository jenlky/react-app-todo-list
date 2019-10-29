import "./utils/db";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const cors = require("cors");
const app = express();
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

export { app };

const express = require("express");
const userRouter = express.Router();

userRouter.get("/", () => {});
userRouter.post("/", () => {});
userRouter.put("/", () => {}); // query strings for one item
userRouter.delete("/", () => {}); // query strings for one item

module.exports = userRouter;

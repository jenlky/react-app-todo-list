const express = require("express");
const itemRouter = express.Router();

itemRouter.get("/", () => {});
itemRouter.post("/", () => {});
itemRouter.get("/", () => {}); // query strings for one item
itemRouter.put("/", () => {}); // query strings for one item
itemRouter.delete("/", () => {}); // query strings for one item

module.exports = itemRouter;

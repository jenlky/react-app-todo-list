const express = require("express");
const userRouter = express.Router();
const controller = require("../controllers/user.controller");

userRouter.get("/:id", async (req, res, next) => {
  const getAllLists = await controller
    .findAllLists(req.params.id)
    .catch(err => next(err));
  res.status(200).send(getAllLists);
});

userRouter.post("/", () => {});

userRouter.put("/", () => {}); // query strings for one item

userRouter.delete("/", () => {}); // query strings for one item

module.exports = userRouter;

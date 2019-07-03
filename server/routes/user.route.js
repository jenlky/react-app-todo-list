const express = require("express");
const userRouter = express.Router();
const controller = require("../controllers/user.controller");

userRouter.get("/:id", async (req, res, next) => {
  const getAllLists = await controller
    .findAllLists(req.params.id)
    .catch(err => next(err));
  res.status(200).send(getAllLists);
});

userRouter.post("/:id", async (req, res, next) => {
  const postOneList = await controller
    .createOneList(req.params.id)
    .catch(err => next(err));
  res.status(201).send(postOneList);
});

// userRouter.use("/:id/lists");

userRouter.put("/:id/lists/:id", async (req, res, next) => {}); // query strings for one item

userRouter.delete("/:id/lists/:id", async (req, res, next) => {}); // query strings for one item

module.exports = userRouter;

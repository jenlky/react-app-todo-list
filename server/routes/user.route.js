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
  const createOneList = await controller
    .createOneList(req.params.id)
    .catch(err => next(err));
  res.status(201).send(createOneList);
});

userRouter.post("/:userId/lists/:listId", async (req, res, next) => {
  const createOneListItem = await controller
    .createOneListItem(req.params.userId, req.params.listId)
    .catch(err => next(err));
  res.status(201).send(createOneListItem);
});

userRouter.put("/:userId/lists/:listId", async (req, res, next) => {
  const updateOneList = await controller
    .updateOneList(req.params.userId, req.params.listId, req.query.name)
    .catch(err => next(err));
  res.status(200).send(updateOneList);
});

userRouter.delete("/:userId/lists/:listId", async (req, res, next) => {
  const deleteOneList = await controller
    .deleteOneList(req.params.userId, req.params.listId)
    .catch(err => next(err));
  res.status(200).send(deleteOneList);
});

userRouter.put("/:userId/lists/:listId/items", async (req, res, next) => {});

userRouter.delete("/:userId/lists/:listId/items", async (req, res, next) => {});

module.exports = userRouter;
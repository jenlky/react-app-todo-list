const express = require("express");
const userRouter = express.Router();
const controller = require("../controllers/user.controller");
const Joi = require("@hapi/joi");
const { signupSchema, loginSchema } = require("../utils/userValidation");
const { generateToken } = require("../utils/token");
const isAuthenticated = require("../utils/isAuthenticated");

userRouter.post("/signup", async (req, res, next) => {
  const { name, username, email, password } = req.body;
  try {
    Joi.validate(
      { name, username, email, password },
      signupSchema,
      (err, value) => {
        if (err) {
          throw new Error(err.message);
        }
      }
    );

    const user = await controller.createOneUser(req.body);
    const token = generateToken(user);
    res.status(201).send({
      username: user.username,
      jwt: token
    });
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    Joi.validate({ username, password }, loginSchema, (err, value) => {
      if (err) {
        throw new Error(err.message);
      }
    });

    const user = await controller.findOneUser(req.body);
    if (!user) {
      res.sendStatus(401);
    }

    const token = generateToken(user);
    res.status(200).send({
      username: user.username,
      jwt: token
    });
  } catch (err) {
    next(err);
  }
});

// it only works when I don't mount isAuthenticated
userRouter.post("/logout", (req, res, next) => {
  res.sendStatus(200);
});

userRouter.get("/users/:username", isAuthenticated, async (req, res, next) => {
  const getAllLists = await controller
    .findAllLists(req.params.username)
    .catch(err => next(err));
  res.status(200).send(getAllLists);
});

userRouter.post("/users/:username", isAuthenticated, async (req, res, next) => {
  const createOneList = await controller
    .createOneList(req.params.username)
    .catch(err => next(err));
  res.status(201).send(createOneList);
});

userRouter.put(
  "/users/:username/lists/:index",
  isAuthenticated,
  async (req, res, next) => {
    const updateOneList = await controller
      .updateOneList(req.params.username, req.params.index, req.body.name)
      .catch(err => next(err));
    res.status(200).send(updateOneList);
  }
);

userRouter.delete(
  "/users/:username/lists/:index",
  isAuthenticated,
  async (req, res, next) => {
    const deleteOneList = await controller
      .deleteOneList(req.params.username, req.params.index)
      .catch(err => next(err));
    res.status(200).send(deleteOneList);
  }
);

userRouter.put(
  "/users/:username/lists/:index/items",
  isAuthenticated,
  async (req, res, next) => {
    const overwriteListItems = await controller
      .overwriteListItems(req.params.username, req.params.index, req.body)
      .catch(err => next(err));
    res.status(200).send(overwriteListItems);
  }
);

module.exports = userRouter;

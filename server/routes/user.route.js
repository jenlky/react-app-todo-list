const express = require("express");
const userRouter = express.Router();
const controller = require("../controllers/user.controller");
const Joi = require("@hapi/joi");
const { signupSchema, loginSchema } = require("../models/userValidation");
const jwt = require("jsonwebtoken");

const generateToken = user => {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
      user: user.username
    },
    process.env.jwtSecret,
    { expiresIn: "1h" }
  );
};

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
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const user = await controller.findOneUser(req.body);
    const token = generateToken(user);
    res.status(201).send(token);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

userRouter.get("/users/:username", async (req, res, next) => {
  const getAllLists = await controller
    .findAllLists(req.params.username)
    .catch(err => next(err));
  res.status(200).send(getAllLists);
});

userRouter.post("/users/:username", async (req, res, next) => {
  const createOneList = await controller
    .createOneList(req.params.username)
    .catch(err => next(err));
  res.status(201).send(createOneList);
});

userRouter.put("/users/:username/lists/:id", async (req, res, next) => {
  const updateOneList = await controller
    .updateOneList(req.params.username, req.params.id, req.body.name)
    .catch(err => next(err));
  res.status(200).send(updateOneList);
});

userRouter.delete("/users/:username/lists/:id", async (req, res, next) => {
  const deleteOneList = await controller
    .deleteOneList(req.params.username, req.params.id)
    .catch(err => next(err));
  res.status(200).send(deleteOneList);
});

userRouter.put("/users/:username/lists/:id/items", async (req, res, next) => {
  const overwriteListItems = await controller
    .overwriteListItems(req.params.username, req.params.id, req.body)
    .catch(err => next(err));
  res.status(200).send(overwriteListItems);
});

module.exports = userRouter;

const express = require("express");
const userRouter = express.Router();
const controller = require("../controllers/user.controller");
const Joi = require("@hapi/joi");

const signupSchema = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(20)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .alphanum()
    .regex(/[a-zA-Z0-9~!@#$%^&*()]{8,30}$/)
    .required()
});

const loginSchema = Joi.object().keys({});

userRouter.post("/signup", async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    Joi.validate(
      { name, username, email, password },
      signupSchema,
      (err, value) => {
        if (err) {
          throw new Error(err);
        }
      }
    );

    const createdUser = await controller.createOneUser(req.body);
    res.status(201).send(createdUser); // send jwt token instead of user
  } catch (err) {
    next(err);
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

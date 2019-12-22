import express, { Request, Response, NextFunction } from "express";
import * as controller from "../controllers/user.controller";
import * as Joi from "@hapi/joi";
import { signupSchema, loginSchema } from "../utils/userValidation";
import { generateToken } from "../utils/token";
import isAuthenticated from "../utils/isAuthenticated";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, email, password } = req.body;
    try {
      Joi.validate(
        { name, username, email, password },
        signupSchema,
        (err: Error, value: string) => {
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
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
      Joi.validate(
        { username, password },
        loginSchema,
        (err: Error, value: string) => {
          if (err) {
            throw new Error(err.message);
          }
        }
      );

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
  }
);

// it only works when I don't mount isAuthenticated
userRouter.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  }
);

userRouter.get(
  "/users/:username",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllLists = await controller
      .findAllLists(req.params.username)
      .catch(err => next(err));
    res.status(200).send(getAllLists);
  }
);

userRouter.post(
  "/users/:username",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const createOneList = await controller
      .createOneList(req.params.username)
      .catch(err => next(err));
    res.status(201).send(createOneList);
  }
);

userRouter.put(
  "/users/:username/lists/:index",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const updateOneList = await controller
      .updateOneList(req.params.username, req.params.index, req.body.name)
      .catch(err => next(err));
    res.status(200).send(updateOneList);
  }
);

userRouter.delete(
  "/users/:username/lists/:index",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const deleteOneList = await controller
      .deleteOneList(req.params.username, req.params.index)
      .catch(err => next(err));
    res.status(200).send(deleteOneList);
  }
);

userRouter.put(
  "/users/:username/lists/:index/items",
  isAuthenticated,
  async (req: Request, res: Response, next: NextFunction) => {
    const overwriteListItems = await controller
      .overwriteListItems(req.params.username, req.params.index, req.body)
      .catch(err => next(err));
    res.status(200).send(overwriteListItems);
  }
);

export default userRouter;

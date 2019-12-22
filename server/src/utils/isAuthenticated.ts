import * as controller from "../controllers/user.controller";
import { verifyToken } from "../utils/token";
import { Request, Response, NextFunction } from "express";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1];
    if (token) {
      const payload = verifyToken(token);
      const foundUser = await controller.checkPayload(payload.user);
      if (foundUser) {
        next();
      } else {
        throw new Error("User cannot be found");
      }
    }
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;

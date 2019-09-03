const controller = require("../controllers/user.controller");
const { verifyToken } = require("../utils/token");

const isAuthenticated = async (req, res, next) => {
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

module.exports = isAuthenticated;

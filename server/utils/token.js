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

const verifyToken = token => {
  return jwt.verify(token, process.env.jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken
};

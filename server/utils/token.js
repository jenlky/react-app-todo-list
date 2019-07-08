const jwt = require("jsonwebtoken");

const generateToken = user => {
  return jwt.sign(
    {
      sub: user._id,
      iat: new Date().getTime(),
      user: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};

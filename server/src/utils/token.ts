import jwt from "jsonwebtoken";

interface User {
  _id: string;
  username: string;
}

const generateToken = (user: User) => {
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

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };

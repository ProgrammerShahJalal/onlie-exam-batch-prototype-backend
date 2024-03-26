const jwt = require("jsonwebtoken");

const createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token, secret) => {
  try {
    const isVerified = jwt.verify(token, secret);
    return isVerified;
  } catch (error) {
    throw new Error("Invalid token!");
  }
};

module.exports = {
  createToken,
  verifyToken,
};

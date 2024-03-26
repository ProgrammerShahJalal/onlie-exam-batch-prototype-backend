const { createToken } = require("../../helpers/jwtHelpers");
const User = require("./UserModel");

const generateRegistrationNumber = async () => {
  try {
    const lastUser = await User.findOne(
      {},
      { registration_no: 1 },
      { sort: { registration_no: -1 } }
    );
    const maxRegistrationNumber = lastUser
      ? parseInt(lastUser?.registration_no)
      : 0;

    const nextRegistrationNumber = maxRegistrationNumber + 1;

    const paddedRegistrationNumber = String(nextRegistrationNumber).padStart(
      7,
      "0"
    );

    return { registration_no: paddedRegistrationNumber };
  } catch (error) {
    return { error: "Error  generating Registration Number" };
  }
};

const createTokenRefreshTokenForUser = async (user) => {
  // creating payload for token
  const payload = {
    name: user?.name,
    userId: user._id,
    email: user.email,
  };

  // creating access token
  const accessToken = createToken(
    payload,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  );

  // creating refresh token
  const refreshToken = createToken(
    payload,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES_IN
  );

  return { accessToken, refreshToken };
};

module.exports = {
  createTokenRefreshTokenForUser,
  generateRegistrationNumber,
};

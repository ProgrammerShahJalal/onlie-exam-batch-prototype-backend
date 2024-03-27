const { Router } = require("express");
const bcrypt = require("bcrypt");
const {
  createTokenRefreshTokenForUser,
  generateRegistrationNumber,
} = require("./UserUtills");
const User = require("./UserModel");

const router = Router();

/*------------------------------------ register route ----------------------------------------*/
router.post("/register", async (req, res) => {
  const { name, contact_no, password } = req.body;

  try {
    // Generate a salt synchronously
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hash the password synchronously
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { registration_no, error } = await generateRegistrationNumber();
    if (error) {
      return res
        .status(409)
        .json({ message: "Error generating Registration Number" });
    }

    // creating user
    const user = await User.create({
      name,
      contact_no,
      registration_no,
      role: "student",
      password: hashedPassword,
    });

    // creating access token and refresh token
    const { accessToken, refreshToken } = await createTokenRefreshTokenForUser(
      user
    );

    // extracting data without password, and returning
    const {
      password: createdPass,
      __v,
      ...dataWithoutPassword
    } = user.toObject();

    const responseToSend = {
      user: dataWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.json(responseToSend);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create admin
router.post("/register-teacher", async (req, res) => {
  const { name, contact_no, password } = req.body;

  try {
    // Generate a salt synchronously
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const salt = bcrypt.genSaltSync(saltRounds);

    // Hash the password synchronously
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { registration_no, error } = await generateRegistrationNumber();
    if (error) {
      return res
        .status(409)
        .json({ message: "Error generating Registration Number" });
    }

    // creating user
    const user = await User.create({
      name,
      contact_no,
      registration_no,
      role: "teacher",
      password: hashedPassword,
    });

    // creating access token and refresh token
    const { accessToken, refreshToken } = await createTokenRefreshTokenForUser(
      user
    );

    // extracting data without password, and returning
    const {
      password: createdPass,
      __v,
      ...dataWithoutPassword
    } = user.toObject();

    const responseToSend = {
      user: dataWithoutPassword,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.json(responseToSend);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*------------------------------ login route ------------------------------------------------*/
router.post("/login", async (req, res) => {
  const { registration_no, password } = req.body;

  try {
    const requestedUser = await User.findOne({ registration_no });

    if (!requestedUser) {
      return res.status(400).send({ error: "User not found" });
    }

    // compare password
    const isPasswordMatched = bcrypt.compareSync(
      password,
      requestedUser?.password
    );

    if (!isPasswordMatched) {
      return res.status(200).send({ error: "Invalid credentials!" });
    }

    // creating access token and refresh token
    const { accessToken, refreshToken } = await createTokenRefreshTokenForUser(
      requestedUser
    );

    // sending response
    const responseToSend = {
      isPasswordMatched,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    res.json(responseToSend);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find({}).select(
    "-password -createdAt -updatedAt -__v"
  );
  res.json(users);
});

router.get("/registration-no/:registration_no", async (req, res) => {
  const registration_no = req.params.registration_no;

  try {
    const user = await User.findOne({ registration_no }).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res.status(200).json({ error: "User not found!" });
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.deleteOne({ _id: userId }).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
});

module.exports = router;

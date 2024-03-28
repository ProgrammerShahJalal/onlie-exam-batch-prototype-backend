const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const userRouter = require("./api/user/UserControllerService");

// load environment variables from .env file
config();

// create an express app
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  `${process.env.FRONTEND_SITE_URL}`,
];

// middlewares
app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", userRouter);

module.exports = app;

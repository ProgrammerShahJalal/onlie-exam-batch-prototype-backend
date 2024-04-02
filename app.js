const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const userRouter = require("./api/user/UserControllerService");
const examRouter = require("./api/exam/ExamControllerService");
const questionRouter = require("./api/question/QuestionControllerService");

// load environment variables from .env file
config();

// create an express app
const app = express();

const allowedOrigins = [
  // "http://localhost:5173",
  `${process.env.FRONTEND_SITE_URL}`,
];

// middlewares
app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/questions", questionRouter);

module.exports = app;

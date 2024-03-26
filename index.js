const { config } = require("dotenv");
const { default: mongoose } = require("mongoose");
const app = require("./app");

// load environment variables from .env file
config();

// defining the port to run the app
const port = process.env.PORT || 5000;

async function run() {
  try {
    // connect to db
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(console.log("Database connected successfully!"));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

run().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
});

app.get("/", (req, res) => {
  res.send("Prototype server is up and runnning  🚀");
});

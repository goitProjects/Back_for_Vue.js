const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const { DB_HOST, PORT } = process.env;

async function start() {
  try {
    await mongoose.connect(DB_HOST);

    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: ", PORT);
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

start();
// some comment for commit and run buildAndDeploy action

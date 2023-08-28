const app = require("./app");
// This is used to give the configuration added inside config.env file
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config path
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
connectDatabase();

// creating the server on Port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection => e.g. server url (DB_URI) of config.env file is wrong
process.on("unhandledRejection", (err) => {
  console.log("err", err.message);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

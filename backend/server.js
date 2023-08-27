const app = require("./app");
// This is used to give the configuration added inside config.env file
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config path
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
connectDatabase();

// creating the server on Port
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

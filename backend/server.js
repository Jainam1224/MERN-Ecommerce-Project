const app = require("./app");
// This is used to give the configuration added inside config.env file
const dotenv = require("dotenv");

// config path
dotenv.config({ path: "backend/config/config.env" });

// creating the server on Port
app.listen(process.env.PORT, () => {
  console.log(`Server is working on https://localhost:${process.env.PORT}`);
});

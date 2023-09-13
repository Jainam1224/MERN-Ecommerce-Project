const app = require("./app");
// The Cloudinary Node SDK allows you to quickly and easily integrate your application with Cloudinary.
// Effortlessly optimize, transform, upload and manage your cloud's assets.
const cloudinary = require("cloudinary");
// This is used to give the configuration added inside config.env file
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// uncaught Exception => e.g. if we are not able to find any field i.e. just uncomment console.log(youtube) in this file
process.on("uncaughtException", (err) => {
  console.log("err=>", err.message);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

// config path
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
connectDatabase();

// creating the server on Port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// console.log(youtube);

// Unhandled Promise Rejection => e.g. server url (DB_URI) of config.env file is wrong
process.on("unhandledRejection", (err) => {
  console.log("err=>", err.message);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

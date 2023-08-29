const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

// This is used to read the json objects and this is also called a middleware
app.use(express.json());

// Routes imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware For Error
app.use(errorMiddleware);

module.exports = app;

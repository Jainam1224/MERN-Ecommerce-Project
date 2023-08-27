const express = require("express");
const app = express();

// This is used to read the json objects and this is also called a middleware
app.use(express.json());

// Routes imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

module.exports = app;

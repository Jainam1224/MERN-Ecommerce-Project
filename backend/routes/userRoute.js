const express = require("express");
const { registerUser } = require("../controllers/userController");

// Getting router functionalities from express server
const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;

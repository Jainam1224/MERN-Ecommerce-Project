const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

// Getting router functionalities from express server
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;

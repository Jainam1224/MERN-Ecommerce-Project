const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/userController");

// Getting router functionalities from express server
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample id",
      url: "profilePicURL",
    },
  });

  const token = user.getJWTToken(); // This token is needed to make the user auto-login

  res.status(201).json({
    success: true,
    token,
    user,
  });
});

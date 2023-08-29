const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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

  // This logic is refactored and sent to jwtToken.js
  //   const token = user.getJWTToken(); // This token is needed to make the user auto-login

  //   res.status(201).json({
  //     success: true,
  //     token,
  //     user,
  //   });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user has given both email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // This logic is refactored and sent to jwtToken.js
  //   const token = user.getJWTToken(); // This token is needed to make the user auto-login

  //   res.status(200).json({
  //     success: true,
  //     token,
  //     user,
  //   });

  sendToken(user, 200, res);
});

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id); // We already stored the user in req while checking isAuthenticatedUser

  next();
});

// ...roles means it will convert the data into an array[]
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // we have passed roles to this function for particular API but if req.body.role is "user", then he won't be able to access and error will be thrown.
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access the resource`,
          403
        )
      );
    }

    next();
  };
};

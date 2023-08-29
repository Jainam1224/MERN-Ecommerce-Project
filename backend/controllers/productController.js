const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  // new search apiFeature
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search() // searching product by name
    .filter(); // filtering product by category
  const products = await apiFeature.query; // accessing the class

  // older way
  // const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Get single Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // next is a Callback argument to the middleware function which is used to send error if product not found
    return next(new ErrorHandler("Product not found", 404));

    //  Older Approach
    // return res.status(500).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product - Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // next is a Callback argument to the middleware function which is used to send error if product not found
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    // next is a Callback argument to the middleware function which is used to send error if product not found
    return next(new ErrorHandler("Product not found", 404));
  }

  // We can use deleteOne() or deleteMany() to delete the product from database
  // But, as we are using id it will be unique for all products so used deleteOne()
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

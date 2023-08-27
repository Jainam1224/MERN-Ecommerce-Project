const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/productController");

// Getting router functionalities from express server
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);

module.exports = router;

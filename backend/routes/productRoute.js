const express = require("express");
const { getAllProducts } = require("../controllers/productController");

// Getting router functionalities from express server
const router = express.Router();

router.route("/products").get(getAllProducts);

module.exports = router;

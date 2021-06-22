import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// Fetch all products from db
// route: GET api/products
const getProducts = asyncHandler(async(req,res) => {
  const products = await Product.find({});
  res.json(products);
});


// Fetch a product from db
// route: GET api/product/:id
const getProductById = asyncHandler(async(req,res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export { getProducts, getProductById } 
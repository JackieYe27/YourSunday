import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Fetch all products from db
// route: GET api/products
router.route("/").get(getProducts);

// Fetch a product from db
// route: GET api/product/:id
router.route("/:id").get(getProductById)

export default router;
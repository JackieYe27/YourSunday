import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


// Fetch all products from db
// route: GET api/products
const getProducts = asyncHandler(async(req,res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;


  const keyword = req.query.keyword ? {
          name: {
            $regex: req.query.keyword,
            $options: "i"
          }
    } : {}

    const keyword2 = req.query.keyword ? {
          category: {
            $regex: req.query.keyword,
            $options: "i"
          }
    }: {}

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ $or: [{ ...keyword }, { ...keyword2 }] }).limit(pageSize).skip(pageSize * (page-1));
  res.json({ products, page, pages:Math.ceil(count / pageSize) });
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

// Delete a product
// route: DELETE /api/products/:id
const deleteProduct = asyncHandler(async(req,res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." })
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// Create a product
// route: POST /api/products
const createProduct = asyncHandler(async(req,res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image:"/images/sample.jpg",
    brand: "sample brand",
    category:{mainCategory: "Main", subCategory: "sub"},
    countInStock: 0,
    numReviews: 0,
    description: "Sample description"
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product
// route: PUT /api/products/:id
const updateProduct = asyncHandler(async(req,res) => {
  const {name, price, description, image, brand, mainCategory, subCategory, countInStock} = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.category.mainCategory = mainCategory;
    product.category.subCategory = subCategory;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.")
  }
});

// Create new review
// route: POST /api/products/:id/reviews
const createProductReview = asyncHandler(async(req,res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed.")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc,0)/ product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found.")
  }
});

// Get tip rated products
// route: GET /api/products/top
const getTopProducts = asyncHandler(async(req,res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

// Get products by category
// route: GET /api/products/:category
const getCategoryProducts = asyncHandler(async(req,res) => {
  const products = await Product.find({"category.mainCategory": req.params.category});
  console.log(products);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});


export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts, getCategoryProducts } 
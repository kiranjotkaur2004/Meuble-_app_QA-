import express from "express";
import { isAdmin, requiresignin } from "../middlewares/authMiddlewares.js";
import {
  createproductController,
  deleteproductController,
  filterproductController,
  getproductController,
  getsingleproductController,
  productcountController,
  productListController,
  productphotoController,
  searchproductcontroller,
  updateproductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";
import Product from "../models/productModel.js"; 

const router = express.Router();

// Create Product
router.post(
  "/create-product",
  requiresignin,
  isAdmin,
  ExpressFormidable(),
  createproductController
);

// Update Product
router.put(
  "/update-product/:pid",
  requiresignin,
  isAdmin,
  ExpressFormidable(),
  updateproductController
);

// Get All Products
router.get("/get-product", getproductController);

// Get Single Product by Slug
router.get("/get-product/:slug", getsingleproductController);

// Get Product Photo
router.get("/product-photo/:pid", productphotoController);

// Delete Product
router.delete("/delete-product/:pid", deleteproductController);

// Filter Products
router.post("/product-filters", filterproductController);

// Count Products
router.get("/product-count", productcountController);

// Product Pagination
router.get(`/product-list/:page`, productListController);

// Search Products
router.get("/search/:keywords", searchproductcontroller);

router.get("/similar-products/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const products = await Product.find({ category: categoryId }).limit(4);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

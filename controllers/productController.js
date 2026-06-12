import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// Create Product
export const createproductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!description)
      return res.status(400).json({ error: "Description is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });
    if (!quantity)
      return res.status(400).json({ error: "Quantity is required" });
    if (!category)
      return res.status(400).json({ error: "Category is required" });
    if (photo && photo.size > 1024 * 1024)
      return res.status(400).json({ error: "Photo should be less than 1MB" });

    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating product", error });
  }
};

// Get All Products
export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All products",
      total: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting products", error });
  }
};

// Get Single Product
export const getsingleproductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Single product", product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting product", error });
  }
};

// Get Product Photo
export const productphotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product?.photo?.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Photo not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error getting photo", error });
  }
};

// Delete Product
export const deleteproductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(req.params.pid);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting product", error });
  }
};

// Update Product
export const updateproductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files || {}; // Ensure photo exists before accessing

    // Validation
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!description)
      return res.status(400).json({ error: "Description is required" });
    if (!price) return res.status(400).json({ error: "Price is required" });
    if (!quantity)
      return res.status(400).json({ error: "Quantity is required" });
    if (!category)
      return res.status(400).json({ error: "Category is required" });

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating product", error });
  }
};

// Filter Products
export const filterproductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let filters = {};

    // Filter by category
    if (checked?.length > 0) {
      filters.category = { $in: checked }; 
    }

    // Filter by price range
    if (radio?.length === 2) {
      filters.price = { $gte: radio[0], $lte: radio[1] };
    }

    // Fetch filtered products
    const products = await productModel
      .find(filters)
      .populate("category")
      .select("-photo");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({
      success: false,
      message: "Error filtering products",
      error: error.message,
    });
  }
};

// Product Count
export const productcountController = async (req, res) => {
  try {
    const total = await productModel.estimatedDocumentCount();
    res.status(200).json({ success: true, total });
  } catch (error) {
    console.error("Error in product count", error);
    res
      .status(500)
      .json({ success: false, message: "Error in counting products", error });
  }
};

// Product List Based on Page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? Number(req.params.page) : 1;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in product list pagination",
      error,
    });
  }
};

// Search Product
export const searchproductcontroller = async (req, res) => {
  try {
    const { keywords } = req.params;
    const products = await productModel.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Error in search", error });
  }
};
//similar
export const getSimilarProducts = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const products = await Product.find({ category: categoryId }).limit(6);

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

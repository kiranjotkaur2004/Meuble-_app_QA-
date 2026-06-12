import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: `Name is required`,
      });
    }
    const existc = await categoryModel.findOne({ name });
    if (existc) {
      return res.status(200).send({
        success: true,
        message: `Category Already Exists`,
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: `new category created`, category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in category`,
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { name: true }
    );
    res.status(200).send({
      success: true,
      category,
      message: `Successfully updating`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: `Error in updating`,
    });
  }
};

//get all categories
export const CategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    res.status(200).json({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.error("Error in getAllCategoriesController:", error);
    res.status(500).json({
      success: false,
      message: "Error in getting categories",
      error: error.message,
    });
  }
};

//single category

export const singleCategoryController = async (req, res) => {
  try {
    console.log("Requested Slug:", req.params.slug);

    const category = await categoryModel.findOne({ slug: req.params.slug });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category found",
      category,
    });
  } catch (error) {
    console.error("Error in getCategoryBySlugController:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching category",
      error: error.message,
    });
  }
};

//delete Category Controller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: `Delete Category Succesfully`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: `Error in deleting`,
    });
  }
};

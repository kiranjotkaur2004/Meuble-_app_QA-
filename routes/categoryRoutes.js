import express from "express";
import {
  CategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requiresignin } from "../middlewares/authMiddlewares.js";
//router object
const router = express.Router();

//routing: post method
//create category
router.post(
  "/create-category",
  requiresignin,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requiresignin,
  isAdmin,
  updateCategoryController
);

//getAll category
router.get("/get-category", CategoryController);
//single category
router.get("/single-category/:slug", singleCategoryController);
//delete category
router.delete(
  "/delete-category/:id",
  requiresignin,
  isAdmin,
  deleteCategoryController
);

export default router;

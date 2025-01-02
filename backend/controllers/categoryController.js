import asyncHandler from "express-async-handler";
import Post from "../models/Post/Post.js";
import Category from "../models/Category/Category.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, description } = req.body;

  //check if category exists
  const categoryExists = await Category.findOne({ categoryName });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  //create the category
  const category = await Category.create({
    categoryName,
    description,
    auther: req.user,
  });
  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("posts");
  res.json({
    status: "success",
    message: "Categories fetched successfully",
    categories,
  });
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate("posts");
  res.json({
    status: "success",
    message: "Category fetched successfully",
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Category deleted successfully",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  const categoryUpdated = await Category.findByIdAndUpdate(
    category,
    {
      categoryName: req.body.categoryName,
      description: req.body.description,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Category updated successfully",
    category: categoryUpdated,
  });
});

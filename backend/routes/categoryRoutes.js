import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/create", isAuthenticated, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.delete("/:id", isAuthenticated, deleteCategory);
router.put("/:id", isAuthenticated, updateCategory);

export default router;

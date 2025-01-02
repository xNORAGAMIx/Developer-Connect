import express from "express";
import {
  createPosts,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { storage } from "../utils/fileUpload.js";
import multer from "multer";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

// Create multer instance
const upload = multer({ storage });

const router = express.Router();

router.post("/create", isAuthenticated, upload.single("image"), createPosts);
router.get("/", getPosts);
router.put("/:postId", isAuthenticated, updatePost);
router.get("/:postId", getPostById);
router.delete("/:postId", isAuthenticated, deletePost);

export default router;

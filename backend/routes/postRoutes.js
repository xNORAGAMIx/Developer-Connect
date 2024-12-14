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

// Create multer instance
const upload = multer({ storage });

const router = express.Router();

router.post("/create", upload.single("image"), createPosts);
router.get("/", getPosts);
router.put("/:postId", updatePost);
router.get("/:postId", getPostById);
router.delete("/:postId", deletePost);

export default router;

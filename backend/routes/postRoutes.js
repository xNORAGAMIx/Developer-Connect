import express from "express";
import {
  createPosts,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPosts);
router.get("/", getPosts);
router.put("/:postId", updatePost);
router.get("/:postId", getPostById);
router.delete("/:postId", deletePost); 

export default router;

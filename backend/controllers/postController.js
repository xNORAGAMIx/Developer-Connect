import Post from "../models/Post/Post.js";
import asyncHandler from "express-async-handler";

//Create posts
export const createPosts = asyncHandler(async (req, res) => {
  //get the data from the request body
  const postData = req.body;
  const postCreated = await Post.create(postData);
  res.json({
    status: "success",
    message: "Post created successfully",
    postCreated,
  });
});

//Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json({
    status: "success",
    message: "Posts fetched successfully",
    posts,
  });
});

//Update Post
export const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const postFound = await Post.findById(postId);
  //post not found
  if (!postFound) {
    throw new Error("Post not found");
  }
  const postUpdated = await Post.findByIdAndUpdate(
    postId,
    { title: req.body.title, description: req.body.description },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Post updated successfully",
    postUpdated,
  });
});

//Get Post by id
export const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const postFound = await Post.findById(postId);
  //post not found
  if (!postFound) {
    throw new Error("Post not found");
  }
  res.json({
    status: "success",
    message: "Post found successfully",
    postFound,
  });
});

//Delete post
export const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const postFound = await Post.findById(postId);
  //post not found
  if (!postFound) {
    throw new Error("Post not found");
  }
  await Post.findByIdAndDelete(postId);
  res.json({
    status: "success",
    message: "Post deleted successfully",
  });
});

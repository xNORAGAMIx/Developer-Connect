import Post from "../models/Post/Post.js";
import User from "../models/User/User.js";
import Category from "../models/Category/Category.js";
import asyncHandler from "express-async-handler";

//Create posts
export const createPosts = asyncHandler(async (req, res) => {
  //get the data from the request body
  const { description, category } = req.body;
  //find the category
  const categoryFound = await Category.findById(category);
  if (!categoryFound) {
    throw new Error("Category not found");
  }
  //find the user
  const userFound = await User.findById(req.user);
  if (!userFound) {
    throw new Error("User not found");
  }
  const postCreated = await Post.create({
    description,
    image: req.file,
    author: req.user,
    category,
  });

  // push the post to category
  categoryFound.posts.push(postCreated?._id);
  //resave the category
  await categoryFound.save();
  // push the post to user
  userFound.posts.push(postCreated?._id);
  //resave the user
  await userFound.save();
  res.json({
    status: "success",
    message: "Post created successfully",
    postCreated,
  });
});

//Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const { category, description, page = 1, limit = 10 } = req.query;
  //basic filter
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (description) {
    filter.description = { $regex: description, $options: "i" }; //case insensitive
  }
  //paginate
  const posts = await Post.find(filter)
    .populate("category")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  //total count of posts based on filtering
  const totalPosts = await Post.countDocuments(filter);
  res.json({
    status: "success",
    message: "Posts fetched successfully",
    posts,
    currentPage: page,
    perPage: limit,
    totalPages: Math.ceil(totalPosts / limit),
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

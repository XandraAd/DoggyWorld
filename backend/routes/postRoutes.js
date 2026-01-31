import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// Create a post
router.post("/", createPost);

// Get all posts
router.get("/", getPosts);

// Get one post by ID
router.get("/:id", getPostById);

// Update a post
router.put("/:id", updatePost);

// Delete a post
router.delete("/:id", deletePost);

export default router;

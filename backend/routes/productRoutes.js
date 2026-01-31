import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create a new product (with image upload)
router.post("/", upload.single("image"), createProduct);

// Get all products
router.get("/", getProducts);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product by ID (with optional image upload)
router.put("/:id", upload.single("image"), updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

// Update only product image
router.patch("/:id/image", upload.single("image"), updateProductImage);

export default router;
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Helper function for Cloudinary upload
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "doggyworld/products" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Create new product
    const newProduct = new Product({
      ...req.body,
      image: result.secure_url,
      imagePublicId: result.public_id
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ 
      message: error.message || "Failed to create product" 
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let updateData = { ...req.body };
    
    // Find existing product to get current image public_id
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If new image is provided, upload to Cloudinary and delete old image
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
      updateData.imagePublicId = result.public_id;

      // Delete old image from Cloudinary if it exists
      if (existingProduct.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingProduct.imagePublicId);
        } catch (cloudinaryError) {
          console.warn("Failed to delete old image from Cloudinary:", cloudinaryError);
        }
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find product first to get image public_id
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary if it exists
    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (cloudinaryError) {
        console.warn("Failed to delete image from Cloudinary:", cloudinaryError);
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(productId);
    
    res.status(200).json({ 
      message: "Product deleted successfully",
      deletedProduct: product 
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Update only product image
export const updateProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const productId = req.params.id;
    
    // Find existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Upload new image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Delete old image from Cloudinary if it exists
    if (existingProduct.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(existingProduct.imagePublicId);
      } catch (cloudinaryError) {
        console.warn("Failed to delete old image from Cloudinary:", cloudinaryError);
      }
    }

    // Update only the image fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        image: result.secure_url,
        imagePublicId: result.public_id
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product image:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    res.status(400).json({ message: error.message });
  }
};
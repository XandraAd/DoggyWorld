import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    breedGroup: { type: String },
    temperament: { type: String },
    lifeSpan: { type: String },
    imagePublicId: { type: String }, // To store Cloudinary public_id for image management
    energyLevel: { type: String },
   
    goodWith: { type: [String] }, // Array of strings
    friendliness: { type: Number },
    shedding :{ type: Number },
    trainability: { type: Number },
    protectiveness: { type: Number },
    barkingLevel: { type: Number }, 
    exerciseNeeds: { type: Number },
    groomingNeeds: { type: Number },
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;


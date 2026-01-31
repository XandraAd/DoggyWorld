import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String },
    userContact: { type: Number},
    message: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionSchema);
export default AdoptionRequest;

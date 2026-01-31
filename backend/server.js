import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import postRoutes from "./routes/postRoutes.js" ;
import adminRoutes from "./routes/adminRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";


dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/adoptions", adoptionRoutes);

const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";    

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   


}).then(() => {
    console.log("Connected to MongoDB");    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

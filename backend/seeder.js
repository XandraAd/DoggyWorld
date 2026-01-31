import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({ email: "ewuramaaddo@yahoo.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    const admin = await Admin.create({
      name: "Super Admin",
      email: "ewuramaaddo@yahoo.com",
      password: "Admin123!", // change later for security
    });

    console.log("🎉 Admin created successfully:", admin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();

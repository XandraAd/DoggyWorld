import express from "express";
import {
  loginAdmin,
  registerAdmin,
  requestPasswordReset,
  resetPasswordWithToken,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.post("/forgot-password", requestPasswordReset);
router.put("/reset-password/:token", resetPasswordWithToken);

export default router;


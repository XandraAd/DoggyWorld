import express from "express";
import {
  createAdoptionRequest,
  getAdoptionRequests,
  updateAdoptionStatus,
  deleteAdoptionRequest,
} from "../controllers/adoptionController.js";

const router = express.Router();

// @desc    Create a new adoption request (public or logged-in user)
router.post("/", createAdoptionRequest);

// @desc    Get all adoption requests (admin)
router.get("/", getAdoptionRequests);

// @desc    Update adoption request status (admin)
router.put("/:id", updateAdoptionStatus);

// @desc    Delete adoption request (admin)
router.delete("/:id", deleteAdoptionRequest);

export default router;

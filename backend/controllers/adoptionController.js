import AdoptionRequest from "../models/adoptionModel.js";
import nodemailer from "nodemailer";

// Create a new adoption request
export const createAdoptionRequest = async (req, res) => {
  console.log("📩 Received adoption request:", req.body);

  try {
    const { productId, productName, userEmail, userName, userContact, message } = req.body;

    // Validate required fields
    if (!productId || !productName || !userEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create adoption request document
    const adoption = await AdoptionRequest.create({
      productId,
      productName,
      userEmail,
      userName,
      userContact,
      message,
    });

    // ✅ Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this if using another provider
      auth: {
        user: process.env.ADMIN_EMAIL, // Admin email
        pass: process.env.ADMIN_EMAIL_PASSWORD, // App password from .env
      },
    });

    // ✅ Compose email to admin
    const mailOptions = {
      from: `"DoggyWorld" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🐾 New Adoption Request: ${productName}`,
      html: `
        <h2>🐶 New Adoption Request</h2>
        <p><strong>Pet:</strong> ${productName}</p>
        <p><strong>Requested by:</strong> ${userName || "Unknown"} (${userEmail})</p>
        ${userContact ? `<p><strong>Contact:</strong> ${userContact}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <hr/>
        <p>Login to your admin dashboard to view and respond to this request.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("📨 Admin notified via email");

    // Respond to client
    res.status(201).json({
      message: "Adoption request created and admin notified.",
      adoption,
    });
  } catch (error) {
    console.error("❌ Error creating adoption request:", error.message);
    res.status(500).json({
      message: "Server error while creating adoption request.",
      error: error.message,
    });
  }
};

// Get all adoption requests (admin)
export const getAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update adoption request status (admin)
export const updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await AdoptionRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    request.status = status || request.status;
    const updatedRequest = await request.save();

    res.json({ message: "Adoption request updated", updatedRequest });
  } catch (error) {
    console.error("Error updating adoption request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an adoption request (admin)
export const deleteAdoptionRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AdoptionRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Adoption request not found" });
    }

    await request.deleteOne();
    res.json({ message: "Adoption request deleted" });
  } catch (error) {
    console.error("Error deleting adoption request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

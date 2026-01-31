import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const generateToken = (id, expiresIn = "30d") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

export const loginAdmin = async (req, res) => {
  try {
    console.log("[loginAdmin] body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const match = await admin.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    res.json({ _id: admin._id, email: admin.email, token: generateToken(admin._id) });
  } catch (err) {
    console.error("[loginAdmin] error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    console.log("[registerAdmin] body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ email, password });
    if (!admin) return res.status(400).json({ message: "Invalid admin data" });

    res.status(201).json({ _id: admin._id, email: admin.email, token: generateToken(admin._id) });
  } catch (err) {
    console.error("[registerAdmin] error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const createTransporter = async () => {
  // Prefer real SMTP credentials (Gmail app password or other SMTP).
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL_PASSWORD) {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });
  }

  // Fallback: Ethereal test account (useful for local dev)
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

export const requestPasswordReset = async (req, res) => {
  try {
    console.log("[requestPasswordReset] body:", req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const resetToken = generateToken(admin._id, "15m");
    const resetLink = `${process.env.CLIENT_URL?.replace(/\/$/, "") || "http://localhost:5173"}/admin/reset-password/${resetToken}`;

    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Admin Panel" <${process.env.ADMIN_EMAIL || "no-reply@example.com"}>`,
      to: email,
      subject: "Admin Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>Password Reset</h3>
          <p>Click below to reset your password (expires in 15 minutes):</p>
          <a href="${resetLink}" style="display:inline-block;padding:8px 14px;background:#1976d2;color:white;border-radius:6px;text-decoration:none;">Reset Password</a>
          <p style="font-size:12px;color:#666;margin-top:10px;">If you didn't request this, ignore it.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[requestPasswordReset] email sent info:", info);

    // If using Ethereal, return preview URL for dev convenience
    if (nodemailer.getTestMessageUrl && info && info.messageId) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("[requestPasswordReset] previewUrl:", previewUrl);
      return res.json({ message: "Password reset email sent (dev)", previewUrl });
    }

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("[requestPasswordReset] error:", err);
    res.status(500).json({ message: "Failed to send reset email" });
  }
};

export const resetPasswordWithToken = async (req, res) => {
  try {
    console.log("[resetPasswordWithToken] params:", req.params, "body:", req.body);
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });
    if (!newPassword) return res.status(400).json({ message: "New password required" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (verr) {
      console.error("[resetPasswordWithToken] token verify error:", verr);
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("[resetPasswordWithToken] error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [resetForm, setResetForm] = useState({ email: "", newPassword: "" });
  const [isResetMode, setIsResetMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isResetMode)
      setResetForm((prev) => ({ ...prev, [name]: value }));
    else
      setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      setMessage("Login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await axios.put("http://localhost:5000/api/admin/reset-password", resetForm);
      setMessage("Password reset successful! You can now log in.");
      setIsResetMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {isResetMode ? "Reset Admin Password" : "Admin Login"}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}

        <Box
          component="form"
          onSubmit={isResetMode ? handlePasswordReset : handleLogin}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Email"
            name="email"
            fullWidth
            sx={{ mb: 2 }}
            value={isResetMode ? resetForm.email : form.email}
            onChange={handleChange}
          />

          {isResetMode ? (
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={resetForm.newPassword}
              onChange={handleChange}
            />
          ) : (
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={form.password}
              onChange={handleChange}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ py: 1.2 }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : isResetMode ? (
              "Reset Password"
            ) : (
              "Login"
            )}
          </Button>

          <Box mt={2}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsResetMode(!isResetMode);
                setError("");
                setMessage("");
              }}
            >
              {isResetMode
                ? "Back to Login"
                : "Forgot password? Reset here"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;

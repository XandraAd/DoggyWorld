import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    breedGroup: "",
    temperament: "",
    lifeSpan: "",
    energyLevel: "",
    goodWith: "",
    friendliness: "",
    shedding: "",
    trainability: "",
    protectiveness: "",
    barkingLevel: "",
    exerciseNeeds: "",
    groomingNeeds: "",
   
  location: "Available for Adoption", 
  age: "", 
  });
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!imageFile) {
      setError("Please select an image file");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      data.append("image", imageFile);

      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        breedGroup: "",
        temperament: "",
        lifeSpan: "",
        energyLevel: "",
        goodWith: "",
        friendliness: "",
        shedding: "",
        trainability: "",
        protectiveness: "",
        barkingLevel: "",
        exerciseNeeds: "",
        groomingNeeds: "",
        location: "Available for Adoption",
        age: "",
        
      });
      setImageFile(null);
      document.getElementById("image-input").value = "";
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.code === "ERR_NETWORK") {
        setError("Network error: Please check if the server is running");
      } else {
        setError("Error adding product. Please try again.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-gray-50 rounded-xl"
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Add New Pet / Product
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        {/* Basic Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* Breed Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Breed Group"
            name="breedGroup"
            value={formData.breedGroup}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Life Span"
            name="lifeSpan"
            value={formData.lifeSpan}
            onChange={handleChange}
            placeholder="e.g. 10–12 years"
          />
        </Grid>

        {/* Select Energy Level */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Energy Level"
            name="energyLevel"
            value={formData.energyLevel}
            onChange={handleChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </Grid>

        {/* Good With (Comma separated) */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Good With (comma separated)"
            name="goodWith"
            value={formData.goodWith}
            onChange={handleChange}
            placeholder="Kids, Other Dogs, Cats"
          />
        </Grid>

        {/* Temperament */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Temperament (comma separated)"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            placeholder="Friendly, Loyal, Playful"
          />
        </Grid>

        {/* Numeric Traits */}
        {[
          "friendliness",
          "trainability",
          "shedding",
          "protectiveness",
          "barkingLevel",
          "exerciseNeeds",
          "groomingNeeds",
        ].map((trait) => (
          <Grid item xs={12} sm={6} key={trait}>
            <TextField
              fullWidth
              type="number"
              label={`${trait.charAt(0).toUpperCase() + trait.slice(1)} (1–5)`}
              name={trait}
              value={formData[trait]}
              onChange={handleChange}
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
        ))}

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {imageFile && (
            <Box sx={{ mt: 1, fontSize: "0.875rem", color: "green" }}>
              Selected: {imageFile.name}
            </Box>
          )}
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-rose-600 hover:bg-rose-700"
          >
            Save Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProductForm;

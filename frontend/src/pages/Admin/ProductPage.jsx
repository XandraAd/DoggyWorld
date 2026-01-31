import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete, Visibility, Inventory } from "@mui/icons-material";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import AddProductForm from "./AddProductForm";

const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data) ? data : data.products || []); // safe handling
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product._id !== productId));
    }
  };

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  return (
    <Box className="flex min-h-screen bg-gray-50/30">
      <AdminSidebar />

      <Box className="flex-1 flex flex-col">
        <AdminHeader />

        <Box className="flex-1 p-6 lg:p-8">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Manage Products
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowForm(!showForm)}
            className="bg-rose-600 hover:bg-rose-700 rounded-lg"
          >
            {showForm ? "Close Form" : "Add Product"}
          </Button>

          {showForm && (
            <Box className="mb-8">
              <AddProductForm
                onSuccess={() => window.location.reload()} // refresh after add
              />
            </Box>
          )}

          {/* ✅ Display Products */}
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card className="h-full flex flex-col rounded-xl shadow-md border border-gray-100">
                  <Box className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <Chip
                      label={product.category}
                      size="small"
                      className="absolute top-3 right-3 bg-white/90"
                    />
                  </Box>

                  <CardContent>
                    <Typography variant="h6" className="font-semibold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>

                    <Box className="flex gap-2 mt-3">
                      <IconButton>
                        <Visibility />
                      </IconButton>
                      <IconButton>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(product._id)}>
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;

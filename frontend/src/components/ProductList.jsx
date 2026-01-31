import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Paper className="p-4 rounded-xl shadow-md">
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;

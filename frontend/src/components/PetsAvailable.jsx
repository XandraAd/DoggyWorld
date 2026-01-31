import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CircularProgress,
  Rating,
  Stack,
} from "@mui/material";
import { Visibility, Favorite, FavoriteBorder, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PetsAvailable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        console.log("Fetched data:", data);

        // ✅ Normalize shape of API response
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (data.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Unexpected data format:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId, event) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center py-16">
        <CircularProgress size={60} thickness={4} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!products.length) {
    return (
      <Box className="text-center py-16">
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}
        >
          <Typography variant="h4" color="grey.400">
            🐾
          </Typography>
        </Box>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No furry friends available
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We're expecting new companions soon!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'visible',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              },
            }}
            onClick={() => handleCardClick(product._id)}
          >
            {/* Image Container - Circular */}
            <Box sx={{ position: 'relative', p: 3, pb: 2, display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%', // 50% radius for perfect circle
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                  border: '4px solid white',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Box
                  sx={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    color: 'grey.400',
                    borderRadius: '50%',
                  }}
                >
                  <Typography variant="h4">🐕</Typography>
                </Box>
              </Box>

              {/* Favorite Button */}
              <IconButton
                onClick={(e) => toggleFavorite(product._id, e)}
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    backgroundColor: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {favorites.has(product._id) ? (
                  <Favorite sx={{ color: 'error.main', fontSize: 20 }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: 20 }} />
                )}
              </IconButton>

              {/* Category Chip */}
              <Chip
                label={product.category}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 28,
                }}
              />
            </Box>

            <CardContent sx={{ p: 3, pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Pet Name and Location */}
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'text.primary',
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {product.location || 'Local Shelter'}
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                  mb: 2,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  flexGrow: 1,
                  textAlign: 'center',
                }}
              >
                {product.description}
              </Typography>

              {/* Rating and Age */}
              <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Rating value={4.5} readOnly size="small" precision={0.5} />
                  <Typography variant="caption" color="text.secondary">
                    4.5/5
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" fontWeight={600}>
                    {product.age || '2 years'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Age
                  </Typography>
                </Box>
              </Stack>

              {/* Price and Action */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Adoption Fee
                  </Typography>
                  <Typography variant="h5" color="primary" fontWeight={800}>
                    GHS {product.price}
                  </Typography>
                </Box>
                
                <IconButton
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: 44,
                    height: 44,
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <Visibility sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PetsAvailable;
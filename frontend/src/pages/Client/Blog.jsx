import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/posts"); // 👈 change to your backend URL if needed
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 4,
          background: "linear-gradient(90deg, #ff9800, #f44336)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Dog Blog 🐾
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      ) : blogs.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No blog posts yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                {blog.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.image}
                    alt={blog.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1 }}
                    gutterBottom
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {blog.description?.slice(0, 120)}...
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {blog.tags?.map((tag, i) => (
                      <Chip
                        key={i}
                        label={tag}
                        variant="outlined"
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    component={Link}
                    to={`/blog/${blog._id}`}
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                  >
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Blog;

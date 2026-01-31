import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

const BlogDetails = () => {
  const { id } = useParams(); // get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`); // 👈 Your backend single post endpoint
        if (!res.ok) throw new Error("Failed to fetch blog post");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );

  if (!blog)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Blog post not found.
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: "linear-gradient(90deg, #ff9800, #f44336)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {blog.title}
      </Typography>

      {blog.image && (
        <Box sx={{ my: 3 }}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: "100%",
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      )}

      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
        {blog.content || blog.description}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {blog.tags?.map((tag, i) => (
          <Chip key={i} label={tag} variant="outlined" color="primary" />
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary">
        Posted by <b>{blog.author || "Admin"}</b> on{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/blog"
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          ← Back to Blog
        </Button>
      </Box>
    </Container>
  );
};

export default BlogDetails;

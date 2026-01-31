import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  CalendarToday,
  Person,
} from "@mui/icons-material";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const API_URL = "http://localhost:5000/api/posts"; // adjust to your backend URL

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [editBlog, setEditBlog] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featured: false,
    status: "draft",
    image: "",
  });

  const categories = [
    "all",
    "Dog Care",
    "Cat Behavior",
    "Nutrition",
    "Training",
    "Health",
    "Adoption",
  ];
  const statuses = ["all", "published", "draft"];

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Submit new or edited blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPostData = {
      title: blogForm.title,
      content: blogForm.content,
      author: "Admin User",
      category: blogForm.category,
      excerpt: blogForm.excerpt,
      tags: blogForm.tags
        ? blogForm.tags.split(",").map((tag) => tag.trim())
        : [],
      status: blogForm.status,
      image: blogForm.image,
    };

    try {
      if (editBlog) {
        // Update existing blog
        const res = await axios.put(`${API_URL}/${editBlog._id}`, newPostData);
        setBlogs((prev) =>
          prev.map((b) => (b._id === editBlog._id ? res.data : b))
        );
      } else {
        // Create new blog
        const res = await axios.post(API_URL, newPostData);
        setBlogs([res.data, ...blogs]);
      }

      setBlogForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        featured: false,
        status: "draft",
        image: "",
      });
      setShowForm(false);
      setEditBlog(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post");
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      category: blog.category || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      featured: blog.featured || false,
      status: blog.status || "draft",
      image: blog.image || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${API_URL}/${blogId}`);
      setBlogs(blogs.filter((b) => b._id !== blogId));
      setDeleteDialog(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1) : "Draft";

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || blog.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || blog.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Box className="flex min-h-screen bg-gray-50/30">
      <AdminSidebar />
      <Box className="flex-1 flex flex-col">
        <AdminHeader />
        <Box className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <Box className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Blog Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create and manage your blog posts
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setEditBlog(null);
                setBlogForm({
                  title: "",
                  excerpt: "",
                  content: "",
                  category: "",
                  tags: "",
                  featured: false,
                  status: "draft",
                  image: "",
                });
                setShowForm(true);
              }}
              className="bg-rose-600 hover:bg-rose-700 rounded-lg"
            >
              New Post
            </Button>
          </Box>

          {/* Blog Form */}
          {showForm && (
            <Card className="mb-8">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {editBlog ? "Edit Blog Post" : "Create New Blog Post"}
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Title"
                        value={blogForm.title}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, title: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Excerpt"
                        multiline
                        rows={2}
                        value={blogForm.excerpt}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, excerpt: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image URL"
                        value={blogForm.image}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, image: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        value={blogForm.category}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            category: e.target.value,
                          })
                        }
                      >
                        {categories
                          .filter((cat) => cat !== "all")
                          .map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tags (comma separated)"
                        value={blogForm.tags}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, tags: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={8}
                        value={blogForm.content}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, content: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="flex gap-3">
                        <FormControl className="min-w-[120px]">
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={blogForm.status}
                            label="Status"
                            onChange={(e) =>
                              setBlogForm({
                                ...blogForm,
                                status: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          type="submit"
                          variant="contained"
                          className="bg-rose-600 hover:bg-rose-700"
                        >
                          {editBlog ? "Update Post" : "Publish Post"}
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setShowForm(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Blog List */}
          <Grid container spacing={3}>
            {filteredBlogs.map((blog) => (
              <Grid item xs={12} lg={6} key={blog._id}>
                <Card className="rounded-xl shadow-sm border border-gray-100">
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {blog.excerpt || "No excerpt available."}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {blog.category} • {getStatusText(blog.status)} •{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </Typography>
                    <Box className="flex gap-2 mt-2">
                      <IconButton onClick={() => handleEdit(blog)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => setDeleteDialog(blog)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Delete Confirmation */}
          <Dialog
            open={!!deleteDialog}
            onClose={() => setDeleteDialog(null)}
          >
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogContent>
              Are you sure you want to delete “{deleteDialog?.title}”?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
              <Button
                color="error"
                onClick={() => handleDelete(deleteDialog._id)}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogsPage;

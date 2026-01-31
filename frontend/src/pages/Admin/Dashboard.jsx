import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Paper, Grid, Card, CardContent,
  Button, Chip, useTheme, CircularProgress
} from "@mui/material";
import {
  Inventory, Article, Add, TrendingUp, Visibility, Edit, CheckCircle, Delete
} from "@mui/icons-material";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const statsData = [
    {
      title: "Total Products",
      value: "24",
      icon: <Inventory sx={{ fontSize: 28 }} />,
      change: "+4",
      description: "Active products",
      color: "#2563eb",
      trend: "up",
    },
    {
      title: "Blog Posts",
      value: "12",
      icon: <Article sx={{ fontSize: 28 }} />,
      change: "+2",
      description: "Published articles",
      color: "#dc2626",
      trend: "up",
    },
    {
      title: "Product Views",
      value: "1.2K",
      icon: <Visibility sx={{ fontSize: 28 }} />,
      change: "+15%",
      description: "Last 30 days",
      color: "#059669",
      trend: "up",
    },
    {
      title: "Adoption Requests",
      value: adoptions.length,
      icon: <CheckCircle sx={{ fontSize: 28 }} />,
      change: "+2",
      description: "New this week",
      color: "#7c3aed",
      trend: "up",
    },
  ];

  // Fetch adoption requests
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/adoptions");
        setAdoptions(data);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

  // Update adoption status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/adoptions/${id}`, { status: newStatus });
      setAdoptions((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete adoption request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`/api/adoptions/${id}`);
      setAdoptions((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <Box className="flex min-h-screen bg-gray-50/30">
      <AdminSidebar />

      <Box className="flex-1 flex flex-col">
        <AdminHeader />

        <Box className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <Typography variant="h4" fontWeight={700} className="text-gray-900 mb-2">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-8">
            Manage your products, blogs, and adoptions
          </Typography>

          {/* Stats Grid */}
          <Grid container spacing={3} className="mb-8">
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card className="rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-all duration-300">
                  <CardContent className="p-5">
                    <Box className="flex items-center justify-between">
                      <Box>
                        <Typography variant="body2" className="text-gray-600 font-medium mb-1">
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" className="font-bold text-gray-900">
                          {stat.value}
                        </Typography>
                        <Box className="flex items-center mt-1">
                          <TrendingUp
                            sx={{
                              fontSize: 14,
                              color: stat.trend === "up" ? "#059669" : "#dc2626",
                              mr: 0.5,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: stat.trend === "up" ? "#059669" : "#dc2626",
                            }}
                          >
                            {stat.change}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500 ml-1">
                            {stat.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        className="p-3 rounded-lg"
                        sx={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                      >
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Adoption Requests Section */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card className="rounded-xl shadow-xs border border-gray-100">
                <CardContent className="p-0">
                  <Box className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <Typography variant="h6" fontWeight={600}>
                      Recent Adoption Requests
                    </Typography>
                  </Box>

                  <Box className="p-4">
                    {loading ? (
                      <Box className="flex justify-center p-6">
                        <CircularProgress />
                      </Box>
                    ) : adoptions.length === 0 ? (
                      <Typography className="text-gray-500 text-center py-6">
                        No adoption requests yet.
                      </Typography>
                    ) : (
                      adoptions.map((req) => (
                        <Box
                          key={req._id}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100"
                        >
                          <Box className="flex-1">
                            <Typography variant="body2" className="font-medium text-gray-900">
                              {req.userName || "Anonymous"} wants to adopt{" "}
                              <strong>{req.productName}</strong>
                            </Typography>
                            <Typography variant="caption" className="text-gray-500 block mt-1">
                              {req.userEmail}
                            </Typography>
                             <Typography variant="caption" className="text-gray-500 block mt-1">
                              {req.userContact}
                            </Typography>
                            <Chip
                              label={req.status || "Pending"}
                              size="small"
                              color={
                                req.status === "Approved"
                                  ? "success"
                                  : req.status === "Rejected"
                                  ? "error"
                                  : "warning"
                              }
                              variant="outlined"
                              className="mt-2"
                            />
                          </Box>

                          <Box className="flex items-center gap-2">
                            {req.status !== "Approved" && (
                              <Button
                                size="small"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => handleUpdateStatus(req._id, "Approved")}
                              >
                                Approve
                              </Button>
                            )}
                            <Button
                              size="small"
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => handleDelete(req._id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Article as BlogsIcon,
} from "@mui/icons-material";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Products", path: "/admin/products", icon: <ProductsIcon /> },
    { text: "Blogs", path: "/admin/blogs", icon: <BlogsIcon /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 260, 
          boxSizing: "border-box",
          backgroundColor: "#f8fafc",
          borderRight: "1px solid #e2e8f0"
        },
      }}
    >
      {/* Header */}
      <Box className="p-6 border-b border-gray-200">
        <Typography 
          variant="h5" 
          className="font-bold text-rose-600 text-center"
          sx={{ fontSize: "1.5rem" }}
        >
          DoggyWorld
        </Typography>
        <Typography 
          variant="subtitle2" 
          className="text-gray-500 text-center mt-1"
        >
          Admin Panel
        </Typography>
      </Box>

      {/* Navigation */}
      <List className="p-4">
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            className={`rounded-lg mb-2 ${
              isActive(item.path) 
                ? "bg-rose-50 border border-rose-200 text-rose-600" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            sx={{
              py: 1.5,
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isActive(item.path) ? "#e11d48" : "#6b7280",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: isActive(item.path) ? 600 : 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
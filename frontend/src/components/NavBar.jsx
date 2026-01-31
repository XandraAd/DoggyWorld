import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" },
];

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const isActive = (path) => location.pathname === path;
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(135deg,
          ${theme.palette.primary.main},
          ${alpha(theme.palette.primary.dark, 0.85)}
        )`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${alpha("#fff", 0.08)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 80 },
            px: { xs: 1, md: 2 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              gap: 1.5,
              textDecoration: "none",
              "&:hover .logoAvatar": {
                transform: "rotate(-6deg) scale(1.05)",
              },
            }}
          >
            <Avatar
              className="logoAvatar"
              sx={{
                bgcolor: "secondary.main",
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <PetsIcon />
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: ".05rem",
                background: "linear-gradient(135deg, #fff, #eaeaea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DoggyWorld
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  aria-current={isActive(page.path) ? "page" : undefined}
                  sx={{
                    color: "white",
                    fontWeight: isActive(page.path) ? 700 : 500,
                    px: 2,
                    py: 1,
                    position: "relative",
                    borderRadius: 2,
                    transition: "all 0.25s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: "50%",
                      bottom: 6,
                      transform: "translateX(-50%) scaleX(0)",
                      width: "60%",
                      height: "3px",
                      backgroundColor: "secondary.light",
                      borderRadius: 2,
                      transition: "transform 0.25s ease",
                    },
                    "&:hover": {
                      backgroundColor: alpha("#fff", 0.1),
                      transform: "translateY(-2px)",
                    },
                    "&:hover::after": {
                      transform: "translateX(-50%) scaleX(1)",
                    },
                    ...(isActive(page.path) && {
                      "&::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                    }),
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <Button
              component={Link}
              to="/adopt"
              variant="contained"
              sx={{
                ml: 2,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                background:
                  "linear-gradient(135deg, #ff8a00, #ff5722)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ff9f1a, #ff6f3d)",
                  boxShadow: "0 0 20px rgba(255,138,0,0.6)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Find a Pet
            </Button>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={handleDrawerToggle}
              sx={{
                color: "white",
                border: `1px solid ${alpha("#fff", 0.2)}`,
                borderRadius: 2,
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: `linear-gradient(135deg,
              ${theme.palette.primary.main},
              ${alpha(theme.palette.primary.dark, 0.95)}
            )`,
            backdropFilter: "blur(20px)",
          },
        }}
      >
        {/* Drawer Header */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <PetsIcon />
          </Avatar>
          <Typography fontWeight={700} color="white">
            DoggyWorld
          </Typography>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: alpha("#fff", 0.1) }} />

        <List sx={{ p: 2 }}>
          {pages.map((page) => (
            <ListItem
              key={page.name}
              component={Link}
              to={page.path}
              onClick={handleDrawerToggle}
              sx={{
                mb: 1,
                borderRadius: 2,
                position: "relative",
                backgroundColor: isActive(page.path)
                  ? alpha("#fff", 0.15)
                  : "transparent",
                "&::before": isActive(page.path)
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      backgroundColor: "secondary.main",
                      borderRadius: 2,
                    }
                  : {},
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
            >
              <ListItemText
                primary={page.name}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontSize: "1.1rem",
                    fontWeight: isActive(page.path) ? 700 : 500,
                  },
                }}
              />
            </ListItem>
          ))}

          <Button
            fullWidth
            component={Link}
            to="/adopt"
            onClick={handleDrawerToggle}
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 700,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #ff8a00, #ff5722)",
              color: "white",
            }}
          >
            Find a Pet
          </Button>
        </List>
      </Drawer>
    </AppBar>
  );
}

export default NavBar;

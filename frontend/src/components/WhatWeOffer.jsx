import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  Box,
  Fade,
  Chip,
  alpha,
  
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Pets,
  Store,
  SmartToy,
  Restaurant,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";

const services = [
  {
    name: "Adopt A Dog",
    path: "/adopt",
    description: "Find your perfect furry companion from our loving pets.",
    icon: Pets,
    color: "primary",
    featured: true,
    features: ["100+ Dogs", "Health Checked", "Free First Visit"],
  },
  {
    name: "Dog Services",
    path: "/services",
    description: "Professional grooming, training & care services.",
    icon: Store,
    color: "secondary",
    features: ["Grooming", "Training", "Daycare"],
  },
  {
    name: "Dog Gadgets",
    path: "/gadgets",
    description: "Innovative tech and toys for your pet's happiness.",
    icon: SmartToy,
    color: "success",
    features: ["Smart Toys", "GPS Trackers", "Auto Feeders"],
  },
  {
    name: "Dog Food",
    path: "/food",
    description: "Premium nutrition and healthy treats for all breeds.",
    icon: Restaurant,
    color: "warning",
    features: ["Organic", "Vet Approved", "All Breeds"],
  },
];

const WhatWeOffer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        background: `linear-gradient(135deg,
          ${alpha(theme.palette.background.default, 0.97)},
          ${alpha(theme.palette.primary.light, 0.05)}
        )`,
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.secondary.main,
            0.06
          )} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* Subtle pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
            <Chip
              label="Our Services"
              color="primary"
              size="medium"
              sx={{
                mb: 3,
                fontWeight: 600,
                px: 1,
                py: 0.5,
                fontSize: "0.9rem",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3rem" },
                lineHeight: 1.2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Everything Your Dog Needs
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.7,
                fontWeight: 400,
                mb: 1,
              }}
            >
              Carefully selected services and products designed to keep your dog
              happy, healthy, and loved.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.7),
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              From adoption to daily care, we've got you covered
            </Typography>
          </Box>
        </Fade>

        {/* Cards Grid */}

        <Grid container spacing={8} justifyContent="center">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Grid
                item
                key={service.name}
                sx={{
                  display: "flex",
                }}
              >
                <Fade
                  in
                  timeout={600}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Paper
                    component={Link}
                    to={service.path}
                    elevation={0}
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: 320,
                      maxWidth: 300,
                      p: 3,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                      background: service.featured
                        ? `linear-gradient(135deg,
                    ${alpha(theme.palette.primary.main, 0.95)},
                    ${alpha(theme.palette.primary.dark, 0.95)}
                  )`
                        : theme.palette.background.paper,
                      color: service.featured ? "#fff" : "inherit",

                      transition: "box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 18px 36px ${alpha(
                          theme.palette.common.black,
                          0.18
                        )}`,
                      },
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        background: service.featured
                          ? alpha("#fff", 0.18)
                          : alpha(theme.palette[service.color].main, 0.12),
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 30,
                          color: service.featured
                            ? "#fff"
                            : theme.palette[service.color].main,
                        }}
                      />
                    </Box>

                    <Typography fontWeight={700} mb={1}>
                      {service.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color: service.featured
                          ? alpha("#fff", 0.85)
                          : "text.secondary",
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* Features */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      {service.features.slice(0, 3).map((feature, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            px: 1,
                            py: 0.5,
                            borderRadius: 20,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            background: service.featured
                              ? alpha("#fff", 0.18)
                              : alpha(theme.palette[service.color].main, 0.12),
                            color: service.featured
                              ? "#fff"
                              : theme.palette[service.color].main,
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 14 }} />
                          {feature}
                        </Box>
                      ))}
                    </Box>

                    <Button
                      fullWidth
                      variant={service.featured ? "contained" : "outlined"}
                      color={service.featured ? "secondary" : service.color}
                      endIcon={<ArrowForward />}
                      sx={{
                        mt: "auto",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 3,
                      }}
                    >
                      Explore Now
                    </Button>
                  </Paper>
                </Fade>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom CTA */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              p: { xs: 4, md: 6 },
              mt: 8,
              borderRadius: 4,
              background: `linear-gradient(135deg,
                ${alpha(theme.palette.primary.main, 0.05)},
                ${alpha(theme.palette.secondary.main, 0.05)}
              )`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
              }}
            >
              Can't find what you're looking for?
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              We offer custom solutions for unique needs. Our team is ready to
              help you find exactly what your furry friend needs.
            </Typography>

            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                background: `linear-gradient(135deg, 
                  ${theme.palette.primary.main} 0%, 
                  ${theme.palette.secondary.main} 100%
                )`,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 12px 30px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                },
              }}
            >
              Get Custom Help
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default WhatWeOffer;

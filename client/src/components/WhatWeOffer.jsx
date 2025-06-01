/* eslint-disable no-unused-vars */
import {
  Container,
  Typography,
  
  Paper,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";


const services = [
  {
    name: "Adopt A Dog",
    path: "/adopt",
    description: "Find your perfect furry companion",
  },
  {
    name: "Dog Business",
    path: "/services",
    description: "Professional services for your dog",
  },
  {
    name: "Dog Gadgets",
    path: "/gadgets",
    description: "Innovative tech for your pet",
  },
  {
    name: "Dog Food",
    path: "/food",
    description: "Premium nutrition options",
  },
];

const WhatWeOffer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Container  maxWidth="xl" sx={{ py: 6}} >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
          color: "primary.main",
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
          textTransform:"uppercase"
          
        }}
      >
        What we Offer
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <Grid
            item
            key={service.name}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              px: { xs: 2, sm: 1 },
            }}
          >
            <Button
              component={Link}
              to={service.path}
              fullWidth
              sx={{
                p: 0,
                textTransform: "none",
                borderRadius: 2,
                height: "100%",
                minHeight: 140,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "secondary.light",
                  color: "secondary.contrastText",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  }}
                >
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "inherit",
                    opacity: 0.8,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {service.description}
                </Typography>
              </Paper>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhatWeOffer;
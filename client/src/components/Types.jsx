import {
  Container,
  Paper,
  Typography,
  Chip,
  Stack,
  Box,
  Rating,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import dogData from "../data";

const Types = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
 

  const energyLevelMap = {
    High: 5,
    Moderate: 3,
    Low: 1,
  };

  // eslint-disable-next-line no-unused-vars
  const getGridColumns = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

 

  return (
    <Container maxWidth="xl" sx={{}}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 6,
          color: "primary.main",
          textTransform: "uppercase",
          fontSize: {
            xs: "1.8rem",
            sm: "2.2rem",
            md: "2.5rem",
          },
        }}
      >
        Our Dog Breeds
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          px: {
            xs: 2,
            sm: 4,
            md: 0,
          },
        }}
      >
        {dogData.map((dog) => (
          <Grid
            item
            key={dog.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}   // 5 per row on extra large screens (optional)
            sx={{
              display: "flex", // Important for consistent heights
              justifyContent: "center",
            }}
          
          >
            <Paper
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 350,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              {/* Dog Image */}
              <Box
                component="img"
                src={dog.image}
                alt={dog.name}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              />

              <Box sx={{ p: 3, flexGrow: 1 }}>
                {/* Dog Name */}
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "1.25rem",
                      md: "1.5rem",
                    },
                  }}
                >
                  {dog.name}
                </Typography>

                {/* Size and Breed Chips */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mb: 2,
                    flexWrap: "wrap",
                    "& .MuiChip-root": {
                      mb: 1,
                    },
                  }}
                >
                  <Chip label={dog.size} size="small" color="primary" />
                  <Chip
                    label={dog.breedGroup}
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                {/* Energy Level */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Rating
                    value={energyLevelMap[dog.energyLevel] || 1}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    Energy: {dog.energyLevel}
                  </Typography>
                </Box>

                {/* Life Span */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  Life Span: {dog.lifeSpan}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    mb: 2,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {dog.description}
                </Typography>
                {/* Temparament */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    mb: 2,
                    backgroundColor: theme.palette.action.hover,
                    display: "inline-block",
                  }}
                >
                  Temperament: {dog.temperament.join(", ")}
                </Typography>

                {/* Good With */}
                <Box sx={{ mt: "auto" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "inline-block",
                      backgroundColor: theme.palette.action.hover,
                      px: 1,
                      borderRadius: 1,
                    }}
                  >
                    Good with: {dog.goodWith.join(", ")}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Types;

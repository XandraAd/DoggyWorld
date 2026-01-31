import {
  Container,
  Typography,
  Chip,
  Stack,
  Box,
  Rating,
  Grid,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  IconButton,
  Fade,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Pets,
  Schedule,
  BrokenImage,
} from "@mui/icons-material";
import React, { useState, useMemo, useCallback } from "react";
import dogData from "../data";

// Constants for better maintainability
const ENERGY_LEVEL_MAP = {
  High: 5,
  Moderate: 3,
  Low: 1,
};

const SIZE_ICON_MAP = {
  Small: <Pets sx={{ fontSize: 16 }} />,
  Medium: <Pets sx={{ fontSize: 20 }} />,
  Large: <Pets sx={{ fontSize: 24 }} />,
};

const MAX_TEMPERAMENT_DISPLAY = 3;
const CARD_MAX_WIDTH = 360;
const CARD_MIN_HEIGHT = 520;

// Fallback image URL or base64 placeholder
const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const Types = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageStates, setImageStates] = useState({});

  // Memoized energy level calculation
  const getEnergyLevel = useCallback((energyLevel) => 
    ENERGY_LEVEL_MAP[energyLevel] || 1, []);

  // Optimized favorite toggle
  const toggleFavorite = useCallback((dogId, event) => {
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(dogId) ? newFavorites.delete(dogId) : newFavorites.add(dogId);
      return newFavorites;
    });
  }, []);

  const handleCardClick = useCallback((dogId) => {
    // Add navigation or modal opening logic here
    console.log('Card clicked:', dogId);
  }, []);

  const handleImageLoad = useCallback((dogId) => {
    setImageStates(prev => ({ 
      ...prev, 
      [dogId]: { ...prev[dogId], loaded: true, error: false } 
    }));
  }, []);

  const handleImageError = useCallback((dogId) => {
    setImageStates(prev => ({ 
      ...prev, 
      [dogId]: { ...prev[dogId], loaded: true, error: true } 
    }));
  }, []);

  // Get image URL with fallback - FIXED PATH RESOLUTION
  const getImageUrl = useCallback((dog) => {
    // If image is already an absolute URL, use it directly
    if (dog.image?.startsWith('http') || dog.image?.startsWith('data:')) {
      return dog.image;
    }
    
    // If image is just a filename, assume it's in the public/images folder
    if (dog.image) {
      // Remove any leading slashes or relative paths
      const cleanImagePath = dog.image.replace(/^\.?\//, '');
      return `/images/${cleanImagePath}`;
    }
    
    // Return fallback if no image
    return FALLBACK_IMAGE;
  }, []);

  // Memoized card data for better performance
  const memoizedDogData = useMemo(() => dogData, []);

  const DogCard = React.memo(({ dog }) => {
    const isHovered = hoveredCard === dog.id;
    const isFavorite = favorites.has(dog.id);
    const imageState = imageStates[dog.id] || { loaded: false, error: false };
    const imageUrl = getImageUrl(dog);
    const displayImage = imageState.error ? FALLBACK_IMAGE : imageUrl;

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Fade in timeout={500}>
          <Card
            elevation={isHovered ? 8 : 2}
            onMouseEnter={() => setHoveredCard(dog.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(dog.id)}
            sx={{
              width: "100%",
              maxWidth: CARD_MAX_WIDTH,
              minHeight: CARD_MIN_HEIGHT,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isHovered ? "translateY(-8px)" : "none",
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
              position: "relative",
              overflow: "visible",
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '4px 4px 0 0',
              }
            }}
          >
            {/* Favorite Button */}
            <IconButton
              onClick={(e) => toggleFavorite(dog.id, e)}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                zIndex: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: theme.palette.error.main }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            {/* Dog Image with Skeleton and Error Handling */}
            <Box sx={{ position: 'relative', height: 220, overflow: 'hidden' }}>
              {!imageState.loaded && (
                <Skeleton 
                  variant="rectangular" 
                  height={220} 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0,
                    borderRadius: '4px 4px 0 0'
                  }} 
                />
              )}
              
              {imageState.error && (
                <Box
                  sx={{
                    height: 220,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.disabled,
                  }}
                >
                  <BrokenImage sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="caption">Image not available</Typography>
                </Box>
              )}
              
              {!imageState.error && (
                <CardMedia
                  component="img"
                  height="220"
                  image={displayImage}
                  alt={`${dog.name} dog breed`}
                  onLoad={() => handleImageLoad(dog.id)}
                  onError={() => handleImageError(dog.id)}
                  sx={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    opacity: imageState.loaded ? 1 : 0,
                    ...(isHovered && imageState.loaded && {
                      transform: "scale(1.05)",
                    }),
                  }}
                />
              )}
            </Box>

            <CardContent sx={{ 
              p: isMobile ? 2 : 3, 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              {/* Dog Name and Basic Info */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.4rem",
                    },
                    color: theme.palette.text.primary,
                    lineHeight: 1.2,
                  }}
                >
                  {dog.name}
                </Typography>
                
                {/* Size and Breed Group */}
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    mb: 2, 
                    flexWrap: 'wrap', 
                    gap: 1 
                  }}
                >
                  <Tooltip title="Size">
                    <Chip 
                      icon={SIZE_ICON_MAP[dog.size]} 
                      label={dog.size} 
                      size="small" 
                      color="primary" 
                      variant="filled"
                    />
                  </Tooltip>
                  <Chip
                    label={dog.breedGroup}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                </Stack>
              </Box>

              {/* Energy Level */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating
                  value={getEnergyLevel(dog.energyLevel)}
                  readOnly
                  size="small"
                  sx={{ color: theme.palette.warning.main }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1, fontWeight: 500 }}
                >
                  {dog.energyLevel} Energy
                </Typography>
              </Box>

              {/* Life Span */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule sx={{ 
                  fontSize: 18, 
                  color: theme.palette.text.secondary, 
                  mr: 1 
                }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Life Span:</strong> {dog.lifeSpan}
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  flexGrow: 1,
                }}
              >
                {dog.description}
              </Typography>

              {/* Temperament */}
              <TemperamentSection temperament={dog.temperament} theme={theme} />

              {/* Good With */}
              <GoodWithSection goodWith={dog.goodWith} theme={theme} />
            </CardContent>
          </Card>
        </Fade>
      </Grid>
    );
  });

  // Extracted components for better organization
  const TemperamentSection = React.memo(({ temperament, theme }) => (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="caption" 
        fontWeight="600" 
        color="text.primary" 
        display="block" 
        gutterBottom
      >
        Personality:
      </Typography>
      <Stack 
        direction="row" 
        spacing={0.5} 
        sx={{ 
          flexWrap: 'wrap', 
          gap: 0.5 
        }}
      >
        {temperament.slice(0, MAX_TEMPERAMENT_DISPLAY).map((trait, index) => (
          <Chip
            key={`${trait}-${index}`}
            label={trait}
            size="small"
            variant="filled"
            sx={{
              backgroundColor: theme.palette.action.selected,
              fontSize: '0.7rem',
              height: 20,
            }}
          />
        ))}
        {temperament.length > MAX_TEMPERAMENT_DISPLAY && (
          <Tooltip title={temperament.slice(MAX_TEMPERAMENT_DISPLAY).join(', ')}>
            <Chip
              label={`+${temperament.length - MAX_TEMPERAMENT_DISPLAY}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          </Tooltip>
        )}
      </Stack>
    </Box>
  ));

  const GoodWithSection = React.memo(({ goodWith, theme }) => (
    <Box sx={{ mt: 'auto' }}>
      <Typography 
        variant="caption" 
        fontWeight="600" 
        color="text.primary" 
        display="block" 
        gutterBottom
      >
        Great with:
      </Typography>
      <Stack 
        direction="row" 
        spacing={0.5} 
        sx={{ 
          flexWrap: 'wrap', 
          gap: 0.5 
        }}
      >
        {goodWith.map((item, index) => (
          <Chip
            key={`${item}-${index}`}
            label={item}
            size="small"
            variant="outlined"
            color="success"
            sx={{ fontSize: '0.7rem', height: 20 }}
          />
        ))}
      </Stack>
    </Box>
  ));

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: { xs: 6, sm: 8 } }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem",
            },
            mb: 2,
          }}
        >
          Discover Your Perfect Companion
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            fontSize: {
              xs: "0.9rem",
              sm: "1.1rem",
            },
            lineHeight: 1.6,
          }}
        >
          Explore our diverse collection of dog breeds, each with unique personalities 
          and characteristics to match your lifestyle.
        </Typography>
      </Box>

      {/* Dog Cards Grid */}
      <Grid 
        container 
        spacing={3} 
        justifyContent="center"
        sx={{ 
          '& > .MuiGrid-item': {
            display: 'flex',
            justifyContent: 'center',
          }
        }}
      >
        {memoizedDogData.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </Grid>

      {/* Footer Note */}
      <Box sx={{ textAlign: "center", mt: { xs: 6, sm: 8 } }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ fontStyle: 'italic' }}
        >
          Can't find what you're looking for? Contact us for more breed options and availability.
        </Typography>
      </Box>
    </Container>
  );
};

export default Types;
import { Box, Typography, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? '70vh' : '100vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1790&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        px: 2,
        
      }}
    >
      <Box sx={{ maxWidth: 800, mt:"2"}}>
        <PetsIcon sx={{ fontSize: 60, mb: 2, color: 'secondary.main' }} />
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Premium Care for Your Beloved Dog
        </Typography>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="p"
          sx={{
            mb: 2,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            fontWeight: 300,
          }}
        >
          Discover our comprehensive services including adoption, professional care,
          innovative gadgets, and premium nutrition for your furry friend.
        </Typography>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={Link}
            to="/adopt"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Find Your Companion
          </Button>
          <Button
            component={Link}
            to="/services"
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Explore Services
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;
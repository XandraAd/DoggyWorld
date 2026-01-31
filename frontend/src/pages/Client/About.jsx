import React from "react";
import { Container, Typography, Grid, Card, Box, alpha, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const About = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #fef7ff 0%, #f0f9ff 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FF6B6B20 0%, #4ECDC420 100%)",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #96CEB420 0%, #45B7D120 100%)",
          filter: "blur(50px)",
        }}
      />
      
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: { xs: 8, md: 12 },
            position: "relative"
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            About DoggyWorld
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              fontSize: "1.25rem",
              lineHeight: 1.7,
              mb: 2
            }}
          >
            Welcome to <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>DoggyWorld</Box> — 
            born from a love for dogs and a passion for responsible care.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "800px",
              mx: "auto",
              fontSize: "1.25rem",
              lineHeight: 1.7
            }}
          >
            We combine ethical breeding, dog education, and community to help you find your perfect furry companion.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<HistoryIcon sx={{ fontSize: 40 }} />}
              title="Our Story"
              color="#8B5CF6"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)"
            >
              What started as a small passion project turned into a community devoted to dogs. 
              We believe every pup deserves a loving, safe, and nurturing home. Each day, our 
              team works toward that goal — one tail wag at a time.
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<FavoriteIcon sx={{ fontSize: 40 }} />}
              title="Our Mission"
              color="#EF4444"
              gradient="linear-gradient(135deg, #EF4444 0%, #F87171 100%)"
            >
              To connect dogs and humans through education, trust, and care. We champion 
              responsible breeding and offer guidance so new pet owners can create happy, 
              lasting bonds with their furry companions.
            </FeatureCard>
          </Grid>
        </Grid>

        {/* Additional Features Section */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<PetsIcon sx={{ fontSize: 40 }} />}
              title="Our Values"
              color="#10B981"
              gradient="linear-gradient(135deg, #10B981 0%, #34D399 100%)"
            >
              We prioritize health, happiness, and ethical practices above all else. Every 
              decision we make is guided by our commitment to the well-being of dogs and 
              the joy they bring to families.
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <FeatureCard
              icon={<EmojiObjectsIcon sx={{ fontSize: 40 }} />}
              title="Our Vision"
              color="#F59E0B"
              gradient="linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
            >
              A world where every dog has a loving home and every family experiences the 
              unconditional love that only a canine companion can provide.
            </FeatureCard>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box 
          sx={{ 
            mt: 10,
            p: 6,
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.1)",
            textAlign: "center"
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <StatItem number="60+" label="Happy Families" />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem number="4+" label="Years Experience" />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem number="5+" label="Dog Breeds" />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem number="100%" label="Love & Care" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

// Styled Feature Card Component
const FeatureCard = ({ icon, title, color, gradient, children }) => {
  const CardWrapper = styled(Card)(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(4),
    borderRadius: "24px",
    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(color, 0.03)} 100%)`,
    border: `1px solid ${alpha(color, 0.1)}`,
    backdropFilter: "blur(10px)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    height: "100%",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: `0 20px 40px ${alpha(color, 0.15)}`,
      border: `1px solid ${alpha(color, 0.2)}`,
      
      "& .feature-icon": {
        transform: "scale(1.1)",
        background: gradient,
      }
    },
  }));

  const IconWrapper = styled(Box)(({ theme }) => ({
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
    color: color,
    transition: "all 0.4s ease",
  }));

  return (
    <CardWrapper>
      <Stack direction="column" spacing={3} sx={{ height: "100%" }}>
        <Box>
          <IconWrapper className="feature-icon">
            {icon}
          </IconWrapper>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 2
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
            flexGrow: 1
          }}
        >
          {children}
        </Typography>
      </Stack>
    </CardWrapper>
  );
};

// Stat Item Component
const StatItem = ({ number, label }) => {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1
        }}
      >
        {number}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "text.secondary",
          fontWeight: 600
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default About;
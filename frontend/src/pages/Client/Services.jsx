import React from "react";
import { Container, Typography, Grid, Card, Box, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

const services = [
  {
    title: "Dog Breeding",
    icon: "🐶",
    description:
      "Ethical breeding focused on health, temperament, and proper care — ensuring every pup is strong, social, and happy.",
    color: "#FF6B6B",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
  },
  {
    title: "Puppy Sales & Adoption",
    icon: "🏠",
    description:
      "Connecting families with their new best friends. Whether you're adopting or purchasing, every match is made with love.",
    color: "#4ECDC4",
    gradient: "linear-gradient(135deg, #4ECDC4 0%, #6AECD2 100%)"
  },
  {
    title: "Dog Blog & Tips",
    icon: "📚",
    description:
      "Our blog covers training, nutrition, and behavior — everything you need to raise a confident, well-loved pup.",
    color: "#45B7D1",
    gradient: "linear-gradient(135deg, #45B7D1 0%, #6CD1E3 100%)"
  },
  {
    title: "Pet Store (Coming Soon)",
    icon: "🛍️",
    description:
      "Explore accessories, food, and care essentials designed for your dog's comfort and happiness.",
    color: "#96CEB4",
    gradient: "linear-gradient(135deg, #96CEB4 0%, #AED9B4 100%)"
  },
];

const ServiceCard = styled(Card)(({ theme, color }) => ({
  position: "relative",
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: "24px",
  border: `1px solid ${alpha(color, 0.1)}`,
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(color, 0.03)} 100%)`,
  backdropFilter: "blur(10px)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  overflow: "hidden",
  cursor: "pointer",
  minHeight: "320px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  
  "&:hover": {
    transform: "translateY(-12px)",
    boxShadow: `0 20px 40px ${alpha(color, 0.2)}`,
    border: `1px solid ${alpha(color, 0.3)}`,
    
    "& .service-icon": {
      transform: "scale(1.1) translateY(-5px)",
      background: color,
    },
    
    "& .service-background": {
      opacity: 0.1,
    }
  },
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: color,
    transform: "scaleX(0)",
    transition: "transform 0.3s ease",
  },
  
  "&:hover::before": {
    transform: "scaleX(1)",
  }
}));

const ServiceIcon = styled(Box)(({ color }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  marginBottom: "24px",
  background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
  transition: "all 0.4s ease",
  position: "relative",
  zIndex: 2,
}));

const BackgroundPattern = styled(Box)(({ color }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: "opacity 0.4s ease",
  background: `radial-gradient(circle at 30% 20%, ${alpha(color, 0.1)} 0%, transparent 50%)`,
}));

const ComingSoonBadge = styled(Box)(({ color }) => ({
  position: "absolute",
  top: "16px",
  right: "16px",
  background: color,
  color: "white",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  fontWeight: "600",
  zIndex: 3,
}));

const Services = () => {
  return (
    <Box 
      sx={{ 
        py: 12,
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FF6B6B20 0%, #4ECDC420 100%)",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #45B7D120 0%, #96CEB420 100%)",
          filter: "blur(40px)",
        }}
      />
      
      <Container maxWidth="lg">
        <Box className="text-center mb-16" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(135deg, #2D3748 0%, #4A5568 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            At <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>DoggyWorld</Box>, 
            we go beyond breeding — we build lifelong connections between dogs and their humans.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard color={service.color}>
                <BackgroundPattern className="service-background" color={service.color} />
                
                {service.title.includes("Coming Soon") && (
                  <ComingSoonBadge color={service.color}>
                    Coming Soon
                  </ComingSoonBadge>
                )}
                
                <ServiceIcon 
                  className="service-icon" 
                  color={service.color}
                >
                  {service.icon}
                </ServiceIcon>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 2,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {service.title.replace(" (Coming Soon)", "")}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {service.description}
                </Typography>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
        
        {/* Call to action */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            "Every tail wag tells a story of love and care"
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
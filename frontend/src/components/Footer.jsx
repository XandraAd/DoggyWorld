import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    Link, 
    Divider,
    IconButton,
    useTheme
  } from '@mui/material';
  import {
    Facebook,
    Instagram,
    Twitter,
    Pets, // Dog paw icon
    Email,
    Phone,
    LocationOn
  } from '@mui/icons-material';
    import { Link as RouterLink } from 'react-router-dom';
  
  const Footer = () => {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();
  
    return (
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Pets sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  DoggyWorld
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Connecting loving families with perfect canine companions since 2021.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton aria-label="Facebook" color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit">
                  <Instagram />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit">
                  <Twitter />
                </IconButton>
              </Box>
            </Grid>
  
            {/* Quick Links */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Explore
              </Typography>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                Breeds
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                Adoption
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                About Us
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Testimonials
              </Link>
            </Grid>
  
            {/* Resources */}
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Resources
              </Typography>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                Care Guides
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                Training Tips
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
                FAQ
              </Link>
              <Link href="#" color="inherit" underline="hover" display="block">
                Blog
              </Link>
            </Grid>
  
            {/* Contact */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Adenta Ssnit Flats, Adenta, Accra, Ghana
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
               (020) 192 1437
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">
                  info@doggyworld.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
          <Divider sx={{ my: 4, backgroundColor: theme.palette.primary.light }} />
  
          <Typography variant="body2" align="center">
            © {currentYear} DoggyWorld. All rights reserved. | 
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 1 }}>
              Privacy Policy
            </Link> | 
            <Link href="#" color="inherit" underline="hover" sx={{ ml: 1 }}>
              Terms of Service
            </Link>
          </Typography>
<Typography
  variant="body2"
  component={RouterLink}
  to="/admin/login"
  sx={{
    color: "secondary.light",
    textDecoration: "underline",
    cursor: "pointer",
    mt: 1,
    display: "inline-block"
  }}
>
  Admin Login
</Typography>

        </Container>
      </Box>
    );
  };
  
  export default Footer;
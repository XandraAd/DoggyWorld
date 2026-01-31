import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Button,
  Box,
  Stack,
  alpha,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Pets,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #fef7ff 100%)',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF6B6B20 0%, #4ECDC420 100%)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #96CEB420 0%, #45B7D120 100%)',
          filter: 'blur(40px)',
        }}
      />
      
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '4rem' },
              background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            We'd love to hear from you! Whether you have questions about our puppies, 
            adoption process, or just want to say hello - we're here to help.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: '2.5rem',
                  color: 'text.primary',
                  mb: 3
                }}
              >
                Let's talk about your new best friend
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  mb: 4
                }}
              >
                Our team is dedicated to helping you find the perfect furry companion. 
                Reach out to us with any questions about our adoption process, available 
                puppies, or how we can help you prepare for your new family member.
              </Typography>
            </Box>

            {/* Contact Methods */}
            <Stack spacing={4}>
              <ContactMethod
                icon={<Phone sx={{ fontSize: 32 }} />}
                title="Call Us"
                subtitle="+233 20 192 1437"
                description="Mon-Fri from 8am to 6pm"
                color="#3B82F6"
              />
              <ContactMethod
                icon={<Email sx={{ fontSize: 32 }} />}
                title="Email Us"
                subtitle="doggyworld@gmail.com"
                description="We'll reply within 24 hours"
                color="#8B5CF6"
              />
              <ContactMethod
                icon={<LocationOn sx={{ fontSize: 32 }} />}
                title="Visit Us"
                subtitle="Adenta Ssnit Flats, Adenta, Accra"
                description="Open for visits by appointment"
                color="#10B981"
              />
              <ContactMethod
                icon={<Schedule sx={{ fontSize: 32 }} />}
                title="Business Hours"
                subtitle="Monday - Sunday"
                description="8:00 AM - 8:00 PM"
                color="#F59E0B"
              />
            </Stack>

            {/* Social Media */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                {[
                  { icon: <Facebook />, color: '#1877F2', name: 'Facebook' },
                  { icon: <Instagram />, color: '#E4405F', name: 'Instagram' },
                  { icon: <Twitter />, color: '#1DA1F2', name: 'Twitter' },
                  { icon: <LinkedIn />, color: '#0A66C2', name: 'LinkedIn' }
                ].map((social, index) => (
                  <Button
                    key={index}
                    sx={{
                      minWidth: 'auto',
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(social.color, 0.1),
                      color: social.color,
                      '&:hover': {
                        bgcolor: alpha(social.color, 0.2),
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <ContactFormCard
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3rem' },
              mb: 6
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={4}>
            {faqData.map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <FAQCard question={faq.question} answer={faq.answer} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setOpenSnackbar(false)}
          icon={<Pets />}
        >
          Thank you for your message! We'll get back to you within 24 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Contact Method Component
const ContactMethod = ({ icon, title, subtitle, description, color }) => {
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: alpha(color, 0.1),
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="primary" gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Stack>
  );
};

// Contact Form Component
const ContactFormCard = ({ formData, onChange, onSubmit }) => {
  return (
    <Card
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(255,255,255,0.5)'
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: '2rem',
          mb: 1
        }}
      >
        Send us a message
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Fill out the form below and we'll get back to you as soon as possible.
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={onChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={onChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<Send />}
              fullWidth
              sx={{
                py: 2,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(126, 34, 206, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

// FAQ Card Component
const FAQCard = ({ question, answer }) => {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
        {question}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {answer}
      </Typography>
    </Paper>
  );
};

// FAQ Data
const faqData = [
  {
    question: "How does the adoption process work?",
    answer: "Our adoption process involves an application, virtual home visit, and meeting with the puppy. We ensure every dog goes to a loving, suitable home."
  },
  {
    question: "Are all puppies vaccinated?",
    answer: "Yes, all our puppies receive age-appropriate vaccinations and health checks before adoption. We provide complete medical records."
  },
  {
    question: "Can I visit the puppies before adopting?",
    answer: "Absolutely! We encourage scheduled visits to meet the puppies and our team. Contact us to book your appointment."
  },
  {
    question: "Do you offer transportation services?",
    answer: "We can help arrange transportation for your new puppy. Additional fees may apply depending on distance."
  },
  {
    question: "What support do you provide after adoption?",
    answer: "We offer lifetime support including training advice, health consultations, and a 24/7 helpline for any questions."
  },

];

export default Contact;
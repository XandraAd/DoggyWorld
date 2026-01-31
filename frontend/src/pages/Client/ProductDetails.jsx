import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Chip,
  Box,
  Rating,
  Stack,
  Card,
  Button,
  CardMedia,
  CardContent,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { Schedule, Pets, Favorite } from "@mui/icons-material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [adoptionMessage, setAdoptionMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdoptNow = () => {
    setOpenModal(true);
  };

  const handleSubmitAdoption = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const adoptionData = {
        productId: product._id,
        productName: product.name,
        userEmail,
        userName,
        userContact,
        message: `I’m interested in adopting ${product.name}!`,
      };

      const { data } = await axios.post("/api/adoptions", adoptionData);
      console.log("✅ Adoption created:", data);
      setAdoptionMessage("Thank you! Your adoption request has been sent.");
      setUserName("");
      setUserEmail("");
    } catch (err) {
      console.error("❌ Failed to send adoption request:", err);
      setAdoptionMessage("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="text.secondary">
          Loading product details...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  if (!product)
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6">No product found.</Typography>
      </Box>
    );

  const energyLevelMap = { High: 5, Moderate: 3, Low: 1 };
  const sizeIconMap = {
    Small: <Pets sx={{ fontSize: 16 }} />,
    Medium: <Pets sx={{ fontSize: 20 }} />,
    Large: <Pets sx={{ fontSize: 24 }} />,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6} alignItems="flex-start">
        {/* IMAGE SECTION */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={product.image || "/default-pet.jpg"}
              alt={product.name}
              onError={(e) => (e.target.src = "/default-pet.jpg")}
              sx={{ height: 400, objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* DETAILS SECTION */}
        <Grid item xs={12} md={7}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {product.size && (
                <Chip
                  icon={sizeIconMap[product.size]}
                  label={product.size}
                  color="primary"
                />
              )}
              {product.breedGroup && (
                <Chip
                  label={product.breedGroup}
                  variant="outlined"
                  color="secondary"
                />
              )}
            </Stack>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {/* Traits */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Traits
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ width: 120 }}>Friendliness</Typography>
                  <Rating value={product.friendliness || 0} readOnly />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ width: 120 }}>Trainability</Typography>
                  <Rating value={product.trainability || 0} readOnly />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ width: 120 }}>Shedding</Typography>
                  <Rating value={product.shedding || 0} readOnly />
                </Box>
              </Stack>
            </Box>

            {product.energyLevel && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography sx={{ mr: 1 }}>Energy Level:</Typography>
                <Rating
                  value={energyLevelMap[product.energyLevel]}
                  readOnly
                  sx={{ color: "orange" }}
                />
                <Typography sx={{ ml: 1 }}>{product.energyLevel}</Typography>
              </Box>
            )}

            {product.lifeSpan && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule sx={{ fontSize: 18, mr: 1, color: "gray" }} />
                <Typography>
                  <strong>Life Span:</strong> {product.lifeSpan}
                </Typography>
              </Box>
            )}

            {product.temperament?.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold" gutterBottom>
                  Personality
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.temperament.map((trait, i) => (
                    <Chip key={i} label={trait} color="info" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            )}

            {product.goodWith?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography fontWeight="bold" gutterBottom>
                  Great with:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.goodWith.map((g, i) => (
                    <Chip key={i} label={g} color="success" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Adopt Button */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Favorite />}
              sx={{ mt: 3, px: 4, borderRadius: 3 }}
              onClick={handleAdoptNow}
            >
              Adopt {product.name}
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {/* Back to Products */}
      <Box textAlign="center" mt={6}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 3 }}
        >
          ← Back to All Pets
        </Button>
      </Box>

      {/* Adoption Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}  
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 5,
              borderRadius: 3,
              boxShadow: 24,
              textAlign: "center",
              width: { xs: "90%", sm: 400 },
            }}
          >
            {adoptionMessage ? (
              <>
                <Typography variant="h6" gutterBottom>
                  🐾 Adoption Request
                </Typography>
                <Typography sx={{ mb: 3 }}>{adoptionMessage}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenModal(false);
                    setAdoptionMessage("");
                  }}
                >
                  Close
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmitAdoption}>
                <Typography variant="h6" gutterBottom>
                  🐾 Adopt {product.name}
                </Typography>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                
                <input
                  type="contact"
                  placeholder="Your Contact Number"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={sending}
                  sx={{ mt: 2, borderRadius: 3 }}
                >
                  {sending ? "Sending..." : "Send Request"}
                </Button>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  TextField,
  InputAdornment,
  Skeleton,
  Alert
} from '@mui/material';
import {
  Search,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Pets,
  Close,
  Cake
} from '@mui/icons-material';

const Adopt = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/products');

        const transformedDogs = res.data.map(dog => ({
          ...dog,
          name: dog.name || 'Unnamed Pet',
          image: dog.image?.startsWith('http') ? dog.image : '/placeholder-dog.jpg',
          price: dog.price ?? 'N/A',
          description: dog.description || 'No description available.',
          temperament: dog.temperament
            ? dog.temperament.split(',').map(t => t.trim()).filter(Boolean)
            : [],
          breed: dog.breedGroup || dog.category || 'Mixed Breed',
          location: 'Available for Adoption',
          age: dog.lifeSpan || 'Not specified',
          overallRating: calculateOverallRating(dog)
        }));

        setDogs(transformedDogs);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load pets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  const calculateOverallRating = (dog) => {
    const traits = [dog.friendliness, dog.trainability, dog.exerciseNeeds, dog.groomingNeeds].filter(val => val != null);
    if (traits.length === 0) return 4.0;
    return Math.round((traits.reduce((sum, val) => sum + val, 0) / traits.length) * 10) / 10;
  };

  const toggleFavorite = (dogId) => {
    setFavorites(prev => prev.includes(dogId) ? prev.filter(id => id !== dogId) : [...prev, dogId]);
  };

  const filteredDogs = dogs.filter(dog =>
    dog.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(dog.temperament) && dog.temperament.some(trait =>
      trait.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #fef7ff 100%)', py: 8 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Find Your Perfect Companion
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Browse all our adorable pets waiting for adoption.
          </Typography>

          {/* Search */}
          <Box sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search by name, breed, or traits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }
              }}
            />
          </Box>
        </Box>

        {/* Error */}
        {error && <Alert severity="error" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>{error}</Alert>}

        {/* Dog Grid */}
        {loading ? (
          <Grid container spacing={4}>
            {[...Array(6)].map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}><DogCardSkeleton /></Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={4}>
            {filteredDogs.map(dog => (
              <Grid item xs={12} sm={6} md={4} key={dog._id}>
                <DogCard
                  dog={dog}
                  isFavorite={favorites.includes(dog._id)}
                  onFavoriteToggle={toggleFavorite}
                  onLearnMore={setSelectedDog}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && filteredDogs.length === 0 && dogs.length > 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Pets sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary">No pets found matching your search.</Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSearchTerm('')}>Clear Search</Button>
          </Box>
        )}

        {!loading && dogs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Pets sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>No pets available yet.</Typography>
          </Box>
        )}

        {/* Dog Detail Dialog */}
        <Dialog open={!!selectedDog} onClose={() => setSelectedDog(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          {selectedDog && (
            <DogDetailDialog
              dog={selectedDog}
              onClose={() => setSelectedDog(null)}
              isFavorite={favorites.includes(selectedDog._id)}
              onFavoriteToggle={toggleFavorite}
            />
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

// Dog Card
const DogCard = ({ dog, isFavorite, onFavoriteToggle, onLearnMore }) => {
  const temperamentArray = Array.isArray(dog.temperament) ? dog.temperament : [];

  return (
    <Card sx={{ borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } }}>
      <Box sx={{ position: 'relative', height: 250, width: '100%', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <Box 
        component="img" 
        src={dog.image} 
        alt={dog.name} 
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <IconButton sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'white', '&:hover': { bgcolor: 'white' } }} onClick={() => onFavoriteToggle(dog._id)}>
          {isFavorite ? <Favorite sx={{ color: '#EF4444' }} /> : <FavoriteBorder />}
        </IconButton>
        <Chip label={`GHS ${dog.price}`} sx={{ position: 'absolute', top: 12, left: 12, bgcolor: '#10B981', color: 'white', fontWeight: 600 }} />
      </Box>

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>{dog.name}</Typography>
        <Typography variant="body1" color="primary.main" fontWeight={600} gutterBottom>{dog.breed}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Cake sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{dog.age}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{dog.location}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={3}>
          <Rating value={dog.overallRating} readOnly precision={0.1} size="small" />
          <Typography variant="body2" color="text.secondary">{dog.overallRating}</Typography>
        </Stack>

        {temperamentArray.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              {temperamentArray.slice(0, 3).map((trait, idx) => (
                <Chip key={idx} label={trait} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
              ))}
            </Stack>
          </Box>
        )}

        <Button fullWidth variant="contained" size="large" onClick={() => onLearnMore(dog)} sx={{ mt: 'auto', borderRadius: 3, py: 1.5, background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)', '&:hover': { transform: 'translateY(-2px)' } }}>
          Meet {dog.name}
        </Button>
      </CardContent>
    </Card>
  );
};

// Dog Detail Dialog
const DogDetailDialog = ({ dog, onClose, isFavorite, onFavoriteToggle }) => {
  const temperamentArray = Array.isArray(dog.temperament) ? dog.temperament : [];
  return (
    <DialogContent sx={{ p: 0 }}>
      <IconButton sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'white', zIndex: 1 }} onClick={onClose}><Close /></IconButton>
      <Grid   container spacing={4} >
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <img src={dog.image} alt={dog.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <IconButton sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'white' }} onClick={() => onFavoriteToggle(dog._id)}>
              {isFavorite ? <Favorite sx={{ color: '#EF4444' }} /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>{dog.name}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
              <Chip label={dog.breed} color="primary" />
              <Chip label={dog.age} variant="outlined" />
              <Chip label={`GHS ${dog.price}`} sx={{ bgcolor: '#10B981', color: 'white' }} />
            </Stack>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}>{dog.description}</Typography>

            {temperamentArray.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>Personality Traits</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {temperamentArray.map((trait, idx) => <Chip key={idx} label={trait} variant="outlined" />)}
                </Stack>
              </Box>
            )}

            <Button fullWidth variant="contained" size="large" sx={{ borderRadius: 3, py: 1.5, background: 'linear-gradient(135deg, #7E22CE 0%, #3B82F6 100%)' }}>
              Start Adoption Process
            </Button>
          </Box>
        </Grid>
      </Grid>
    </DialogContent>
  );
};

// Skeleton
const DogCardSkeleton = () => (
  <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={250} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="80%" sx={{ mb: 2 }} />
      <Skeleton variant="text" height={20} width="60%" sx={{ mb: 3 }} />
      <Skeleton variant="rectangular" height={44} sx={{ borderRadius: 3 }} />
    </CardContent>
  </Card>
);

export default Adopt;

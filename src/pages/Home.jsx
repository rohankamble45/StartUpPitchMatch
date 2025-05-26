import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 6, md: 12 },
          pb: { xs: 8, md: 16 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                  fontWeight: 'bold',
                }}
              >
                PitchMatch
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                paragraph
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  mb: { xs: 3, md: 5 },
                }}
              >
                Connecting innovative startups with the right investors. Our smart matching
                system helps you find the perfect match based on industry, stage, and
                investment preferences.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'flex-start' },
                }}
              >
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/startups"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                  }}
                >
                  For Startups
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/investors"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                  }}
                >
                  For Investors
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              {/* Add illustration or image here */}
              <Box
                sx={{
                  height: '400px',
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Platform Illustration
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container 
        sx={{ 
          py: { xs: 6, md: 12 },
          px: { xs: 2, md: 3 },
        }} 
        maxWidth="lg"
      >
        <Typography
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{
            mb: { xs: 4, md: 8 },
            fontSize: { xs: '2rem', md: '2.75rem' },
            fontWeight: 'bold',
          }}
        >
          Why Choose PitchMatch?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Smart Matching',
              description: 'Our algorithm matches startups with investors based on multiple criteria including industry, stage, and investment size.',
              icon: '🎯'
            },
            {
              title: 'Easy Pitch Management',
              description: 'Upload and manage your pitch decks, track investor interactions, and monitor your matching progress.',
              icon: '📊'
            },
            {
              title: 'Investor Dashboard',
              description: 'Investors can set preferences, view matched startups, and manage their investment pipeline efficiently.',
              icon: '💼'
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                elevation={2}
              >
                <Typography variant="h1" gutterBottom sx={{ fontSize: '3rem', mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          mt: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{
              mb: 4,
              opacity: 0.9,
            }}
          >
            Join our platform today and connect with the right partners for your success.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/startups"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Register as Startup
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/investors"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'grey.300',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                px: 4,
                py: 1.5,
              }}
            >
              Register as Investor
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 
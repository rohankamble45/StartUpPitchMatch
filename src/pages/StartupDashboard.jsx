import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Alert,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import { fetchStartup } from '../services/api';

const StartupDashboard = () => {
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStartupData = async () => {
      try {
        // Using startup ID 1 for testing
        const data = await fetchStartup(1);
        setStartupData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStartupData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!startupData) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
                <BusinessIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" component="h1" gutterBottom>
                  {startupData.name}
                </Typography>
                <Chip 
                  label={startupData.stage} 
                  color="primary" 
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={startupData.location} 
                  icon={<LocationOnIcon />}
                  size="small"
                />
              </Box>
            </Box>
            <Typography variant="body1" paragraph>
              {startupData.description}
            </Typography>
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Industry
              </Typography>
              <Chip label={startupData.industry} size="small" />
            </Box>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Matches
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                      5
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Conversations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                      3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Successful Pitches
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                      0.75
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Match Score
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StartupDashboard; 
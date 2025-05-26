import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';

const InvestorDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Investor Profile
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Investment Focus: Technology
              </Typography>
              <Typography variant="body1">
                Preferred Stages: Early, Seed
              </Typography>
              <Typography variant="body1">
                Location: San Francisco
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Matched Startups Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Matched Startups
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                No matched startups yet
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Investment Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Investments
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Deals
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" color="primary">
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Pitches
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InvestorDashboard; 
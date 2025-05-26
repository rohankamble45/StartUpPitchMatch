import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  preferred_industries: Yup.string().required('Preferred industries are required'),
  preferred_stages: Yup.string().required('Preferred stages are required'),
  ticket_size_min: Yup.number()
    .required('Minimum ticket size is required')
    .min(0, 'Must be positive'),
  ticket_size_max: Yup.number()
    .required('Maximum ticket size is required')
    .min(Yup.ref('ticket_size_min'), 'Must be greater than minimum'),
  location: Yup.string().required('Location is required'),
});

const InvestorRegister = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement API call
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Investor Registration
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph align="center">
          Register as an investor to discover promising startups
        </Typography>

        <Formik
          initialValues={{
            name: '',
            bio: '',
            preferred_industries: '',
            preferred_stages: '',
            ticket_size_min: '',
            ticket_size_max: '',
            location: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Full Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="bio"
                    label="Professional Bio"
                    multiline
                    rows={4}
                    fullWidth
                    error={touched.bio && Boolean(errors.bio)}
                    helperText={touched.bio && errors.bio}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="preferred_industries"
                    label="Preferred Industries (comma-separated)"
                    fullWidth
                    error={touched.preferred_industries && Boolean(errors.preferred_industries)}
                    helperText={touched.preferred_industries && errors.preferred_industries}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="preferred_stages"
                    label="Preferred Stages (comma-separated)"
                    fullWidth
                    error={touched.preferred_stages && Boolean(errors.preferred_stages)}
                    helperText={touched.preferred_stages && errors.preferred_stages}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="ticket_size_min"
                    label="Minimum Investment Size ($)"
                    type="number"
                    fullWidth
                    error={touched.ticket_size_min && Boolean(errors.ticket_size_min)}
                    helperText={touched.ticket_size_min && errors.ticket_size_min}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="ticket_size_max"
                    label="Maximum Investment Size ($)"
                    type="number"
                    fullWidth
                    error={touched.ticket_size_max && Boolean(errors.ticket_size_max)}
                    helperText={touched.ticket_size_max && errors.ticket_size_max}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="location"
                    label="Location"
                    fullWidth
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                    >
                      Register as Investor
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default InvestorRegister;

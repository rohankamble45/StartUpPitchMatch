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
  name: Yup.string().required('Company name is required'),
  description: Yup.string().required('Description is required'),
  industry_tags: Yup.string().required('Industry tags are required'),
  stage: Yup.string().required('Stage is required'),
  location: Yup.string().required('Location is required'),
  pitch_deck_url: Yup.string().url('Must be a valid URL'),
});

const StartupRegister = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement API call
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Startup Registration
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph align="center">
          Fill in your startup details to get matched with potential investors
        </Typography>

        <Formik
          initialValues={{
            name: '',
            description: '',
            industry_tags: '',
            stage: '',
            location: '',
            pitch_deck_url: '',
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
                    label="Company Name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="description"
                    label="Company Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="industry_tags"
                    label="Industry Tags (comma-separated)"
                    fullWidth
                    error={touched.industry_tags && Boolean(errors.industry_tags)}
                    helperText={touched.industry_tags && errors.industry_tags}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="stage"
                    label="Current Stage"
                    select
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    error={touched.stage && Boolean(errors.stage)}
                    helperText={touched.stage && errors.stage}
                  >
                    <option value="">Select Stage</option>
                    <option value="ideation">Ideation</option>
                    <option value="MVP">MVP</option>
                    <option value="early_traction">Early Traction</option>
                    <option value="growth">Growth</option>
                    <option value="scale">Scale</option>
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="location"
                    label="Location"
                    fullWidth
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="pitch_deck_url"
                    label="Pitch Deck URL"
                    fullWidth
                    error={touched.pitch_deck_url && Boolean(errors.pitch_deck_url)}
                    helperText={touched.pitch_deck_url && errors.pitch_deck_url}
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
                      Register Startup
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

export default StartupRegister;

import { body, validationResult } from 'express-validator';

export const validateStartup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('industry').trim().notEmpty().withMessage('Industry is required'),
  body('stage').trim().notEmpty().withMessage('Stage is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateInvestor = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('bio').trim().notEmpty().withMessage('Bio is required'),
  body('investment_focus').trim().notEmpty().withMessage('Investment focus is required'),
  body('preferred_stages').trim().notEmpty().withMessage('Preferred stages are required'),
  body('preferred_industries').trim().notEmpty().withMessage('Preferred industries are required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 
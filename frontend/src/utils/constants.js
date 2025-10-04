// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
};

// Application Constants
export const APP_CONFIG = {
  NAME: 'SteroidCheck',
  VERSION: '1.0.0',
  DESCRIPTION: 'Ensuring safe and legal steroid use in milk/meat production',
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  DARK_MODE: 'darkMode',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ABOUT: '/about',
  PREDICTION: '/steroid-dosage-prediction',
  INFO: '/steroid-info',
};

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Animal Types
export const ANIMAL_TYPES = [
  'Cattle',
  'Sheep',
  'Goat',
  'Pig',
  'Chicken',
];

// Steroid Classes
export const STEROID_CLASSES = [
  'Corticosteroids',
  'Anabolic Steroids',
  'Sex Hormones',
  'Thyroid Hormones',
];

// Steroid Names
export const STEROID_NAMES = [
  'Prednisolone',
  'Dexamethasone',
  'Testosterone',
  'Estradiol',
  'Progesterone',
  'Thyroxine',
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PREDICTION_SUCCESS: 'Prediction completed successfully!',
};


import { STORAGE_KEYS } from './constants.js';

// Local Storage Helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Authentication Helpers
export const auth = {
  getToken: () => storage.get(STORAGE_KEYS.TOKEN),
  setToken: (token) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),
  
  getUser: () => storage.get(STORAGE_KEYS.USER),
  setUser: (user) => storage.set(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),
  
  isAuthenticated: () => {
    const token = auth.getToken();
    return token && token !== 'null' && token !== 'undefined';
  },
  
  logout: () => {
    auth.removeToken();
    auth.removeUser();
  },
};

// Form Validation Helpers
export const validation = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password) => {
    return password && password.length >= 6;
  },
  
  name: (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 50;
  },
  
  required: (value) => {
    return value !== null && value !== undefined && value !== '';
  },
  
  number: (value) => {
    return !isNaN(value) && value > 0;
  },
};

// Format Helpers
export const format = {
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  
  formatNumber: (num, decimals = 2) => {
    return parseFloat(num).toFixed(decimals);
  },
};

// Error Handling Helpers
export const errorHandler = {
  getMessage: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },
  
  isNetworkError: (error) => {
    return !error.response && error.request;
  },
  
  isServerError: (error) => {
    return error.response?.status >= 500;
  },
  
  isClientError: (error) => {
    return error.response?.status >= 400 && error.response?.status < 500;
  },
};

// Utility Functions
export const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },
  
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="hero">
        <div className="hero-content">
          <h3 className="hero-title">SteroidCheck</h3>
          <p className="hero-subtitle">
            Ensuring safe and legal steroid use in milk/meat production.
          </p>
          <p className="hero-subtitle">
            Detect, Analyze, and compare with industry standards.
          </p>
          <button
            className="hero-button"
            onClick={() => navigate('/login')}
            aria-label="Navigate to Login Page"
          >
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;

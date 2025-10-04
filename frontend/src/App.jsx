import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import NavBar from '@components/NavBar';
import AboutUs from '@pages/AboutUs';
import LoginRegister from '@pages/LoginRegister';
import HomePage from '@pages/HomePage';
import SteroidDosagePrediction from '@pages/SteroidDosagePrediction'; 
import SteroidInfoPage from '@pages/SteroidInfoPage';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/steroid-dosage-prediction" element={<SteroidDosagePrediction />} />
            <Route path="/steroid-info" element={<SteroidInfoPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
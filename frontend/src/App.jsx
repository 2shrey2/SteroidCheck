import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AboutUs from './pages/AboutUs';
import LoginRegister from './pages/LoginRegister';
import HomePage from './pages/HomePage';
import SteroidDosagePrediction from './pages/SteroidDosagePrediction'; 
import SteroidInfoPage from './pages/SteroidInfoPage';
import './styles.css'; // Import the CSS file

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage authentication state
  const [userName, setUserName] = useState(''); // Manage username state

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginRegister setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          <Route path="/steroid-dosage-prediction" element={<SteroidDosagePrediction />} />
          <Route path="/steroid-info" element={<SteroidInfoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
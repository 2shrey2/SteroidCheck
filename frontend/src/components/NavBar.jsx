import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar = ({ isLoggedIn, userName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleScannerClick = () => {
    if (isLoggedIn) {
      navigate('/steroid-checker');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <span className="text-white text-xl font-bold">
            <span className="italic">Steroid</span>Check
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-white hover:text-gray-400">HOME</Link>
          <Link to="/steroid-dosage-prediction" className="text-white hover:text-gray-400">SCANNER</Link>
          <Link to="/steroid-info" className="text-white hover:text-gray-400">INFO.</Link>
          <Link to="/about" className="text-white hover:text-gray-400">ABOUT US</Link>
        </div>
        <div className="pr-4 flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center text-white focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  {userName.charAt(0)}
                </div>
                <span className="ml-2">{userName}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <Link to="/account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Account</Link>
                  <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="text-white hover:text-gray-400">Login/Signup</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';

const LoginRegister = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', { name: username, email, password });
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="login-register">
      <div className="row">
        <div className="img-holder">
          <div className="info-holder">
            <img src="/assets/login_page_image.jpg" alt="Login/Register" />
          </div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <div className="page-links">
                <a className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</a>
                <a className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</a>
              </div>
              <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={onChange}
                      required
                    />
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-button">
                  <button type="submit" className="ibtn">{isLogin ? 'Log in' : 'Submit'}</button>
                </div>
              </form>
              {error && <div className="error-message">{error}</div>}
              <div className="network-tip">
                <span className="line"></span>
                <span className="or-text">Or</span>
                <span className="line"></span>
              </div>
              <div className="google-signup">
                <button className="google-button">Log in with Google</button>
              </div>
              <script src="https://accounts.google.com/gsi/client" async defer></script>
              <div className="register-link">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <a onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register now' : 'Log in'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

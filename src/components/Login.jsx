import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'; // Create a separate CSS file for Login styles
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleLogin = () => {
    // Check if the username and password are provided
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Perform login logic with the username and password
    axios
      .post('http://localhost:5000/login', { username, password })
      .then((response) => {
        console.log('Login successful:', response.data);
        nav('/user');
        // Redirect the user to the desired page after successful login
      })
      .catch((error) => {
        console.error('Error during login:', error.response.data);
        setError('Invalid username or password');
      });
  };

  const handleResetPassword = () => {
    // Perform reset password logic
    console.log('Reset password clicked');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="text-center">Login</h2>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button onClick={handleLogin} className="btn btn-primary">Login</button>
          <div className="reset-password">
            <Link to="/admin" onClick={handleResetPassword} className="btn btn-link">Reset Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

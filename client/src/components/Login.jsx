import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  

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
     
    axios.post('http://localhost:5000/api/login', { username, password })
  .then(async (response) => {
    console.log(response)
    // Authentication successful
    const user = response.data;
  console.log(user[0].role)
    // Dispatch the LOGIN action with the user information
    dispatch({ type: 'LOGIN', payload: user });
    const role = (user[0].role).toLowerCase();
    // Redirect to the appropriate page based on the user's role
    if (role === 'admin') {
      nav('/admin');
    } else if (role === 'manager') {
      nav('/manager');
    } else if (role === 'agent') {
      nav('/agent');
    } else if (role === 'user') {
      nav('/user');
    }
    setError('you have assigned with incorrect roll');
  })
  .catch((error) => {
    // Authentication failed
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

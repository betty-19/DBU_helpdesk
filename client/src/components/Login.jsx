import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const[user, setUser] = useState([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  //const location = useLocation();
  const[showPendingPage, setShowPendingPage] = useState(false)
  

  

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
      console.log(user.role)
      dispatch({ type: 'LOGIN', payload: user });
  
      // Dispatch the LOGIN action with the user information
      
  
      const role = user.role.toLowerCase();
      const status = user.status;
  
      // Redirect to the appropriate page based on the user's role and status
      if (status ==='waiting'){
        setShowPendingPage(true)
      } else
      if (role === 'admin' && status ==='active') {
        nav('/admin');
      } else if (role === 'manager' && status ==='active') {
        nav('/manager');
      } else if (role === 'agent' && status ==='active') {
        nav('/agent');
      } else if (role === 'user' && status ==='active') {
        nav('/user');
      }
       if (status ==='waiting'){
        setShowPendingPage(true)
      }

      setError('you have assigned with incorrect role');
    })
    .catch((error) => {
      // Authentication failed
      setError('Invalid username or password');
    });
  
   
  };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // Add code to clear any user-related data from local storage or cookies if necessary
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
      {showPendingPage && (
    <div className="modalBackground">
  <div className="modalContainer">
  <div className="titleCloseBtn">
          <button
            onClick={() => {
              setShowPendingPage(false);
            }}
          >
            X
          </button>
        </div>
  <div className="title">
  <h1>Wait for approval of your Account</h1>
        </div>
    <div className="body">
    
    <h4>Until your Account approved by admin, there is no any page that display to you</h4>
    </div>
  </div>
</div>
  )}
    </div>
  );
  
};

export default Login;

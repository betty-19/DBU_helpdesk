import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp";
import User from "./components/user";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/login" element={ <Login />} />  
          <Route path="/signup" element={ <SignUp />} />  
          <Route path="/user" element={<User/>} />     
        </Routes>
      </div>
    </Router>
  );
};

export default App;

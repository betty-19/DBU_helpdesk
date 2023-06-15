import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp";
import User from "./components/user";
import Admin from './components/admin';
import NewUser from './components/newUser'
import Manager from './components/manager'
import CreateTicket from './components/createTicket'
import OpenTickets from './components/openTickets';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/store';



const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/createTicket" element={<CreateTicket />} />
            <Route path="/openTicket" element={<OpenTickets />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

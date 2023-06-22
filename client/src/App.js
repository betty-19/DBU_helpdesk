import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp";
import User from "./components/user/user";
import Admin from './components/admin/admin';
import NewUser from './components/admin/newUser'
import Manager from './components/head/manager';
import CreateTicket from './components/user/createTicket'
import OpenTickets from './components/head/openTickets';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/store';
import DisplayFaq from './components/user/displayFaq';
import Department from './components/head/department';
import ViewTickets from './components/user/viewTickets';
import Agent from './components/agent/agent';
import Chat from './components/chat'
import AssignedTickets from './components/agent/assignedTickets';
import ManageFaq from './components/head/manageFaq';



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
            <Route path="/displayFaq" element={<DisplayFaq/>}/>
            <Route path ="/department" element={<Department/>}/>
            <Route path="/viewTickets" element={<ViewTickets/>}/>
            <Route path ="/agent" element={<Agent/>}/>
            <Route path ="/chat" element={<Chat/>}/>
            <Route path= "/assignedTickets" element={<AssignedTickets/>}/>
            <Route path = "/manageFaq" element = {<ManageFaq/>}/>
           
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

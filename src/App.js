import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isUserAccess } from "./Config/checkUser";

/* User Pages */
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

/* Admin Pages */
import Admin from "./Pages/Admin";
import AdminLogin from './Pages/AdminLogin';
import { isAdminAccess } from './Config/checkAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ isUserAccess() ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/login" element={ isUserAccess() ? <Navigate to="/" /> : <Login /> } />
        <Route path="/signup" element={ isUserAccess() ? <Navigate to="/" /> : <Signup /> } />
        <Route path="/create" element={  isUserAccess() ? <Create /> : <Navigate to="/login" /> } />
        <Route path="/viewpost" element={isUserAccess() ? <ViewPost /> : <Navigate to="/login" />} />
        
        {/* Admin router */}
        <Route path="/admin/login" element={isAdminAccess() ? <Navigate to="/admin" /> : <AdminLogin />} />
        <Route path="/admin/*" element={ isAdminAccess() ? <Admin /> : <Navigate to="/admin/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

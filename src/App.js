// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FilterProvider } from './contexts/FilterContext';

// Corrected imports to use a single location for components
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfileMenu from './components/profile/ProfileMenu';
import EditProfile from './components/profile/EditProfile';
import Notifications from './components/profile/Notifications';
import Support from './pages/Support';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';

// Import CSS
import './App.css';

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfileMenu />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/notifications" element={<Notifications />} />
              <Route path="/support" element={<Support />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </FilterProvider>
    </AuthProvider>
  );
}


export default App;

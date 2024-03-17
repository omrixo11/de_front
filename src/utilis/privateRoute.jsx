import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(state => state?.auth?.isLoggedIn); 

  if (!isAuthenticated) {
    // Store the intended route before redirecting to login
    const intendedRoute = window.location.pathname;
    localStorage.setItem('intendedRoute', intendedRoute);
    return <Navigate to="/login" state={{ intendedRoute }} replace />;
  }

  return element; 
};

export default PrivateRoute;

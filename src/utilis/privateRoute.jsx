import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  // Retrieve the token from localStorage
  const storedToken = localStorage.getItem('authToken');

  // Log the Redux state
  // console.log("Redux state in PrivateRoute:", storedToken);

  if (!storedToken) {
    // Store the intended route before redirecting to login
    const intendedRoute = window.location.pathname;
    console.log('Redirecting to login. Intended route:', intendedRoute);
    localStorage.setItem('intendedRoute', intendedRoute);
    return <Navigate to="/login" state={{ intendedRoute }} replace />;
  }

  // Return the element without wrapping it in Routes
  return element;
};

export default PrivateRoute;

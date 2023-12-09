import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const EmailVerificationCheck = ({ }) => {

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  // console.log("Redux auth state:", auth);
  // console.log("auth.user.isEmailVerified:", auth.user.isEmailVerified);

  useEffect(() => {
    // console.log('Component re-rendered with auth:', auth);
    // Check if user is authenticated and email is not verified
    if (auth.isLoggedIn && auth.user && auth.user.isEmailVerified == false) {
      setErrorMessage(`Votre adresse e-mail n'est pas encore vérifiée.`);
    } else {
      setErrorMessage('');
    } 
  } , [auth]); // Run the effect whenever the 'auth' state changes


  const handleResendVerificationCode = async () => {
    try {
      await authService.resendEmailVerification(auth.user._id, dispatch);
    } catch (error) {
      setErrorMessage('Error resending verification code.');
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          <h5> {errorMessage} </h5>
          <Link
            className="ud-btn btn-dark"
            to="/verify-email-code"
            onClick={handleResendVerificationCode}
          >
            Ciquez ici pour vérifier
          </Link>
        </div>
      )}
    </>
  );
};

export default EmailVerificationCheck;

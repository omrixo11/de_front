import React, { useState } from 'react';
import newsletterService from '@/services/newsletter.service';// Ensure this path matches your file structure

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // Track if the email is valid
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to validate the email format
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const showMessage = (setFunction, message) => {
    setFunction(message);
    setTimeout(() => {
      setFunction('');
    }, 4000); // Clear the message after 3 seconds
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Check if the email is valid before attempting to subscribe
    if (!validateEmail(email)) {
      setIsEmailValid(false); // Set the email validity state to false
      showMessage(setErrorMessage, 'Veuillez entrer une adresse e-mail valide.');
      setSuccessMessage('');
      return; // Stop the function if the email is invalid
    }

    setIsEmailValid(true); // Reset the email validity state to true if it passes validation

    try {
      await newsletterService.subscribe(email);
      showMessage(setSuccessMessage, 'Abonnement réussi ! Merci de vous être abonné.');
      setErrorMessage('');
      setEmail(''); // Clear the input field after successful subscription
    } catch (error) {
      showMessage(setErrorMessage, `Une erreur s'est produite lors de l'abonnement.`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="mailchimp-widget mb-4 mb-lg-5">
      <span className="title text-white" style={{fontWeight: 800}}>Restez à jour</span>
      <div className="mailchimp-style1">
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            className={`form-control mt20 ${!isEmailValid ? 'is-invalid' : ''}`}
            placeholder="Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isEmailValid) setIsEmailValid(true);
            }}
          />
          <button type="submit">S'abonner</button>
        </form>
      </div> 
      {errorMessage && (
          <div className="alert alert-danger mt10" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success mt10" role="alert">
            {successMessage}
          </div>
        )}
    </div>
  );
};

export default Subscribe;

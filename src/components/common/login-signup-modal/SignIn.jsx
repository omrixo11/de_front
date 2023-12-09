import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import authService from "@/services/auth.service";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "@/redux/slices/authSlice";
import axios from "axios";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading/loading";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
      const userEmail = localStorage.getItem('userEmail') || '';
      const userPassword = localStorage.getItem('userPassword') || '';
      setEmail(userEmail);
      setPassword(userPassword);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Call the authentication service to perform sign-in
      const response = await authService.login({ email, password }, dispatch);

      // Dispatch the loginSuccess action to update the Redux state
      dispatch(loginSuccess({ token: response.user.token, user: response.user }));

      // Set the Authorization header for Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.user.token}`;

      // Use Navigate to redirect to the intended route or a default route
      const intendedRoute = location.state?.intendedRoute || '/';
      // console.log(intendedRoute);

      // Save the "Remember Me" state to localStorage
      if (document.getElementById('rememberMeCheckbox').checked) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
      } else {
        // Clear the remembered information if "Remember Me" is not checked
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
      }

      // Redirect based on the intended route
      if (intendedRoute === '/') {
        // If it is the root path, navigate to the "dashboard-home" route
        navigate('/dashboard-home', { replace: true });
      } else {
        // If it's not the root path, navigate to the intended route
        navigate(intendedRoute, { replace: true });
      }

      // Clear the intended route from local storage
      localStorage.removeItem('intendedRoute');

    } catch (error) {
      setLoading(false);
      setErrorMessage(`E-mail ou mot de passe incorrect`);
      setSuccessMessage('');
      console.error("Error during sign-in:", error.message);
    }
  };


  return (
    <>
      {loading && <LoadingSpinner />}
    <form className="form-style1" onSubmit={handleSignIn}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Entrez votre e-mail</label>
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">Entrez votre mot de passe</label>
        <input
          type="password" // Change the input type to "password"
          className="form-control"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* End Password */}
      
      {/* Display error message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Se souvenir de moi
          <input
            type="checkbox"
            defaultChecked={localStorage.getItem('rememberMe') === 'true'}
            id="rememberMeCheckbox" />
          <span className="checkmark" />
        </label>
        <Link className="fz14 ff-heading" to="/forgot-password">
          Mot de passe oublié?
        </Link>
      </div>
      {/* End Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Se connecter<i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      {/* <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div> */}

      <p className="dark-color text-center mb0 mt10">
        Vous n'avez pas encore de compte?{" "}
        <Link className="dark-color fw600" to="/register">
          Créer votre compte.
        </Link>
      </p>
    </form>
    </>
  );
};


export default SignIn;

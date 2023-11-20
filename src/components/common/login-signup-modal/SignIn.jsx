import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import authService from "@/services/auth.service";
import { useDispatch } from 'react-redux';
import { loginSuccess } from "@/redux/slices/authSlice";
import axios from "axios";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Call the authentication service to perform sign-in
      const response = await authService.login({ email, password }, dispatch);

      // Dispatch the loginSuccess action to update the Redux state
      dispatch(loginSuccess({ token: response.user.token, user: response.user }));

      // Set the Authorization header for Axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.user.token}`;

      // Use Navigate to redirect to the intended route or a default route
      const intendedRoute = location.state?.intendedRoute || '/';
      console.log(intendedRoute);
      // navigate(intendedRoute, { replace: true });

      // localStorage.removeItem('intendedRoute');
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
      console.error("Error during sign-in:", error.message);
    }
  };


  return (
    <form className="form-style1" onSubmit={handleSignIn}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password" // Change the input type to "password"
          className="form-control"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* End Password */}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Se connecter<i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      <div className="hr_content mb20">
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
      </div>
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" to="/register">
          Créer votre compte.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;

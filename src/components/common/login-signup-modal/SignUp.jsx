import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/services/auth.service";
import { signupSuccess } from "@/redux/slices/authSlice";
import axios from 'axios';


const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const response = await authService.signup(formData, dispatch);
      console.log('Signup API Response:', response);
  
      dispatch(signupSuccess({ token: response.user.token, user: response.user }));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.user.token}`;
  
      navigate('/dashboard-home');
  
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error
    }
  };
  


  return (
    <form className="form-style1" onSubmit={handleSignUp}>
      {/* Form */}
      <div className="mb25">
        <label className="form-label fw600 dark-color">Nom</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nom ..."
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Prenom</label>
        <input
          type="text"
          className="form-control"
          placeholder="Prenom ..."
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Telephone</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Enter tele"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb20">
        <label className="form-label fw600 dark-color">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          placeholder="Entrer mot de passe"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb20">
        <label className="form-label fw600 dark-color">Confirmer mot de passe</label>
        <input
          type="password"
          className="form-control"
          placeholder="Confirmer mot de passe"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* End Form */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Create account <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* Other buttons and links */}
    </form>
  );
};

export default SignUp;

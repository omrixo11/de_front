import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/services/auth.service";
import { signupSuccess } from "@/redux/slices/authSlice";
import axios from 'axios';
import LoadingSpinner from "@/components/loading/loading";


const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [specialCharError,setSpecialCharError] = useState("")
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lenghtError, setLenghtError] = useState("")

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
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

    // Clear length error if the password length is sufficient
  if (name === "password" && value.length >= 8) {
    setLenghtError("");
  }

  // Clear special character error if the password contains special characters
  if (name === "password" && /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value)) {
    setSpecialCharError("");
  }

  // Clear password error if the passwords match
  if (name === "confirmPassword" && formData.password === value) {
    setPasswordError("");
  }

    const strength = calculatePasswordStrength(value);
    setPasswordStrength(strength);
  };

  const calculatePasswordStrength = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const length = password.length;
  
    if (length < 1) {
      return 0;
    } else {
      const baseStrength = 10;
      const uppercaseStrength = hasUppercase ? 20 : 0;
      const numberStrength = hasNumber ? 20 : 0;
      const specialCharStrength = hasSpecialChar ? 20 : 0;
  
      // Calculate length strength relative to the maximum possible length
      // but make sure the length strength is never more than 60 if there's no special character
      const lengthStrength = Math.min((length / 8) * 60, hasSpecialChar ? 60 : 0);
  
      return baseStrength + uppercaseStrength + numberStrength + specialCharStrength + lengthStrength;
    }
  };
  

  const getStrengthClass = (strength) => {
    if (strength === 0) {
      return 'error';
    } else if (strength < 30) {
      return 'low';
    } else if (strength < 60) {
      return 'medium';
    } else {
      return 'high';
    }
  };

  const renderPasswordStrengthBar = () => {
    const { password } = formData;
    const strength = calculatePasswordStrength(password);

    if (password.length >= 2) {
      return (
        <div className={`password-strength-bar ${getStrengthClass(strength)}`} style={{ width: `${strength}%` }} />
      );
    }
    return null;
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check password length
    if (formData.password.length < 8) {
      setLoading(false);
      setLenghtError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)) {
      setLoading(false);
      setSpecialCharError("Le mot de passe doit contenir au moins un caractère spécial");
      return;
    }

    try {

      const response = await authService.signup(formData, dispatch);
      setLoading(false);
      dispatch(signupSuccess({ token: response.user.token, user: response.user }));

      // Redirect to the verification page
      navigate('/verify-email-code');
    } catch (error) {
      setLoading(false);
      console.error('Error during signup:', error);
      // Handle error
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />} {/* Conditionally render LoadingSpinner */}
      <form className="form-style1" onSubmit={handleSignUp}>
        {/* Form */}
        <div className="mb25">
          <label className="form-label fw600 dark-color">Nom</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre nom"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>

        <div className="mb25">
          <label className="form-label fw600 dark-color">Prénom</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre prénom"
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
            placeholder="Entrez votre email"
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
            placeholder="Entrez votre numéro de téléphone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb25">
          <label className="form-label fw600 dark-color">Adresse</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre adresse"
            name="adress"
            value={formData.adress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrez votre mot de passe"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {renderPasswordStrengthBar()}
          {lenghtError && <div className="error-message">{lenghtError}</div>}
          {specialCharError && <div className="error-message">{specialCharError}</div>}

        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Confirmer mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirmez votre mot de passe"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>

        {/* End Form */}

        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Créer compte<i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* Other buttons and links */}
        <p className="dark-color text-center mb0 mt10">
          vous avez déjà un compte?{" "}
          <Link className="dark-color fw600" to="/login">
            Se Connecter
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;

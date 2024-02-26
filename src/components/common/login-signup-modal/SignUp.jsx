import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/services/auth.service";
import { signupSuccess } from "@/redux/slices/authSlice";
import axios from 'axios';

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [specialCharError, setSpecialCharError] = useState("")

  const [errors, setErrors] = useState({});

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [lenghtError, setLenghtError] = useState("")

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const checkEmailExistence = async (email) => {
    const emailExists = await authService.checkEmailExistence(email);
    return emailExists;
  };

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

  // Handle email input changes
  const handleEmailChange = (value) => {
    // Validate email format
    const isValidEmail = (email) => {
      // Use a simple regex pattern for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    // Validate email format
    if (!isValidEmail(value)) {
      setEmailError("Veuillez saisir une adresse e-mail valide");
    } else {
      // Clear error if input is valid
      setEmailError("");
    }

    // Check if the email already exists
    // checkEmailExistence(value).then((emailExists) => {
    //   if (emailExists) {
    //     setEmailError("Cet email est déjà utilisé par un autre utilisateur");
    //     return;
    //   } else {
    //     // Clear error if input is valid
    //     setEmailError("");
    //   }
    // });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate first name and last name
    if ((name === "firstName" || name === "lastName") && value.length <= 0) {
      if (name === "firstName") {
        setFirstNameError("Le prénom ne peut pas être vide");
      } else if (name === "lastName") {
        setLastNameError("Le nom ne peut pas être vide");
      }
    } else {
      // Clear errors if input is valid
      if (name === "firstName") {
        setFirstNameError("");
      } else if (name === "lastName") {
        setLastNameError("");
      }
    }

    const isValidPhoneNumber = (phoneNumber) => {
      // Use a simple regex pattern for basic phone number validation
      const phoneNumberPattern = /^\d{8}$/;
      return phoneNumberPattern.test(phoneNumber);
    };

    // Validate phone number format
    if (name === "phoneNumber" && !isValidPhoneNumber(value)) {
      setPhoneNumberError("Le numéro de téléphone doit contenir exactement 8 chiffres");
    } else {
      // Clear error if input is valid
      if (name === "phoneNumber") {
        setPhoneNumberError("");
      }
    }

    if (formData.password.length < 8) {
      setLenghtError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

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

    // Check if passwords match
    if (name === "confirmPassword" && formData.password !== value) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    } else {
      // Clear error if input is valid
      if (name === "confirmPassword") {
        setConfirmPasswordError("");
      }
    }

    // Handle email separately
    if (name === "email") {
      handleEmailChange(value);
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

    // Check password length
    if (formData.password.length < 8) {
      setLenghtError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)) {
      setSpecialCharError("Le mot de passe doit contenir au moins un caractère spécial");
      return;
    }

    const emailExists = await checkEmailExistence(formData.email);

    if (emailExists) {
      setEmailError("Cet email est déjà utilisé par un autre utilisateur");
      return;
    } else {
      // Clear error if input is valid
      setEmailError("");
    }

    try {

      const response = await authService.signup(formData, dispatch);
      dispatch(signupSuccess({ token: response.user.token, user: response.user }));

      // Redirect to the verification page
      navigate('/verify-email-code');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <>
      <form className="form-style1" onSubmit={handleSignUp}>
        {/* Form */}
        <div className="mb25">
          <label className="form-label fw600 dark-color">Nom</label>
          <input
            type="text"
            className={`form-control ${firstNameError ? 'error is-invalid' : ''}`}
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
            className={`form-control ${lastNameError ? 'error is-invalid' : ''}`}
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
            className={`form-control ${emailError ? 'error is-invalid' : ''}`}
            placeholder="Entrez votre email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div className="mb25">
          <label className="form-label fw600 dark-color">Telephone</label>
          <input
            type="tel"
            className={`form-control ${phoneNumberError ? 'error is-invalid' : ''}`}
            placeholder="Entrez votre numéro de téléphone"
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
            className={`form-control ${lenghtError ? 'error is-invalid' : ''}`}
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

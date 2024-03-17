import React, { useState } from "react";
import authService from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ChangePasswordForm = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAncien, setErrorAcien] = useState("");
  const userId = useSelector((state) => state.auth?.user?._id)

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password meets length requirement and contains a special character
    if (newPassword.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(newPassword)) {

      setPasswordError("Le mot de passe doit contenir au moins 8 caractères et un caractère spécial");
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      setPasswordError("");
      return;
    }

    // Call API to change the password
    try {
      const response = await authService.changePassword(userId, oldPassword, newPassword, dispatch);

      setPasswordError("");
      setErrorAcien("");
      setSuccessMessage("Mot de passe changé avec succès");
      

      // Clear form fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setPasswordError("");
      setSuccessMessage("");
      setErrorAcien("Mot de passe incorrecte");
    }
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

  const renderPasswordStrengthBar = () => {
    const strength = calculatePasswordStrength(newPassword);

    if (newPassword.length > 0) {
      return (
        <div className={`password-strength-bar ${getStrengthClass(strength)}`} style={{ width: `${strength}%` }} />
      );
    }
    return null;
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

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Ancien mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Ancien mot de passe ..."
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
              required
            />
            {errorAncien && <div className="error-message">{errorAncien}</div>}
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? "error is-invalid" : ""}`}
              placeholder="Nouveau mot de passe ..."
              name="newPassword"
              value={newPassword}
              onChange={handleInputChange}
              required
            />
            {renderPasswordStrengthBar()}
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? "error is-invalid" : ""}`}
              placeholder="Confirmer le nouveau mot de passe ..."
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />

          </div>
        </div>
        {/* End .col */}

        {/* Display success message */}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {/* Display error message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            <p> {errorMessage} </p>
          </div>
        )}


        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Changer le mot de passe
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>

      </div>


    </form>
  );
};

export default ChangePasswordForm;

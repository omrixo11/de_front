import React from "react";
import { useSelector } from 'react-redux';
import { useState } from "react";
import authService from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { updateUserField } from "@/redux/slices/authSlice";

const PersonalInfo = ({ formData, handleChange, handleUpdate, errorMessage, successMessage, changementMessage }) => {

 const auth = useSelector((state) => state.auth);

  const [errorFieldMessage, setErrorFieldMessage] = useState("");

  // State for validation errors
  const [validation, setValidation] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
  });

  const validateForm = () => {
    const newValidation = {
      firstName: !!formData.firstName.trim(),
      lastName: !!formData.lastName.trim(),
      email: !!formData.email.trim(),
      phoneNumber: !!formData.phoneNumber.trim(),
    };

    setValidation(newValidation);

    const isValid = Object.values(newValidation).every(Boolean);
    if (!isValid) {
      setErrorFieldMessage("Tous les champs obligatoires doivent être remplis.");
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorFieldMessage(''); // Clear any existing error messages
    if (validateForm()) {
      // Check if email exists only if it's different from the current email
      if (formData.email !== auth.user.email) {
        try {
          const emailExists = await authService.checkEmailExistence(formData.email);
          if (emailExists) {
            setErrorFieldMessage("Email déjà utilisé. Veuillez choisir un autre email.");
            return; // Stop further execution
          }
        } catch (error) {
          console.error('An error occurred while checking email existence:', error);
        }
      }
      // Proceed with updating user if email does not exist or matches the current email
      handleUpdate(formData.currentPassword);
    }
  };
  

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="row">

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nom
            </label>
            <input
              name="firstName"
              type="text"
              className={`form-control ${validation.firstName ? "" : "error is-invalid"}`}
              placeholder={auth.user.firstName}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Prénom
            </label>
            <input
              name="lastName"
              type="text"
              className={`form-control ${validation.lastName ? "" : "error is-invalid"}`}
              placeholder={auth.user.lastName}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              name="email"
              type="email"
              className={`form-control ${validation.email ? "" : "error is-invalid"}`}
              placeholder={auth.user.email}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              name="phoneNumber"
              type="text"
              className={`form-control ${validation.phoneNumber ? "" : "error is-invalid"}`}
              placeholder={auth.user.phoneNumber}
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nom de votre société
            </label>
            <input
              name="companyName"
              type="text"
              className="form-control"
              placeholder={auth.user.companyName || "Nom de votre société ..."}
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}


        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Adresse
            </label>
            <input
              name="address"
              type="text"
              className="form-control"
              placeholder={auth.user.address || "Adresse ..."}
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              À propos de moi
            </label>
            <textarea
              name="aboutMe"
              cols={30}
              rows={4}
              className="form-control textarea-control"
              placeholder={auth.user.aboutMe || "À propos de moi ..."}
              value={formData.aboutMe}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Lien Facebook
            </label>
            <input
              name="facebookUrl"
              type="text"
              className="form-control"
              placeholder={auth.user.facebookUrl || "Lien Facebook ..."}
              value={formData.facebookUrl}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Lien Instagram
            </label>
            <input
              name="instagramUrl"
              type="text"
              className="form-control"
              placeholder={auth.user.instagramUrl || "Lien Instagram ..."}
              value={formData.instagramUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Lien X (Twitter)
            </label>
            <input
              name="twitterUrl"
              type="text"
              className="form-control"
              placeholder={auth.user.twitterUrl || "Lien Twitter ..."}
              value={formData.twitterUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-6">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Site Web
            </label>
            <input
              name="websiteUrl"
              type="text"
              className="form-control"
              placeholder={auth.user.websiteUrl || "www.exemple.com ..."}
              value={formData.websiteUrl}
              onChange={handleChange}
            />
          </div>
        </div>

        

        <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Mot de passe
            </label>
            <input
              name="currentPassword"
              type="password"
              className="form-control"
              placeholder="Mot de passe ..."
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {changementMessage && (
            <div className="alert alert-warning" role="alert">
              {changementMessage}
            </div>
          )}
          {errorFieldMessage && (
            <div className="alert alert-danger" role="alert">
              {errorFieldMessage}
            </div>
          )}
        </div>

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Mettre à jour
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;

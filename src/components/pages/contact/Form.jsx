import React from "react";
import { useState } from "react";
import contactService from "@/services/contact.service";
import { useNavigate } from "react-router-dom";

const Form = () => {

  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    tele: '',
    message: '',
  });

  // State to track validation status
  const [validation, setValidation] = useState({
    name: true,
    lastName: true,
    email: true,
    tele: true,
    message: true,
  });

  // State to track form submission status
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // State to hold error message
  const [errorMessage, setErrorMessage] = useState("");

  // Validate email format
  const validateEmail = (email) => {
    return email.match(
      // Regular expression to validate email
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  // Validate form before submission
  const isFormValid = () => {
    const newValidation = {
      name: !!formData.name,
      lastName: !!formData.lastName,
      email: !!formData.email && validateEmail(formData.email) !== null,
      tele: !!formData.tele,
      message: !!formData.message,
    };

    setValidation(newValidation);
    return Object.values(newValidation).every(value => value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false); // Reset submission status on new submission attempt
    setErrorMessage(""); // Clear any existing error message
    if (!isFormValid()) {
      return;
    }

    try {
      await contactService.submitContactForm(formData);
      setFormData({
        name: '',
        lastName: '',
        email: '',
        tele: '',
        message: '',
      });
      setValidation({
        name: true,
        lastName: true,
        email: true,
        tele: true,
        message: true,
      });
      setSubmitted(true);
      setSubmitSuccess(true); // Indicate successful submission
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setSubmitted(true);
      setSubmitSuccess(false); // Indicate submission failure
      setErrorMessage("Échec de l'envoi du message. Veuillez réessayer plus tard."); // Set error message in French
    }
  };

  // Update form data and reset validation for the field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidation({ ...validation, [name]: true });
    if (submitted) {
      // Reset submission status when user starts editing form again
      setSubmitted(false);
      setSubmitSuccess(false);
      setErrorMessage(""); // Clear error message
    }
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Prénom
            </label>
            <input
              type="text"
              className={`form-control ${validation.name ? '' : 'error is-invalid'}`}
              placeholder="Votre prénom"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nom
            </label>
            <input
              type="text"
              className={`form-control ${validation.lastName ? '' : 'error is-invalid'}`}
              placeholder="Votre nom"
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              className={`form-control ${validation.email ? '' : 'error is-invalid'}`}
              placeholder="Votre email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Numéro de téléphone</label>
            <input
              type="number"
              className={`form-control ${validation.tele ? '' : 'error is-invalid'}`}
              placeholder="Votre numéro"
              required
              name="tele"
              value={formData.tele}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              Message
            </label>
            <textarea
              cols="30"
              rows="4"
              className={`form-control textarea-control ${validation.message ? '' : 'error is-invalid'}`}
              placeholder="Votre message ici..."
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="d-grid mt20">
            <button onClick={handleSubmit} type="submit" className="ud-btn btn-thm">
              Enoyer
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
      {submitted && submitSuccess && (
        <div className="alert alert-success text-center mt20" role="alert">
          Message envoyé avec succès !
        </div>
      )}
      {submitted && !submitSuccess && (
        <div className="alert alert-danger text-center mt20" role="alert">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default Form;

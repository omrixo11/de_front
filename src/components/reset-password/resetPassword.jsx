import SignUp from "@/components/common/login-signup-modal/SignUp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "@/components/common/MetaData";
import authService from "@/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const metaInformation = {
    title: "Dessa | Réinitialiser mot de passe",
};

const ResetPassword = () => {

    useEffect(() => {
        document.body.style.overflow = "visible";
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.style.display = 'none';
        }
      }, []);

    const dispatch = useDispatch();
    const { resetToken } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [lenghtError, setLenghtError] = useState("")
    const [specialCharError, setSpecialCharError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({ password: "" }); // Add formData state
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

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

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Check password length
        if (formData.password.length < 8) {

            setLenghtError("Le mot de passe doit contenir au moins 8 caractères");
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {

            setPasswordError("Les mots de passe ne correspondent pas");
            return;
        }

        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(formData.password)) {

            setSpecialCharError("Le mot de passe doit contenir au moins un caractère spécial");
            return;
        }

        try {

            // Call the resetPassword method from AuthService
            await authService.resetPassword(resetToken, newPassword, dispatch);
            // Display a success message or redirect the user to a success page
            console.log('Password reset successful');
            setSuccessMessage(`mot de passe réinitialisé avec succès`);

            setErrorMessage('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            // Handle errors (display error message, redirect, etc.)
            console.error('Error resetting password:', error.message);
            setSuccessMessage(``);
            setErrorMessage(`Lien expiré.`);
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
        const { password } = formData;
        const strength = calculatePasswordStrength(password);

        if (password.length > 0) {
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
        <>
            <MetaData meta={metaInformation} />
            {/* Our Compare Area */}
            <section className="our-compare pt60 pb60">
                <img
                    src="/images/icon/login-page-icon.svg"
                    alt="logo"
                    className="login-bg-icon contain"
                    data-aos="fade-right"
                    data-aos-delay="300"
                />
                <div className="container">
                    <div className="row" data-aos="fade-left" data-aos-delay="300">
                        <div className="col-lg-6">
                            <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                                <div className="text-center mb40">
                                    <Link to="/">
                                        <img
                                            className="mb25"
                                            src="/images/header-logo2.svg"
                                            alt="logo"
                                        />
                                    </Link>
                                    <h2>Nouvelle mot de passe</h2>
                                </div>
                                <form className="form-style1" onSubmit={handleResetPassword}>
                                    <div className="mb15">
                                        <label className="form-label fw600 dark-color">Entrer votre nouvelle mot de passe</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            placeholder="Entrez votre nouvelle mot de passe"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                handleInputChange(e);
                                            }}
                                            required
                                        />
                                        {renderPasswordStrengthBar()}
                                        {lenghtError && <div className="error-message">{lenghtError}</div>}
                                        {specialCharError && <div className="error-message">{specialCharError}</div>}
                                    </div>

                                    <div className="mb15">
                                        <label className="form-label fw600 dark-color">Retaper votre nouvelle mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            placeholder="Confirmez votre mot de passe"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                handleInputChange(e);
                                            }}
                                            required
                                        />
                                        {passwordError && <div className="error-message">{passwordError}</div>}
                                    </div>

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
                                            <Link className="fz14 ff-heading" to="/forgot-password">
                                                Envoyer à nouveau ?
                                            </Link>
                                        </div>
                                    )}

                                    <div className="d-grid mb20">
                                        <button className="ud-btn btn-thm" type="submit">
                                            Valider<i className="fal fa-arrow-right-long" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;

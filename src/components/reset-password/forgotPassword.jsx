import SignUp from "@/components/common/login-signup-modal/SignUp";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "@/components/common/MetaData";
import authService from "@/services/auth.service";
import { useSelector } from "react-redux";


const metaInformation = {
    title: "Register  || Homez - Real Estate ReactJS Template",
};

const ForgotPassword = () => {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            // Call the requestPasswordReset method from AuthService
            await authService.requestPasswordReset(email);
            // Display a success message or redirect the user to a success page
            console.log('Password reset email sent successfully');
            setSuccessMessage(`E-mail de réinitialisation du mot de passe envoyé à ${email}`);
           
            setErrorMessage('');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
        
            setErrorMessage(`${email} non trouvé!`);
            setSuccessMessage('');
            // Handle errors (display error message, redirect, etc.)
            console.error('Error sending password reset email:', error.message);
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
                                    <h2>Mot de passe oublie</h2>
                                </div>
                                <form className="form-style1" onSubmit={handleForgotPassword}>
                                    <div className="mb15">
                                        <label className="form-label fw600 dark-color">Entrer votre email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="entrer votre email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Display success message */}
                                    {successMessage && (
                                        <div className="alert alert-success text-center mt10" role="alert">
                                            {successMessage}
                                        </div>
                                    )}
                                    {/* Display error message */}
                                    {errorMessage && (
                                        <div className="alert alert-danger text-center mt10" role="alert">
                                            {errorMessage}

                                            <p className="dark-color text-center mb0 mt10">
                                                Vous n'avez pas encore de compte?{" "}
                                                <Link className="dark-color fw600" to="/register">
                                                    Créer votre compte.
                                                </Link>

                                            </p>

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

export default ForgotPassword;

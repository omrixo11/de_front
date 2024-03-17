import SignUp from "@/components/common/login-signup-modal/SignUp";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "@/components/common/MetaData";
import authService from "@/services/auth.service";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const metaInformation = {
  title: "Dessa | Verifier email",
};

const VerfyEmailPage = () => {

  useEffect(() => {
    document.body.style.overflow = "visible";
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.style.display = 'none';
    }
  }, []);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  // console.log("Redux auth state:", auth);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [verificationCode, setVerificationCode] = useState('');
  const userIdFromSignup = useSelector(state => state.auth?.user?._id);

  const handleVerifyCode = async (e) => {
   
    e.preventDefault();
    try {
      console.log("userIdFromSignup", userIdFromSignup);
      const user = await authService.verifyEmailCode(userIdFromSignup, verificationCode, dispatch);
      console.log('User after email verification:', user);
     
      setErrorMessage(``);
      setSuccessMessage('Votre e-mail a été vérifié');

      setTimeout(() => {
        navigate('/dashboard-home');
      }, 1500);

    } catch (error) {
      
      setErrorMessage(`Code expiré ou incorrect.`);
      setSuccessMessage('');
      error
    }
  };

  const handleResendCode = async () => {

    try {
      // Call the authService method to resend the verification code
      await authService.resendEmailVerification(userIdFromSignup, dispatch);
      setSuccessMessage("Code de vérification envoyé avec succès.\nVeuillez vérifier votre email.");
      setErrorMessage("");
    } catch (error) {
     
      setErrorMessage("Erreur lors de l'envoi du code de vérification.");
      setSuccessMessage("");
      console.error("Error resending verification code:", error);
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
                  <h2>Confirmer votre e-mail</h2>
                  <p>Veuillez vérifier votre e-mail pour le code</p>
                </div>
                <form className="form-style1" onSubmit={handleVerifyCode}>
                  <div className="mb15">
                    <label className="form-label fw600 dark-color">Entrer votre code (6 chiffres)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Entrez votre code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  <label className="form-label dark-color">
                  <Link className="fz14 ff-heading" onClick={handleResendCode}>
                  Envoyer à nouveau?
                  </Link>
                  </label>
          

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

export default VerfyEmailPage;

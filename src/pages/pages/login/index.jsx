import SignIn from "@/components/common/login-signup-modal/SignIn";

import { Link } from "react-router-dom";
import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa - Se Connecter",
  description: "Accédez à votre compte Dessa pour découvrir nos services immobiliers exclusifs. Se connecter vous permet de personnaliser votre expérience de recherche de propriété, sauvegarder vos favoris et bien plus encore. Connectez-vous maintenant pour une expérience immobilière simplifiée."

};

const Login = () => {
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
                  <h2>Se connecter</h2>
                  <p className="text">
                    Connectez-vous à Dessa
                  </p>
                </div>
                <SignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

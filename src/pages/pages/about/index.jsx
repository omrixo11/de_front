import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";
import Features from "@/components/pages/about/Features";
import FunFact from "@/components/pages/about/FunFact";
import Mission from "@/components/pages/about/Mission";

import { Link } from "react-router-dom";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa - À Propos de nous",
  description: "Découvrez Dessa, votre partenaire immobilier de confiance. Apprenez-en plus sur notre mission, notre vision, et pourquoi nous sommes le choix privilégié pour trouver ou vendre votre propriété."

};

const About = () => {
  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="breadcumb-section2 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">À propos de nous</h2>
                <div className="breadcumb-list">
                  <a href="#">Acceuil</a>
                  <a href="#">À Propos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Sections */}

      {/* Our About Area */}
      <section className="our-about pb90">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              <h2>
                Nous sommes en mission
                pour changer la vision du secteur immobilier.
              </h2>
            </div>
            <div className="col-lg-6">
              <p className="text mb25">
                Dessa est bien plus qu'un simple projet ; c'est une initiative portée par
                OTS - Omri Tech Solutions, une Société Unipersonnelle à Responsabilité Limitée (SUARL),
                établie en 2024. Notre objectif principal est de faciliter la rencontre
                entre les agents immobiliers et les clients. À travers notre plateforme,
                nous offrons une expérience fluide et transparente, permettant aux professionnels
                de l'immobilier de se connecter aisément avec les acheteurs et les vendeurs potentiels.
              </p>
              <p className="text mb55">
                En mettant l'accent sur l'innovation et le service client, nous nous engageons
                à repenser le processus immobilier. Nous croyons fermement que chaque transaction
                devrait être non seulement efficace, mais aussi enrichissante pour toutes les parties impliquées.
                C'est pourquoi nous nous efforçons de simplifier les procédures, d'offrir des outils
                et des ressources adaptés, et de favoriser un environnement propice à la réussite.
              </p>
              <p className="text mb55">
                Chez Dessa, nous sommes convaincus que l'avenir de l'immobilier réside dans
                une approche collaborative et centrée sur les besoins des clients.
                Nous aspirons à créer des opportunités fructueuses pour tous, tout en offrant
                un service de qualité supérieure. Rejoignez-nous dans cette aventure
                alors que nous redéfinissons ensemble le paysage immobilier.
              </p>
              {/* <div className="row">
                <Mission />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="our-about pb90">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-6">
              <h2>
              Mention Légale
                
              </h2>
            </div>
            <div className="col-lg-6">
              <p className="text mb25">
              Dessa, une plateforme spécialisée dans le domaine des affaires immobilières,
              créée par OTS - Omri Tech Solutions, une société SUARL enregistrée en Tunisie.
              </p>
              <p className="text mb55">
              Ses droits d'auteur sont protégés par l'Institut National de la Normalisation
              et de la Propriété Industrielle INNORPI.
              </p>
              
              
            </div>
          </div>
        </div>
      </section> */}
    
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                  Nos avantages<br className="d-none d-md-block" />{" "}
     
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                {/* <Link to="#" className="ud-btn btn-dark">
                  Learn More
                  <i className="fal fa-arrow-right-long" />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Our Partners */}
      <section className="pt30 pb-0">
      <CallToActions />
      </section>
      {/* End Our Partners */}

      {/* Our CTA */}
      
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;

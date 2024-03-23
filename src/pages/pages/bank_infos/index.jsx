import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


import MetaData from "@/components/common/MetaData";
import { FaRegCheckCircle } from "react-icons/fa";

const metaInformation = {
    title: "Dessa - Informations Bancaires",
    description: "Consultez les informations bancaires pour effectuer un virement bancaire vers Dessa. Obtenez les détails de la banque, de l'agence, du RIB et de l'IBAN pour faciliter la transaction.",
};


const BankInfos = () => {

    const location = useLocation();
    const successMessage = location.state?.message;

    return (
        <>
            <MetaData meta={metaInformation} />
            {/* Main Header Nav */}
            <DefaultHeader />
            {/* End Main Header Nav */}

            {/* Mobile Nav  */}
            <MobileMenu />
            {/* End Mobile Nav  */}

            {/* Pricing Section Area */}
            <section className="our-pricing pb50 pt-5">
                <div className="container">

                    {successMessage && (
                        <div className="text-center mb20">
                            <h3 style={{ color: '#28a745' }}>Toutes nos félicitations!</h3>
                            <p>{successMessage}</p>
                            <div style={{ fontSize: '2rem', color: '#28a745' }}>
                                <FaRegCheckCircle />
                            </div>
                        </div>
                    )}

                    <div className="row " data-aos="fade-up" data-aos-delay="100">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="main-title text-center mb30">
                                <h3>Informations Bancaires</h3>
                                <p className="bank-info-description">Vous pouvez effectuer le virement bancaire en utilisant les informations suivantes :</p>
                                <div className="bank-details mt30">
                                    <p className="bank-detail"><strong>Banque :</strong> UIB</p>
                                    <p className="bank-detail"><strong>Agence :</strong> Ain Zaghouan</p>
                                    <p className="bank-detail"><strong>RIB :</strong> 12 072 00 00033034467 04</p>
                                    <p className="bank-detail"><strong>IBAN :</strong> TN51 12 072 00 00033034467 04</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Pricing Section Area */}

            {/* Our CTA */}
            <CallToActions />
            {/* Our CTA */}

            {/* Start Our Footer */}
            <section className="footer-style1 pt60 pb-0">
                <Footer />
            </section>
            {/* End Our Footer */}
        </>
    );
};

export default BankInfos;

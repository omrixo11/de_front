import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import { Link } from "react-router-dom";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
    title: "Dessa | Paiement réussi",
};

const BankInfos = () => {
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

            {/* End Breadcrumb Sections */}

            {/* Pricing Section Area */}
            <section className="our-pricing pb50 pt-5">
                <div className="container">
                    <div className="row" data-aos="fade-up" data-aos-delay="100">
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

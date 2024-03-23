import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AddPropertyTabContent from "@/components/property/dashboard/dashboard-add-property";

import MetaData from "@/components/common/MetaData";
import EmailVerificationCheck from "@/components/email-verification/emailVerificationCheck";
import PlanCheck from "@/components/plan-check/plan-check";

const metaInformation = {
  title: "Dessa dashboard - Ajouter une propriété",
  description: "Ajoutez facilement une nouvelle propriété sur Dessa. Utilisez notre interface intuitive pour saisir les détails de votre propriété, télécharger des photos, et soumettre votre annonce pour attirer des acheteurs ou locataires potentiels."

};

const DashboardAddProperty = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content property-page bgc-f7">
              <div className="row pb40 d-block d-lg-none">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Ajouter une nouvelle annonce</h2>
                    <p className="text">Nous sommes heureux de vous revoir !</p>
                  </div>
                  <EmailVerificationCheck/>
                  <PlanCheck/>
                </div>
              </div>
              {/* End .row */}
              
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                    <div className="navtab-style1">
                      <AddPropertyTabContent />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardAddProperty;

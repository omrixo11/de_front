import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import RecentActivities from "@/components/property/dashboard/dashboard-home/RecentActivities";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import PropertyViews from "@/components/property/dashboard/dashboard-home/property-view";
import { useState, useEffect } from "react";
import MetaData from "@/components/common/MetaData";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import EmailVerificationCheck from "@/components/email-verification/emailVerificationCheck";
import PlanCheck from "@/components/plan-check/plan-check";


const metaInformation = {
  title: "Dessa dashboad - Acceuil",
  description: "Bienvenue sur le tableau de bord de Dessa. Gérez efficacement vos propriétés, consultez vos activités récentes et profitez de fonctionnalités avancées pour maximiser votre présence sur le marché immobilier."

};

const DashboardHome = () => {


  const auth = useSelector((state) => state.auth);
  const isOnPlan = auth.user?.isOnPlan;
  const userPlan = useSelector(state => state?.auth?.user?.plan?.planName);

  console.log("Redux auth state:", auth);
  // console.log("auth.user.isEmailVerified:", auth.user.isEmailVerified);

  const lastName = auth.user ? auth.user.lastName : '';


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
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Salut, {lastName}!</h2>
                    <p className="text">Nous sommes heureux de vous revoir !</p>
                    {/* Display error message */}
                    <EmailVerificationCheck />
                    <PlanCheck />
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              <div className="row">
                <TopStateBlock />
              </div>
              {/* End .row */}

              <div className="row">
                <div >
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    {
                      isOnPlan && userPlan === 'Entreprise' ? (
                        <PropertyViews />
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          L'accès aux analyses détaillées est une fonctionnalité de nos abonnements Entreprise. Veuillez <Link to="/pricing">mettre à niveau votre abonnement</Link> pour accéder à cette fonctionnalité.
                        </div>
                      )
                    }
                  </div>
                </div>
                {/* End col-xl-8 */}

                {/* <div className="col-xl-4">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb25">Recent Activities</h4>
                   
                  </div>
                </div> */}
                {/* End .col-xl-4 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardHome;

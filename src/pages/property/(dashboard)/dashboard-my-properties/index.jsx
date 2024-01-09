import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import FilterHeader from "../../../../components/property/dashboard/dashboard-my-properties/FilterHeader";
import PropertyDataTable from "@/components/property/dashboard/dashboard-my-properties/PropertyDataTable";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";

import MetaData from "@/components/common/MetaData";
import propertyService from "@/services/property.service";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
const metaInformation = {
  title: "Dashboard Properties || Homez - Real Estate ReactJS Template",
};

const DashboardMyProperties = () => {

  const [articles, setArticles] = useState([]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Function to fetch articles
  const fetchArticles = async () => {
    console.log("auth:::::", auth.user);
    try {
      const userId = auth.user._id; 
      const authToken = auth.user.token; 

      const fetchedUserArticles = await propertyService.getUserArticles(userId, authToken);
      console.log('Fetched User Articles:', fetchedUserArticles);
      setArticles(fetchedUserArticles);
    } catch (error) {
      console.error('Error fetching user articles:', error);
    }
  };


  // Function to delete an article
  const deleteArticle = async (articleId) => {
  try {
      const authToken = auth.user.token;
    // Call the deleteUserArticle function from the service
    await propertyService.deleteUserArticle(articleId, authToken);
    // After deletion, fetch the updated list of articles
    fetchArticles();
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};

  // useEffect to fetch articles when the component mounts
  useEffect(() => {
    fetchArticles();
  }, []); // Empty dependency array means it only runs once when the component mounts


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
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>Mes Propriétés</h2>
                    <p className="text">Nous sommes heureux de vous revoir!</p>
                  </div>
                </div>
                <div className="col-xxl-9">
                  <FilterHeader />
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      <PropertyDataTable
                        properties={articles}
                        deleteArticle={deleteArticle}
                      />
                      <div className="mt30">
                        <Pagination />
                      </div>
                    </div>
                  </div>
                </div>
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

export default DashboardMyProperties;

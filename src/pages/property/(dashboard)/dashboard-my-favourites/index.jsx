import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ListingsFavourites from "@/components/property/dashboard/dashboard-my-favourites/ListingsFavourites";
import MetaData from "@/components/common/MetaData";
import userService from "@/services/user.service";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


const metaInformation = {
  title: "Dessa dashboard | Mes favoris",
};

const DashboardMyFavourites = () => {

  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initial page
  const itemsPerPage = 8; // Set how many items you want per page
  const userId = useSelector((state) => state.auth?.user?._id);
  const token = useSelector((state) => state.auth?.user?.token);

  // Moved fetchFavorites definition here
  const fetchFavorites = async () => {
    try {
      const fetchedFavorites = await userService.getFavoriteArticles(userId, token);
      setFavorites(fetchedFavorites);
    } catch (error) {
      console.error('Error fetching favorite listings:', error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchFavorites();
    }
  }, [userId, token, currentPage]); // Remove currentPage if it's not needed for fetching favorites

  // Calculate the currentItems for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Mes favoris</h2>
                    <p className="text">Nous sommes heureux de vous revoir!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row mb-0">
                <ListingsFavourites listings={currentItems} />
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="mt30">
                    <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} />
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

export default DashboardMyFavourites;

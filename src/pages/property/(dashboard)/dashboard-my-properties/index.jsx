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
  title: "Dessa dashboard - Mes Propriétés",
  description: "Gérez vos propriétés listées sur Dessa facilement depuis votre tableau de bord. Visualisez, éditez et ajoutez de nouvelles annonces pour maximiser votre visibilité et atteindre des acheteurs potentiels efficacement."

};

const DashboardMyProperties = () => {

  const [articles, setArticles] = useState([]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');


  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  // Function to fetch articles
  const fetchArticles = async () => {
    try {
      const userId = auth?.user?._id;
      const authToken = auth.user.token;
      const fetchedUserArticles = await propertyService.getUserArticles(userId, authToken);

      // Check if fetchedUserArticles is an array before setting it
      if (Array.isArray(fetchedUserArticles)) {
        console.log('Fetched User Articles:', fetchedUserArticles);
        setArticles(fetchedUserArticles);
      } else {
        // If it's not an array, you can set it to an empty array or handle the error as appropriate
        setArticles([]);
        console.error('Fetched User Articles is not an array');
      }
    } catch (error) {
      console.error('Error fetching user articles:', error);
      setArticles([]); // Ensure articles is set to an array even on error
    }
  };

  const filteredArticles = articles.filter((article) => {
    // Convert search term to lower case for case-insensitive comparison
    const searchTermLower = searchTerm.toLowerCase();

    const titleMatches = article.title?.toLowerCase().includes(searchTermLower);

    // Assuming propertyType is an array of strings; adjust if your data model is different
    const propertyTypeMatches = article.propertyType?.some(type =>
      type?.toLowerCase().includes(searchTermLower)
    );

    const transactionTypeMatches = article.transactionType?.toLowerCase().includes(searchTermLower);

    const etatProprieteMatches = article.EtatPropriete?.toLowerCase().includes(searchTermLower);

    const villeNameMatches = article.ville?.name?.toLowerCase().includes(searchTermLower);

    const quartierNameMatches = article.quartier?.name?.toLowerCase().includes(searchTermLower);

    return titleMatches || propertyTypeMatches || transactionTypeMatches || etatProprieteMatches || villeNameMatches || quartierNameMatches;
  });

  const filteredAndSortedArticles = filteredArticles.sort((a, b) => {
    switch (sortOption) {
      case 'dateCreationAsc':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'prixCroissant':
        return a.price - b.price;
      case 'prixDecroissant':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Function to delete an article
  const deleteArticle = async (articleId) => {
    try {
      const authToken = auth?.user?.token;
      // Call the deleteUserArticle function from the service
      await propertyService.deleteUserArticle(articleId, authToken, dispatch);
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


  // Add state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(8);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredAndSortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);


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
                    <h2>Mes Annonces</h2>
                    <p className="text">Nous sommes heureux de vous revoir!</p>
                  </div>
                </div>
                <div className="col-xxl-9">
                  <FilterHeader onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
                </div>
              </div>
              {/* End .row */}

              {articles.length > 0 ? (
                <div className="row">
                  <div className="col-xl-12">
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <div className="packages_table table-responsive">
                        <PropertyDataTable
                          properties={currentArticles}
                          deleteArticle={deleteArticle}
                        />
                        <div className="mt30">
                          <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                <h3>Vous n'avez pas encore d'annonces.</h3>
              )}

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

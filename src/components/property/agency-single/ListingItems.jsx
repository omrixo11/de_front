import React, { useEffect, useState } from 'react';
import ListingItems from '../ListingItems';
import { Link } from 'react-router-dom';

const ListingItemsContainer = ({ articles = [] }) => {
  const [currentCategory, setCurrentCategory] = useState('Tout');
  const [pageData, setPageData] = useState([]);

  useEffect(() => {

    switch (currentCategory) {
      case 'Tout':
        setPageData(articles.slice(0, 4));
        break;
      case 'Vente':
        setPageData(articles.filter(article => article.transactionType === 'Vente').slice(0, 4));
        break;
      case 'Location':
        setPageData(articles.filter(article => article.transactionType === 'Location').slice(0, 4));
        break;
      case 'Location Vacances':
        setPageData(articles.filter(article => article.transactionType === 'Location Vacances').slice(0, 4));
        break;
      default:
        setPageData(articles.slice(0, 4)); // Default to showing all but limit to first 4 for performance
        break;
    }
  }, [currentCategory, articles]); // Reacting to changes in articles or category

  return (
    <div className="row align-items-center mt20">
      <div className="col-sm-4">
        <h6 className="fz17">{pageData.length} Annonce(s)</h6>
      </div>
      <div className="col-sm-8">
        <div className="dark-light-navtab style4 mt-0 mt-lg-4 mb30">
          <ul className="nav nav-pills justify-content-start justify-content-sm-end" role="tablist">
            <li className="nav-item" role="presentation">
              <button className={currentCategory === 'Tout' ? "nav-link active" : "nav-link"} onClick={() => setCurrentCategory('Tout')}>Tout</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={currentCategory === 'Location' ? "nav-link active" : "nav-link"} onClick={() => setCurrentCategory('Location')}>Location</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={currentCategory === 'Vente' ? "nav-link me-0 active" : "nav-link me-0"} onClick={() => setCurrentCategory('Vente')}>Vente</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className={currentCategory === 'Location Vacances' ? "nav-link me-0 active" : "nav-link me-0"} onClick={() => setCurrentCategory('Location Vacances')}>Vacances</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" role="tabpanel">
            <div className="row">
              <ListingItems data={pageData} />
            </div>
          </div>
        </div>
        {/* <div className="d-grid pb30 bdrb1">
          <Link to="/properties" className="ud-btn btn-white2">
            Show all {articles.length} properties
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ListingItemsContainer;

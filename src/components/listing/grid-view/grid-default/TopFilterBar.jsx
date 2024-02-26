import React from "react";

const TopFilterBar = ({ setCurrentSortingOption, setColstyle, colstyle, pageContentTrac }) => {
  const handleSortingChange = (e) => {
    setCurrentSortingOption(e.target.value);
  };

  const handleViewChange = (isGrid) => {
    setColstyle(isGrid);
  };

  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Affichage de {pageContentTrac[0]}-{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} sur {pageContentTrac[2]} résultat(s)
          </p>
        </div>
      </div>

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Trier par</span>
            <select className="form-select" onChange={handleSortingChange}>
              <option value="Newest">Plus récent</option>
              <option value="Oldest">Plus ancien</option>
              <option value="Price Low to High">Prix croissant</option>
              <option value="Price High to Low">Prix décroissant</option>
            </select>
          </div>
          <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor ${!colstyle ? 'menuActive' : ''}`} onClick={() => handleViewChange(false)}>
            Grille
          </div>
          <div className={`pl15 d-none d-md-block cursor ${colstyle ? 'menuActive' : ''}`} onClick={() => handleViewChange(true)}>
            Liste
          </div>
        </div>
      </div>
    </>
  );
};

export default TopFilterBar;

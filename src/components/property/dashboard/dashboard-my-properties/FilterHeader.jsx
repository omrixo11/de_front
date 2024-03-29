import React from "react";
import { Link } from "react-router-dom";

const FilterHeader = ({ onSearchChange, onSortChange }) => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Rechercher..."
            required
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
        <span style={{ minWidth: "70px" }} className="title-color">Trier par:</span>
            <select
              className="form-select show-tick"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="">Selectionner</option>
              <option value="dateCreationAsc">Date de creation</option>
              <option value="prixCroissant">Prix croissant</option>
              <option value="prixDecroissant">Prix decroissant</option>
            </select>
        </div>
      </div>
      {/* <Link to="/dashboard-add-property" className="ud-btn btn-thm">
        Ajouter une nouvelle propriété
        <i className="fal fa-arrow-right-long" />
      </Link> */}
    </div>
  );
};

export default FilterHeader;

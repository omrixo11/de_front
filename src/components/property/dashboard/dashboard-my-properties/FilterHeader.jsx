import React from "react";
import { Link } from "react-router-dom";

const FilterHeader = () => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Search"
            required
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            Trier par:
          </span>
          <select className="form-select show-tick">
            <option>Date de creation</option>
            <option>Prix croissant</option>
            <option>Prix decroissant</option>
          </select>
        </div>
      </div>
      <Link to="/dashboard-add-property" className="ud-btn btn-thm">
        Ajouter une nouvelle propriété 
        <i className="fal fa-arrow-right-long" />
      </Link>
    </div>
  );
};

export default FilterHeader;

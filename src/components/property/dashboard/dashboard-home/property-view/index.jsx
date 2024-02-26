import React from "react";
import VilleChart from "./VilleChart";
import QuartierChart from "./QuartierChart";

const PropertyViews = () => {
  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <div className="d-sm-flex align-items-center justify-content-between">
          <h4 className="title fz17 mb20">Property Views</h4>
          <ul
            className="nav nav-tabs border-bottom-0 mb30"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="hourly-tab"
                data-bs-toggle="tab"
                href="#hourly"
                role="tab"
                aria-controls="hourly"
                aria-selected="true"
              >
                Ville
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="weekly-tab"
                data-bs-toggle="tab"
                href="#weekly"
                role="tab"
                aria-controls="weekly"
                aria-selected="false"
              >
                Quartier
              </a>
            </li>
          </ul>
        </div>
        {/* End nav-tabs */}

        <div className="tab-content" id="myTabContent2">
          <div
            className="tab-pane fade show active"
            id="hourly"
            role="tabpanel"
            aria-labelledby="hourly-tab"
            style={{ height: "500px", maxHeight: "100%" }}
          >
            <VilleChart/>
          </div>
          {/* End tab-pane */}

          <div
            className="tab-pane fade w-100"
            id="weekly"
            role="tabpanel"
            aria-labelledby="weekly-tab"
            style={{ height: "500px" }}
          >
            <div className="chart-container">
              <QuartierChart/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PropertyViews;

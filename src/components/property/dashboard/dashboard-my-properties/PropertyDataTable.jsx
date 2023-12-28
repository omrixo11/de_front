

import { Link } from "react-router-dom";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useEffect } from "react";
import propertyService from "@/services/property.service";
import { useState } from "react";


const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = () => {

  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await propertyService.getAllArticles();
        console.log("articles::::", articles);
        setPropertyData(articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Chambres</th>
          <th scope="col">Transaction</th>
          <th scope="col">Ville</th>
          <th scope="col">Quartier</th>
          <th scope="col">Créer le</th>
          <th scope="col"> </th>

        </tr>
      </thead>
      <tbody className="t-body">
        {propertyData.map((property) => (
          <tr key={property.id}>
            <th scope="row">
              <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                <div className="list-thumb">

                  {property.images && property.images.length > 0 && (
                    <img
                      className="w-100"
                      src={property.images[0]}
                      alt="property"
                    />
                  )}

                </div>
                <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                  <div className="h6 list-title">
                    <Link to={`/single-v1/${property.id}`}>{property.title}</Link>
                  </div>

                  {property.propertyType.map((type, index) => (
                    <span className="text-muted ml-2" key={index}>
                      {type}{index !== property.propertyType.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  
                  <div className="list-price">
                    <a href="#">{property.price} DT</a>
                  </div>
                </div>
              </div>
            </th>
            <td className="vam">
              {property.bedrooms} Chambre(s)
            </td>
            <td className="vam">
              {property.transactionType}
            </td>
            <td className="vam">
              {property.ville.name}
            </td>
            <td className="vam">
              {property.quartier.name}
            </td>
            <td className="vam">
              {new Date(property.createdAt).toLocaleString()}
            </td>
            <td className="vam">
              <div className="d-flex">
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${property.id}`}
                >
                  <span className="fas fa-pen fa" />
                </button>
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${property.id}`}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`edit-${property.id}`}
                  place="top"
                  content="Modifier"
                />
                <ReactTooltip
                  id={`delete-${property.id}`}
                  place="top"
                  content="Supprimer"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyDataTable;

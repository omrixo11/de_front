

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";


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

const PropertyDataTable = ({ properties, deleteArticle }) => {

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const showConfirmation = (propertyId) => {
    setArticleToDelete(propertyId);
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setArticleToDelete(null);
    setConfirmationVisible(false);
  };

  const handleDelete = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete);
      hideConfirmation();
    }
  };

  return (
    <>
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Chambres</th>
            <th scope="col">Transaction</th>
            <th scope="col">Ville</th>
            <th scope="col">Quartier</th>
            <th scope="col">Créer le</th>
            <th scope="col">Vues</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody className="t-body">
          {properties ? (
            properties.map((property) => (
              <tr key={property._id}>
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
                        <Link to={`/single-v1/${property._id}`}>{property.title}</Link>
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
                  {property.viewsCount}
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
                      data-tooltip-id={`delete-${property._id}`}
                      onClick={() => showConfirmation(property._id)}
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
            ))
          ) : (
            <tr>
              <td colSpan="7">No properties available</td>
            </tr>
          )}

        </tbody>

      </table>
      <div className={`modal fade ${confirmationVisible ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: confirmationVisible ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="btn-close" onClick={hideConfirmation} />
            </div>
            <div className="modal-body">
           Êtes-vous sûr de vouloir supprimer cette annonce ?
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-thm ml20" onClick={hideConfirmation}>
                Annuler
              </button>
              <button type="button" className="ud-btn btn-white ml20" onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDataTable;

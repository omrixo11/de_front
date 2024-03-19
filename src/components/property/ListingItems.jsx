

import { Link } from "react-router-dom";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

const ListingItems = ({ data }) => {
  return (
    <>
      {data?.map((listing) => (
        <div className="col-md-4" key={listing.id}>
          <div className="listing-style1">
            <div className="list-thumb">
              <Link to={`/single-v1/${listing?._id}`}>
                <img
                  style={{ height: "230px" }}
                  className="w-100  cover"
                  src={listing?.images && listing?.images?.length > 0 ? listing?.images[0] : 'fallback_image_url'}
                  alt="listings"
                />
              </Link>
              <div className="sale-sticker-wrap">
                {listing.featured && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    Sponsorisée
                  </div>
                )}
              </div>

              <div className="list-price">
                {listing.price} {listing.transactionType === 'Location' ? 'DT / Mois' : 'DT'}
              </div>

            </div>
            <div className="list-content">
              <h6 className="list-title">
                <Link to={`/single-v1/${listing?.id}`}>{listing?.title}</Link>
              </h6>
              <span>{listing.propertyType}</span>
              <p className="list-text">{listing?.ville.name} | {listing?.quartier.name}</p>
              <div className="list-meta d-flex align-items-center">
                <a href="#">
                  <span className="flaticon-bed" /> {listing?.bedrooms} Chambre(s)
                </a>
                <a href="#">
                  <span className="flaticon-expand" /> {listing?.surface} m²
                </a>
                <a href="#">
                  <span className="flaticon-clock" />{formatDistanceToNow(listing?.createdAt, { locale: fr, addSuffix: true })}
                </a>
              </div>

              <hr className="mt-2 mb-2" />
              <div className="list-meta2 d-flex justify-content-between align-items-center">
                <span className="for-what">
                  {listing?.transactionType === 'Location' ? 'À Louer' : 'À Vendre'}
                </span>
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <div className="icons d-flex align-items-center">
                    <Link to={`/single-v1/${listing?._id}`} target="_blank" rel="noopener noreferrer">
                      <span className="flaticon-new-tab" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListingItems;

// PropertyHeader.jsx
import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';
import React from "react";

const PropertyHeader = ({ articleData }) => {


  console.log("article data::", articleData);
  const createdAtDate = articleData?.createdAt ? new Date(articleData.createdAt) : null;
  console.log('createdAtDate:', createdAtDate); // Add this line for debugging

  const formatPrice = (price) => {
    return price ? parseFloat(price).toLocaleString('en-US') : null;
  };

  return (

    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{articleData?.title}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {articleData?.ville.name}, {articleData?.quartier.name}
            </p>
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              {articleData?.transactionType === 'Location' ? 'À Louer' : 'À Vendre'}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              {createdAtDate ? formatDistanceToNow(createdAtDate, { locale: fr, addSuffix: true }) : null}
            </a>

            {articleData?.isSponsored && ( 
              <span className="ff-heading ml10 ml0-sm fz15" >
                <i className="flaticon-electricity m-2" />
                Sponsorisée
                </span>
            )}
            
          </div>
          <div className="property-meta d-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-bed pe-2 align-text-top" />
              {articleData?.bedrooms} Chambre(s)
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-shower pe-2 align-text-top" />
              {articleData?.bathrooms} Toilette(s)
            </a>
            <a className="text ml20 fz15" href="#">
              <i className="flaticon-expand pe-2 align-text-top" />
              {articleData?.surface} m²
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">{formatPrice(articleData?.price)} DT</h3>
            {/* <p className="text space fz15">
              DT
              {(
                Number(articleData?.price) /
                articleData?.sqft
              ).toFixed(2)}
              /sq ft
            </p> */}
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;

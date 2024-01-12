import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => {
        // Check if createdAt is a valid string
        if (typeof listing.createdAt !== 'string') {
          return null; // Skip invalid entries
        }

        // Attempt to create a Date object
        const createdAtDate = new Date(listing.createdAt);

        // Check if the Date object is valid
        if (isNaN(createdAtDate.getTime())) {
          return null; // Skip invalid entries
        }

        return (
          <div
            className={` ${colstyle ? "col-sm-12" : "col-sm-6 col-lg-6"}  `}
            key={listing._id}
          >
            <div className={
              colstyle
                ? "listing-style1 listCustom listing-type"
                : "listing-style1"
            }>
              <div className="list-thumb">
                <img
                  style={{ height: "230px" }}
                  className="w-100  cover"
                  src={listing.images && listing.images.length > 0 ? listing.images[0] : 'fallback_image_url'}
                  alt="listings"
                />

                {/* <div className="sale-sticker-wrap">
                  {!listing.forRent && (
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      DESSA +
                    </div>
                  )}
                </div> */}

                <div className="list-price">
                  {listing.price} {listing.transactionType === 'Location' ? 'DT / Mois' : 'DT'}
                </div>
              </div>
              <div className="list-content">

                <h6 className="list-title">

                <Link to={`/single-v1/${listing._id}`}>{listing.title}</Link>

                </h6>
                
                <p className="list-text">{listing.ville.name}, {listing.quartier.name}</p>
                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing.bedrooms} Chambre(s)
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing.surface} m²
                  </a>
                  <a href="#">
                    <span className="flaticon-clock" />{formatDistanceToNow(createdAtDate, { locale: fr, addSuffix: true })}
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">

                  <span className="for-what">
                    {listing.transactionType === 'Location' ? 'À Louer' : 'À Vendre'}
                  </span>

                  <div className="icons d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-fullscreen" />
                    </a>
                    <a href="#">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeaturedListings;

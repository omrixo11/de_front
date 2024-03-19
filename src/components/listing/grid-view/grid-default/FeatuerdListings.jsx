import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';
import userService from "@/services/user.service";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleFavoriteSuccess } from "@/redux/slices/authSlice";

const FeaturedListings = ({ data, colstyle }) => {

  const [favorites, setFavorites] = useState([]);
  const userId = useSelector((state) => state.auth?.user?._id);
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user?.token)

  const dispatch = useDispatch(); // Get dispatch function

  const handleToggleFavorite = async (articleId) => {
    try {
      // Check if the user is logged in
      if (!userId) {
        // If not logged in, redirect to the login page
        window.location.href = '/login'; // Modify the URL as needed
        return;
      }

      const response = await userService.toggleFavorite(userId, articleId, token);
      dispatch(toggleFavoriteSuccess(articleId));
      console.log(response);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Handle error
    }
  };

  // Sort data by sponsored status and sponsoring level
  const sortedData = data.slice().sort((a, b) => {
    // Check for active boosts
    const aBoostActive = a.boost && a.boost.status === "active";
    const bBoostActive = b.boost && b.boost.status === "active";

    // Prioritize super boosts
    const aIsSuper = aBoostActive && a.boost.type === "active";
    const bIsSuper = bBoostActive && b.boost.type === "active";

    // Then prioritize classic boosts
    const aIsClassic = aBoostActive && a.boost.type === "active";
    const bIsClassic = bBoostActive && b.boost.type === "active";

    if (aIsSuper && !bIsSuper) {
      return -1; // a comes first
    } else if (!aIsSuper && bIsSuper) {
      return 1; // b comes first
    } else if (aIsClassic && !bIsClassic) {
      return -1; // classic a comes before non-classic b
    } else if (!aIsClassic && bIsClassic) {
      return 1; // classic b comes before non-classic a
    } else {
      // If both have the same boost type or no boosts, retain original order or compare by another criterion
      return 0;
    }
  });

  const mapEtatPropriete = (etat) => {
    switch (etat) {
      case 'Neuf':
        return 'Neuf';
      case 'BonEtat':
        return 'Bon État';
      case 'ARenover':
        return 'À Rénover';
      case 'EnConstruction':
        return 'En Construction';
      default:
        return etat;
    }
  };

  return (
    <>
      {sortedData.map((listing) => {
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
                <Link to={`/single-v1/${listing?._id}`}>
                  <img
                    style={{ height: "230px" }}
                    className="w-100  cover"
                    src={listing?.images && listing?.images?.length > 0 ? listing?.images[0] : 'fallback_image_url'}
                    alt="listings"
                  />
                </Link>


                {/* Conditionally render the "Sponsorisée" div based on boost status */}
                {listing?.boost && listing?.boost?.status === "active" && listing?.boost?.type !== "carousel" && (
                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      Sponsorisée
                    </div>
                  </div>
                )}


                <div className="list-price">
                  {listing.price} {listing.transactionType === 'Location' ? 'DT / Mois' : 'DT'}
                </div>
              </div>
              <div className="list-content">

                <h6 className="list-title">
                  <Link to={`/single-v1/${listing._id}`}>{listing.title}</Link>
                </h6>
                <span>{listing.propertyType}{" "}|{" "}{mapEtatPropriete(listing.etatPropriete)}</span>
                <p className="list-text">
                  {listing.ville && listing.ville?.name}, {listing.quartier && listing.quartier?.name}
                </p>
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

                    <Link to={`/single-v1/${listing?._id}`} target="_blank" rel="noopener noreferrer">
                      <span className="flaticon-new-tab" />
                    </Link>

                    <a onClick={() => handleToggleFavorite(listing._id)}>
                      <span
                        className={`${user?.favoriteArticles?.includes(listing._id) ? 'flaticon-like-filled' : 'flaticon-like-empty'}`}>
                      </span>
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

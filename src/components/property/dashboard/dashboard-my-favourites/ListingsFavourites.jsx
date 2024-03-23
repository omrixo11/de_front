
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';
import { toggleFavoriteSuccess } from "@/redux/slices/authSlice";
import userService from "@/services/user.service";
import { useSelector } from "react-redux";

const ListingsFavourites = ({ listings }) => {
  const [favoriteListings, setFavoriteListings] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?._id);
  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.user.token)

  useEffect(() => {
    // Update favoriteListings whenever listings prop changes
    setFavoriteListings(listings.slice(0, 8));
  }, [listings]);

  const handleDeleteListing = async (id) => {
    try {
      // Check if the user is logged in
      if (!userId || !token) {
        window.location.href = '/login'; // Modify the URL as needed
        return;
      }

      // Toggle the favorite status in the backend
      await userService.toggleFavorite(userId, id, token);
      dispatch(toggleFavoriteSuccess(id)); // Optionally dispatch an action to update the Redux state

      // Update the local component state to remove the listing
      const updatedListings = favoriteListings.filter((listing) => listing._id !== id);
      setFavoriteListings(updatedListings);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Handle error appropriately
    }
  };

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
      {favoriteListings.length === 0 ? (
        <h3>Vous n'avez pas encore de favoris.</h3>
      ) : (
        favoriteListings.map((listing) => {
          const createdAtDate = new Date(listing.createdAt);
          if (isNaN(createdAtDate.getTime())) {
            return null; // Skip invalid entries
          }

          return (
            <div className="col-md-6 col-lg-4 col-xl-3" key={listing._id}>
              <div className="listing-style1 style2">
                <div className="list-thumb">
                  <img
                    className="w-100 h-100 cover"
                    src={listing?.images && listing?.images?.length > 0 ? listing?.images[0] : 'fallback_image_url'}
                    alt="listings"
                  />

                  <button className="tag-del" title="Supprimer" onClick={() => handleDeleteListing(listing._id)} style={{ border: "none" }}>
                    <span className="fas fa-trash-can"></span>
                  </button>

                  <div className="list-price">
                    {listing.price} {listing.transactionType === 'Location' ? 'DT / Mois' : 'DT'}
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link to={`/single/${listing._id}`}>{listing.title}</Link>
                  </h6>
                  <span>{listing.propertyType} | {mapEtatPropriete(listing.etatPropriete)}</span>
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
                    {/* <div className="icons d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-fullscreen" />
                      </a>
                      <a href="#">
                        <span className="flaticon-new-tab" />
                      </a>
                      <a onClick={() => handleToggleFavorite(listings._id)}>
                      <span
                        className={`${user?.favoriteArticles?.includes(listings._id) ? 'flaticon-like-filled' : 'flaticon-like-empty'}`}>
                      </span>
                    </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default ListingsFavourites;

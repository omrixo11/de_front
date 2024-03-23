
import listings from "@/data/listings";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import propertyService from "@/services/property.service";
import { useEffect, useState } from "react";


import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

const NearbySimilarProperty = ({ similarProperties }) => {


   // Use a state to hold the sorted properties
   const [sortedProperties, setSortedProperties] = useState([]);

   useEffect(() => {
     // Sort properties: sponsored ones first
     const sorted = [...similarProperties].sort((a, b) => {
       if (a.boost?.status === "active" && b.boost?.status !== "active") {
         return -1; // if 'a' is sponsored and 'b' is not, 'a' comes first
       }
       if (b.boost?.status === "active" && a.boost?.status !== "active") {
         return 1; // if 'b' is sponsored and 'a' is not, 'b' comes first
       }
       return 0; // keep original order if both are sponsored or not sponsored
     });
     setSortedProperties(sorted);
   }, [similarProperties]); // Re-run this effect if similarProperties changes


  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >

        {sortedProperties.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">

                  <Link to={`/single/${listing._id}`}>
                    <img
                      style={{ height: "230px" }}
                      className="w-100  cover"
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : 'fallback_image_url'}
                      alt={listing.title ? `Image de l'annonce ${listing.propertyType} ${listing.title} pour ${listing.transactionType === 'Location' ? 'location' : 'vente'}` : "Image de l'annonce"}
                    />
                  </Link>

                  {listing?.boost && listing?.boost?.status === "active" && (
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
                    <Link to={`/single/${listing._id}`}>{listing?.title}</Link>
                  </h6>
                  <span>{listing.propertyType}</span>
                  <p className="list-text">{listing?.ville.name}, {listing?.quartier.name}</p>
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

                    <div className="icons d-flex align-items-center">
                      <Link to={`/single/${listing?._id}`} target="_blank" rel="noopener noreferrer">
                        <span className="flaticon-new-tab" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;

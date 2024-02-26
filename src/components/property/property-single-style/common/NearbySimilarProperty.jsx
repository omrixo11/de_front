
import listings from "@/data/listings";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import propertyService from "@/services/property.service";
import { useEffect, useState } from "react";


import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

const NearbySimilarProperty = ({ articleData }) => {

  const articleId = articleData?._id;
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    if (!articleId) return;

    const fetchSimilarProperties = async () => {
      try {
        const data = await propertyService.getSimilarArticles(articleId);
        setSimilarProperties(data);
      } catch (error) {
        console.error('Error fetching similar properties:', error);
      }
    };

    fetchSimilarProperties();
  }, [articleId]);

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
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

        {similarProperties.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">

                  <Link to={`/single-v1/${listing._id}`}>
                    <img
                      style={{ height: "230px" }}
                      className="w-100  cover"
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : 'fallback_image_url'}
                      alt="listings"
                    />
                  </Link>

                  {listing.isSponsored && (
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
                    <Link to={`/single-v1/${listing._id}`}>{listing?.title}</Link>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '@/redux/thunks/propertyThunks';

import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const FeaturedListings = () => {

  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  // State to store filtered and sorted sponsored properties
  const [sponsoredProperties, setSponsoredProperties] = useState([]);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    // Filter properties with isSponsored true
    const sponsored = properties.filter(property => property.isSponsored);

    // Sort sponsored properties by sponsoringLevel priority
    const sortedSponsored = sponsored.sort((a, b) => {
      const priorityOrder = {
        'Super': 4,
        'Level3': 3,
        'Level2': 2,
        'Level1': 1,

      };
      return priorityOrder[b.sponsoringLevel] - priorityOrder[a.sponsoringLevel];
    });

    setSponsoredProperties(sortedSponsored);
  }, [properties]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.featured-next__active',
          prevEl: '.featured-prev__active',
        }}
        pagination={{
          el: '.featured-pagination__active',
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
        {sponsoredProperties.slice(0, 4).map((listing) => (
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

      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <button className="featured-prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination featured-pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="featured-next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>
      {/* End .col for navigation and pagination */}
    </>
  );
};

export default FeaturedListings;

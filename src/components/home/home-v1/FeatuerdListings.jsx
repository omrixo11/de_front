import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '@/redux/thunks/propertyThunks';

import { formatDistanceToNow } from "date-fns";
import { fr } from 'date-fns/locale';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper'; // Import Autoplay here

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
    // Assuming your data structure includes a boost object with status and type properties
    const sponsored = properties.filter(property => property.boost && property.boost.status === "active");

    // Sort by boost type priority, if applicable
    const sortedSponsored = sponsored.sort((a, b) => {
      const priorityOrder = {
        'classic': 2,
        'super': 1,
      };
      // Adjust this logic based on your actual data structure
      // This assumes you have boost.type and want to sort based on it
      return priorityOrder[b.boost.type] - priorityOrder[a.boost.type];

    });
  console.log("Sponsored Properties:", sponsoredProperties);

    setSponsoredProperties(sortedSponsored);
  }, [properties]);


  if (loading) {
    return <div>Chargement...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }


  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.featured-next__active',
          prevEl: '.featured-prev__active',
        }}
        pagination={{
          el: '.featured-pagination__active',
          clickable: true,
        }}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={sponsoredProperties.length > 2} 
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

                  <Link to={`/single/${listing._id}`}>
                    <img
                      style={{ height: "230px" }}
                      className="w-100  cover"
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : 'fallback_image_url'}
                      alt={listing.title ? `Image de l'annonce ${listing.propertyType} ${listing.title} pour ${listing.transactionType === 'Location' ? 'location' : 'vente'}` : "Image de l'annonce"}
                      />
                  </Link>

                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12">
                      <span className="flaticon-electricity me-2" />
                      Sponsorisée
                    </div>
                  </div>

                  <div className="list-price">
                  {listing.price} {listing.transactionType === 'Location Vacances' ? 'DT / Jour' : listing.transactionType === 'Location' ? 'DT / Mois' : 'DT'}
                  </div>

                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link to={`/single/${listing._id}`}>{listing?.title}</Link>
                  </h6>
                  <span>{listing.propertyType}</span>
                  <p className="list-text">{listing?.ville.name} | {listing?.quartier.name}</p>
                  <div className="list-meta d-flex align-items-center">
                  <a href={`/single/${listing._id}`}>
                      <span className="flaticon-bed" /> {listing?.bedrooms} Chambre(s)
                    </a>
                    <a href={`/single/${listing._id}`}>
                      <span className="flaticon-expand" /> {listing?.surface} m²
                    </a>
                    <a href={`/single/${listing._id}`}>
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

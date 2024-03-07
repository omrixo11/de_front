
import apartmentType from "@/data/apartmentType";
import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ApartmentType = () => {

  const apartmentType = [
  { id: 1, icon: "flaticon-home", title: "Maisons", count: 22 },
  { id: 2, icon: "flaticon-corporation", title: "Appartements", count: 22 },
  { id: 3, icon: "flaticon-network", title: "Bureau", count: 22 },
  { id: 4, icon: "flaticon-garden", title: "Villa", count: 22 },
  { id: 5, icon: "flaticon-chat", title: "Maison de ville", count: 22 },
  { id: 6, icon: "flaticon-window", title: "Bungalow", count: 22 },
  { id: 7, icon: "flaticon-bird-house", title: "Loft", count: 22 },
  ]

  return (
    <Swiper
      className="overflow-visible"
      spaceBetween={30}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: ".next__active",
        prevEl: ".prev__active",
      }}
      pagination={{
        el: ".pagination__active",
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      }}
    >
      {apartmentType.map((type) => (
        <SwiperSlide key={type.id}>
          <div className="item">
            <Link to="/grid-default">
              <div className="iconbox-style1">
                <span className={`icon ${type.icon}`} />
                <div className="iconbox-content">
                  <h6 className="title">{type.title}</h6>
                  <p className="text mb-0">{`${type.count} Propriétés`}</p>
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ApartmentType;

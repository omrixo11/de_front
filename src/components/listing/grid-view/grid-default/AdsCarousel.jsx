import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper';
import adsBannersService from '@/services/adsBanners.service';

const AdsCarousel = () => {

    const [adsBanners, setAdsBanners] = useState([]);

    useEffect(() => {
        const fetchAdsBanners = async () => {
            try {
                const data = await adsBannersService.getAllAdsBanners();
                setAdsBanners(data);
                console.log("Fetched Ads Banners:", data);
            } catch (error) {
                console.error("Error fetching ads banners:", error);
            }
        };

        fetchAdsBanners();
    }, []);
    console.log("Rendering Swiper with adsBanners:", adsBanners);

    const formatLink = (link) => {
        // Check if the link already includes a protocol scheme
        if (/^https?:\/\//.test(link)) {
            return link;
        } else {
            // If not, prepend it with 'https://'
            return `https://${link}`;
        }
    };


    return (
       
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            speed={1400}
            modules={[Autoplay]}
            style={{ maxHeight: '200px' }}
            loop={true}
        >
            {adsBanners.map((banner) => (
               <SwiperSlide key={banner?._id}>
               <a href={formatLink(banner.link)} target="_blank" rel="noopener noreferrer">
                   <div className="banner-wrapper">
                       <img src={banner.imageUrl} alt={`Banner ${banner?._id}`} className='carousel-img'/>
                   </div>
               </a>
           </SwiperSlide>
            ))}
        </Swiper>
    
    );
};

export default AdsCarousel;

import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const PropertyGallery = ({ articleData }) => {
  const images = articleData?.images || [];
  console.log('images:::', images);

  return (
    <Gallery>
      <div className="row">
        <div className="col-md-6">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              {images[0] && (
                <Item
                  original={images[0]}
                  thumbnail={images[0]}
                  width={610}
                  height={510}
                >
                  {({ ref, open }) => (
                    <img
                      src={images[0]}
                      ref={ref}
                      onClick={open}
                      alt="image"
                      role="button"
                      className="w-100 h-100 cover"
                    />
                  )}
                </Item>
              )}
            </div>
          </div>
        </div>
        {/* End .col-md-6 */}

        <div className="col-md-6">
          <div className="row">
            {images.slice(1).map((image, index) => (
              <div className="col-md-6" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img mb10`}
                  >
                    <Item
                      original={image}
                      thumbnail={image}
                      width={270}
                      height={250}
                    >
                      {({ ref, open }) => (
                        <img
                          className="w-100 h-100 cover"
                          ref={ref}
                          onClick={open}
                          role="button"
                          src={image}
                          alt={`Image ${index + 2}`}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </Gallery>
  );
};

export default PropertyGallery;

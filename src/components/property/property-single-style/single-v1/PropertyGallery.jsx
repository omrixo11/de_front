import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyGallery = ({ articleData }) => {
  const images = articleData ? articleData.images : [];

  return (
    <Gallery>
      <div className="col-sm-6">
        <div className="sp-img-content mb15-lg">
          <div className="popup-img preview-img-1 sp-v3 sp-img">
            {images.length > 0 && (
              <Item
                original={images[0]}
                thumbnail={images[0]}
                width={810}
                height={750}
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
      {/* End .col-6 */}

      <div className="col-sm-6">
        <div className="row">
          {images.slice(1).map((image, index) => (
            <div className="col-4 ps-sm-0" key={index}>
              <div className="sp-img-content at-sp-v3">
                <div className="popup-img preview-img-4 sp-img mb10">
                  <Item
                    original={image}
                    thumbnail={image}
                    width={810}
                    height={750}
                  >
                    {({ ref, open }) => (
                      <img
                        className="w-100 h-100 cover"
                        ref={ref}
                        onClick={open}
                        role="button"
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        

                      />
                    )}
                  </Item>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyGallery;

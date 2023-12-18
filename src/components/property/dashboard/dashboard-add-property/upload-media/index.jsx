import React from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";


const UploadMedia = ({formData, setFormData}) => {

  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Télécharger les photos de votre propriété</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery formData={formData} setFormData={setFormData}/>
          </div>
        </div>
        <div className="row">
          
         
        </div>
      </form>
    </div>
  );
};

export default UploadMedia;


import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";


const UploadPhotoGallery = ({ formData, setFormData, validation, setValidation }) => {

  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleUpload = (files) => {
    const newImages = [...uploadedImages];
    const newImageFiles = [...files];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages(newImages);

        // Update formData with the new array of file objects
        setFormData({
          ...formData,
          images: newImageFiles,
        });

        // Update validation to indicate that at least one image is uploaded
        setValidation((prevValidation) => ({
          ...prevValidation,
          images: true,
        }));

      };
      reader.readAsDataURL(file);
    }
  };


  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);

    // Update formData with the newImages array after deleting an image
    setFormData({
      ...formData,
      images: newImages,
    });

    // Update validation to indicate that at least one image is uploaded
    setValidation((prevValidation) => ({
      ...prevValidation,
      images: newImages.length > 0,
    }));

  };

  return (
    <>
      {!validation.images && <div className="alert alert-danger">Veuillez télécharger au moins une photo.</div>}
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        <div className="icon mb30">
          <span className="flaticon-upload" />
        </div>
        <h4 className="title fz17 mb10">Déposez des photos de votre propriété.</h4>
        <p className="text mb25">
          Ajoutez des photos de haute qualité pour valoriser davantage votre propriété.
        </p>
        <label className="ud-btn btn-white">
          Téléchargez des photos
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            multiple
            className="ud-btn btn-white"
            onChange={(e) => handleUpload(e.target.files)}
            style={{ display: "none" }}
          />
        </label>
      </div>
      {/* Display uploaded images */}
      <div className="row profile-box position-relative d-md-flex align-items-end mb50">
        {uploadedImages.map((imageData, index) => (
          <div className="col-2" key={index}>
            <div className="profile-img mb20 position-relative">
              <img

                className="w-100 bdrs12 cover"
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: "none" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(index)}
                type="button"
                data-tooltip-id={`delete-${index}`}
              >
                <span className="fas fa-trash-can" />
              </button>

              <ReactTooltip
                id={`delete-${index}`}
                place="right"
                content="Delete Image"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadPhotoGallery;

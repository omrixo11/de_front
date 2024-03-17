import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ProfileBox = ({ setProfileImage, onProfileImageChange, onProfileImageDeleted }) => {
  const auth = useSelector((state) => state.auth);
  const [uploadedImage, setUploadedImage] = useState(auth.user.profileImg || "/images/user-icon.jpg");
  

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file); // This updates the profile image in the parent component's state
      onProfileImageChange(); // Notify parent component of the change
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result); // This updates the local state to display the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-box position-relative d-md-flex align-items-end mb50">
      <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
        <img
          className="w-100 cover h-100"
          src={uploadedImage}
          onError={(e) => { e.target.onerror = null; e.target.src = "/images/user-icon.jpg"; }}
          alt="profile avatar"
        />
        {/* <button
          className="tag-del"
          style={{ border: "none" }}
          onClick={() => {
            setUploadedImage("/images/user-icon.jpg");
            setProfileImage(null); 
            onProfileImageDeleted();
          }}
        >
          <span className="fas fa-trash-can" />
        </button>
        <ReactTooltip id="profile_del" place="right" content="Delete Image" /> */}
      </div>
      <div className="profile-content ml30 ml0-sm">
        <label className="upload-label pointer">
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
          <div className="ud-btn btn-white2 mb30">Télécharger une photo</div>
        </label>
        <p className="text">Les photos doivent être au format JPEG ou PNG</p>
      </div>
    </div>
  );
};

export default ProfileBox;

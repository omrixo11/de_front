
import { Link } from "react-router-dom";
import React from "react";

const ContactWithAgent = ({ articleData }) => {

  const agentPhoneNumber = articleData?.user?.phoneNumber;

  const handleCallClick = () => {
    // You can add your logic to initiate a call here
    window.location.href = `tel:${agentPhoneNumber}`;
  };

  const displayName = articleData?.user?.companyName || `${articleData?.user?.lastName} ${articleData?.user?.firstName}`;
  const userId = articleData?.user?._id; // Assuming the user object contains an _id property

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <img
            className="w90"
            src={articleData?.user.profileImg ?
              // `http://localhost:5001/media/user-profile-images/${articleData?.user.profileImg}`
              `https://dessa.ovh/media/user-profile-images/${articleData?.user.profileImg}` 
              : "/images/user-icon.jpg"}
            alt="User Profile"
          />

        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{displayName}</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              {articleData?.user?.phoneNumber}
            </a>
          </div>
          {/* <Link
            to={`/agency-single/${userId}`}
            className="text-decoration-underline fw600"
          >
            Voir le reste des annonces
          </Link> */}
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <Link
          to={`/agency-single/${userId}`}
          className="ud-btn btn-white2"
        >
          Voir le reste des annonces
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </>
  );
};

export default ContactWithAgent;

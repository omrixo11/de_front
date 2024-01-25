
import { Link } from "react-router-dom";
import React from "react";

const ContactWithAgent = ({ articleData }) => {

  const agentPhoneNumber = articleData?.user.phoneNumber;

  const handleCallClick = () => {
    // You can add your logic to initiate a call here
    window.location.href = `tel:${agentPhoneNumber}`;
  };

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          <img
            className="w90"
            src={articleData?.user.profileImg || "/images/user-icon.jpg"}
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{articleData?.user.lastName} {articleData?.user.firstName}</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            <a className="text fz15" href="#">
              <i className="flaticon-call pe-1" />
              {articleData?.user.phoneNumber}
            </a>
          </div>
          <Link
            to="/agent-single/3"
            className="text-decoration-underline fw600"
          >
            Voir le reste des annonces
          </Link>
        </div>
      </div>
      {/* End agent-single */}

      <div className="d-grid">
        <button to="/agent-single/3" className="ud-btn btn-white2" onClick={handleCallClick}>
          Contacter
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default ContactWithAgent;

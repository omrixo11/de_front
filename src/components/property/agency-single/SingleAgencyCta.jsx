import { agentsData } from "@/data/agency";
import { FaInstagram, FaFacebookF, FaTwitter, FaGlobe } from 'react-icons/fa';

import React from "react";
import { Link } from "react-router-dom";

const SingleAgencyCta = ({ agency }) => {

  const ensureHttpPrefix = (url) => {
    if (!url) return url; // Return early if URL is undefined, null, or empty
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`; // Prepend https:// if URL does not start with http:// or https://
    }
    return url;
  };

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center">
        <div className="single-img mb30-sm">
          <img
            src={agency?.profileImg ?
              // `http://localhost:5001/media/user-profile-images/${agency?.profileImg}`
              `https://dessa.ovh/media/user-profile-images/${agency?.profileImg}` 
              : "/images/user-icon.jpg"}
            alt="User Profile"
            style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        {/* End single image */}
        <div className="single-contant ml30 ml0-xs">
          <h2 className="title mb-0 text-white">{agency?.lastName} {agency?.firstName}</h2>
          <p className="fz15 text-white">
            <b>{agency?.companyName}</b>
          </p>
          <div className="agent-meta mb15 d-md-flex align-items-center">
          <a className="text fz15 pe-2 bdrr1 text-white" href={`mailto:${agency?.email}`} aria-label={`Email to ${agency?.email}`}>
              <i className="flaticon-email pe-2" />
              {agency?.email}
            </a>
            <a className="text fz15 ps-2 text-white" href={`tel:${agency?.phoneNumber}`} aria-label={`Call ${agency?.phoneNumber}`}>
              <i className="flaticon-call pe-2" />
              {agency?.phoneNumber}
            </a>
          </div>
          <div className="agent-meta mb15 d-md-flex align-items-center">
          {agency?.instagramUrl && (
            <a href={ensureHttpPrefix(agency.instagramUrl)} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${agency?.instagramUrl}`} >
              <FaInstagram className="fz15 text-white mr10" />
            </a>
          )}
          {agency?.facebookUrl && (
            <a href={ensureHttpPrefix(agency.facebookUrl)} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ${agency?.facebookUrl}`}>
              <FaFacebookF className="fz15 text-white mr10" />
            </a>
          )}
          {agency?.twitterUrl && (
            <a href={ensureHttpPrefix(agency.twitterUrl)} target="_blank" rel="noopener noreferrer" aria-label={`Twitter ${agency?.twitterUrl}`}>
              <FaTwitter className="fz15 text-white mr10"/>
            </a>
          )}
          {agency?.websiteUrl && (
            <a href={ensureHttpPrefix(agency.websiteUrl)} target="_blank" rel="noopener noreferrer" aria-label={`Website ${agency?.websiteUrl}`}>
              <FaGlobe className="fz15 text-white mr10" />
            </a>
          )}
        </div>
          {agency?.address && (
            <div>
              <span className="text fz15 text-white">
                {agency?.address}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleAgencyCta;

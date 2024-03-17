import React from "react";

const SocialField = () => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Lien Facebook
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Lien Facebook ..."
              required
            />
          </div>
        </div>
        
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Lien Instagram
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Lien Instagram ..."
              required
            />
          </div>
        </div>{" "}

        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Lien X (Twitter)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Lien Twitter ..."
              required
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Site web
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="www.exmple.com"
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
            Mettre à jour
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default SocialField;

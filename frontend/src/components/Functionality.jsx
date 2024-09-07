import React from "react";
import { Link } from "react-router-dom";

const NewActivity = () => {
  return (
    <div className="contact-page-wrapper" id="contact-id">
      <h1 className="primary-heading" id="new-activities-id">NEW ACTIVITIES</h1>
      <h1 className="primary-heading">Choose your next</h1>
      <div className="new-activity-buttons">
      <button className="primary-button-new"><Link to="/upload">Upload</Link></button>
      <button className="primary-button-new"><Link to="/capture">Capture</Link></button>
      <button className="primary-button-new"><Link to="/dashboard">Dashboard</Link></button>
      <button onClick={() => navigate("/market")} className="primary-button-new">Marketplace</button>
      </div>
    </div>
  );
};

export default NewActivity;
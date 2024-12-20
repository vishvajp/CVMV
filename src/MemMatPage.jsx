import React from "react";
import "./MemMatPage.css";
import man from "./image/man.jpg"


const MemMatPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-center gap-4">

        <div className="d-flex flex-column align-items-center memmat-div gap-3">
            <img src={man} className="memmat-img"></img>
            <span className="memmat-membership-text">MEMBERSHIP</span>
        </div>
        <div className="d-flex flex-column align-items-center memmat-div gap-3">
        <img src={man} className="memmat-img"></img>
            <span className="memmat-matrimony-text">MATRIMONY</span>
        </div>
      </div>
    </div>
  );
};

export default MemMatPage;

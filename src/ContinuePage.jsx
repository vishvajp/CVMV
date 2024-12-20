import React from "react";
import logo from "./image/cvmvlogo.png";
const ContinuePage = () => {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img style={{ width: "200px" }} src={logo}></img>
        <span
          style={{
            color: "red",
            fontSize: "large",
            fontWeight: "600",
            marginTop: "20px",
          }}
        >
          {" "}
          Upadate soon
        </span>
      </div>
    </div>
  );
};

export default ContinuePage;

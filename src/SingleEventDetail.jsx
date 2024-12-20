import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SingleEventDetail.css";

const SingleEventDetail = () => {
  const location = useLocation();
  const singleEvent = location.state;

  const [Media, setMedia] = useState("Images");

  console.log(singleEvent);
  return (
    <div>
      <div className="user-edit-form">
        <div className="event-detail-main-div">
          <div className="d-flex justify-content-center">
            <h3 className="singleEvent-title">{singleEvent?.title}</h3>
          </div>
          <div className="d-flex justify-content-center">
            <p className="singleEvent-desc">{singleEvent?.descriptions}</p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="d-flex justify-content-end">
                <span
                  onClick={(e) => setMedia("Images")}
                  style={{
                    backgroundColor: Media === "Images" ? "red" : "green",
                  }}
                  className="singleEvent-media-title"
                >
                  Images
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="col-lg-6 col-12">
                <div className="d-flex justify-content-start">
                  <span
                    onClick={(e) => setMedia("Videos")}
                    style={{
                      backgroundColor: Media === "Videos" ? "red" : "green",
                    }}
                    className="singleEvent-media-title"
                  >
                    Videos
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {Media === "Images" &&
              singleEvent?.image.map((singlePic, index) => (
                <div key={index} className="col-lg-4 col-12 ">
                  <div className="singleEvent-media-img-div  mb-3 mt-3">
                    <img
                      className="singelEvent-media-img"
                      src={singlePic}
                    ></img>
                  </div>
                </div>
              ))}

            {Media === "Videos" &&
              singleEvent?.url.map((singlePic, index) => (
                <div key={index} className="col-lg-4 col-12 ">
                  <div className="singleEvent-media-img-div  mb-3 mt-3">
                    <iframe
                      className="singelEvent-media-img"
                      src={singlePic}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventDetail;

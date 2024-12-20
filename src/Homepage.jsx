import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import member from "./image/Member.png";
import madurai from "./image/Madurai.png";
import virudhunagar from "./image/Virudhunagar.png";
import dindigul from "./image/Dindugal.png";
import matrimony from "./image/Matrimony.png";
import men from "./image/men.png";
import women from "./image/women.png";
import axios from "axios";

const Homepage = ({ baseUrl }) => {
  const navToOtpPage = useNavigate();
  const [homeDashCount, setHomeDashCount] = useState();
  const adToken = localStorage.getItem("token");
  const adsestoken = sessionStorage.getItem("token")
  console.log(adsestoken)
  
  // const handleOtpPage = () => {
  //   navToOtpPage("/home/otp");
  // };
  useEffect(() => {
    const handleDashCount = async () => {
      try {
        const dashCount = await axios.post(
          `${baseUrl}Tsit_Cvmv_Dashboard_Count/${adToken}`
        );
        // console.log(dashCount);
        if (dashCount.status === 200) {
          setHomeDashCount(dashCount.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleDashCount();
  }, []);

  // console.log(homeDashCount);

  return (
    <div className="homepage-bg">
      {/* <button className='homepage-add-user-button' onClick={handleOtpPage}>ADD USER</button> */}

      <div className="d-flex justify-content-center">
        <span className="homepage-title">CVMV REDDY'S TRUST</span>
      </div>
      <div className="row ">
        <div className="col">
          <div className="d-flex flex-column homepage-1st-col-inner-main-div">
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center homepage-total-user-div">
                <span className="homepage-membership-text">MEMBERSHIP</span>
                <img className="homepage-member-image" src={member}></img>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center homepage-total-user-text-div">
                <span className="homepage-total-user-text">Total User</span>
                <span className="homepage-total-user-text-total">
                  {homeDashCount?.Total_Member}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3 homepage-mem-district ">
              <div className="d-flex flex-column">
                <img className="homepage-madurai-img" src={madurai}></img>
                <div className="d-flex flex-column align-items-center homepage-madurai-text-div">
                  <span className="homepage-madurai-span">Madurai</span>
                  <span className="homepage-madurai-total-span">
                    {homeDashCount?.Madurai_Menber}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <img className="homepage-madurai-img" src={virudhunagar}></img>
                <div className="d-flex flex-column align-items-center homepage-madurai-text-div">
                  <span className="homepage-madurai-span">Virudhunagar</span>
                  <span className="homepage-madurai-total-span">
                    {homeDashCount?.Viruthunagar_Member}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center ">
                <img className="homepage-madurai-img" src={dindigul}></img>
                <div className="d-flex flex-column align-items-center homepage-madurai-text-div">
                  <span className="homepage-madurai-span">Dindigul</span>
                  <span className="homepage-madurai-total-span">
                    {homeDashCount?.Dindukkal_Member}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex flex-column homepage-bottom-mobile">
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center homepage-total-matri-user-div">
                <span className="homepage-membership-text">MATRIMONY</span>
                <img className="homepage-member-image" src={matrimony}></img>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center homepage-matri-total-user-text-div">
                <span className="homepage-total-user-text">Total User</span>
                <span className="homepage-total-user-text-total">
                  {homeDashCount?.Total_Matrimony}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3 homepage-men-women-count">
              <div className="d-flex flex-column align-items-center">
                <img className="homepage-men-women-img" src={men}></img>
                <div className="d-flex flex-column align-items-center homepage-men-women-text-div">
                  <span className="homepage-madurai-span">MEN</span>
                  <span className="homepage-madurai-total-span">
                    {homeDashCount?.Male}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center mb-4">
                <img className="homepage-men-women-img" src={women}></img>
                <div className="d-flex flex-column align-items-center homepage-men-women-text-div">
                  <span className="homepage-madurai-span">WOMEN</span>
                  <span className="homepage-madurai-total-span">
                    {homeDashCount?.Female}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

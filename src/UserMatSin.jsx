import React, { useEffect, useRef, useState } from "react";
import { FaKey } from "react-icons/fa";
import "./UserMatSin.css";
import { Collapse } from "antd";
// import man from "./image/man.jpg";
// import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

import man from "./image/noImage.jpg";
import mt from "./image/MT.png";

const UserMatSin = () => {
  const { Panel } = Collapse;
  const location = useLocation();
  const singleMatData = location.state || {};
  const [sinUserData, setSinUserData] = useState();
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  // const [editState, setEditState] = useState();
  console.log("team", singleMatData);
  const navToEdit = useNavigate();

  useEffect(() => {
    setSinUserData(singleMatData);
  }, [singleMatData]);

  const handleNavToEdit = () => {
    navToEdit("/home/user/edit", { state: { sinUserData } });
  };

  return (
    <div>
      <div>
        <div className=" d-flex justify-content-end ">
          <button className="usermatsin-edit-button" onClick={handleNavToEdit}>
            Edit
          </button>
        </div>
      </div>
      {/* <div ref={contentRef} className="d-flex ">
        <div className="">
        <span className="usermat-sin-label-span">Contact :</span>
        </div>
        <div className="">
        <span className="usermat-singlemat-id-span">
                {singleMatData.matrimony_details?.matri_id}
              </span>
        </div>
      </div> */}
      <div ref={contentRef} className="user-mat-print-main-div">
        <div className="row">
          <div className="col-12">
            <div>
              <img className="usermat-header-img" src={mt}></img>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <span className="user-mat-matri-id-span">Matri Id</span>
              <span className="usermat-singlemat-id-span">
                {singleMatData.matrimony_details?.matri_id}
              </span>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <div className="d-flex ps-5">
              <span className="user-mat-matri-name-span">Name</span>
              <span className="usermat-singlemat-id-span">
                {singleMatData.matrimony_details?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            {singleMatData.matrimony_images[0] && (
              <img
                src={singleMatData.matrimony_images[0]?.matri_image}
                className="usermem-man-img "
                alt={`User ${singleMatData.matrimony_details.name}`}
              />
            )}
            {singleMatData.matrimony_images.length === 0 && (
              <img src={man} className="usermem-man-img " alt="Dummy Image" />
            )}
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Email :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.email}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
             
            </div>

            <div className="d-flex usermat-width ">
          
              
            </div>
          </div>
        </div>

        <div className="d-flex usermat-email-1st-div mt-4">
          <div className="d-flex justify-content-end usermat-width">
            <span className="usermat-sin-label-span">Address :</span>
          </div>

          <div className="">
            <span className="usermat-details-span">
              {singleMatData.matrimony_details.address}
            </span>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Gender :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.gender}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">DOB :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {new Date(
                          singleMatData.matrimony_details.date_of_birth
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Marital Status :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.m_status}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Blood Group :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.blood_group}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Native Place :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.native_place}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">District :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.district}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Kula Deivam :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.kula_deivam}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Temple Place :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.temple_place}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Height :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.m_height
                        ? singleMatData.matrimony_details.m_height
                        : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Weight :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.m_weight
                        ? singleMatData.matrimony_details.m_weight
                        : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Color :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.m_color
                        ? singleMatData.matrimony_details.m_color
                        : "none"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Qualification :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.qualification}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Job Designation :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.job_designation}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Job Location :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.job_location}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Annual Income :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.job_annual_income
                          ? singleMatData.matrimony_details.job_annual_income
                          : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Rasi :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.j_rasi}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Nakshatra :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.j_nakshatra}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Dhosam :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.j_dhosam}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Father Name :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.father_name}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Father Contact :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.father_number
                          ? singleMatData.matrimony_details.father_number
                          : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Father Occupation :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.father_occupation}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span"></span>
            </div>

            <div className="d-flex usermat-width ">
              
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Mother Name :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.mother_name}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Mother Contact :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.mother_number}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Mother Occupation :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.mother_occupation}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span"></span>
            </div>

            <div className="d-flex usermat-width ">
             
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">No Of Brothers :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.no_of_brothers}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">No Of Sisters</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.no_of_sisters}
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Marital Count :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.matrimony_details.m_count}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              
            </div>

            <div className="d-flex usermat-width ">
            
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Horoscope Attach :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="ps-3">
              {singleMatData.horoscope_attach &&
                        (/\.(jpg|jpeg|png|gif)$/i.test(
                          singleMatData.horoscope_attach
                        ) ? (
                          <img
                            className="usermatsin-horo me-3 mb-3"
                            src={singleMatData.horoscope_attach}
                            alt="Horoscope Image"
                          />
                        ) : (
                          <iframe
                            className="usermatsin-horo me-3 mb-3"
                            src={singleMatData.horoscope_attach}
                            title="Horoscope PDF"
                          ></iframe>
                        ))}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span"></span>
            </div>

            <div className="d-flex usermat-width ">
             
            </div>
          </div>
        </div>


        
      
      </div>
      <div className="d-flex justify-content-center mt-1">
        <button
          className="userMatsin-print-button mt-2 mb-5"
          onClick={reactToPrintFn}
        >
          PRINT
        </button>
      </div>
    </div>
  );
};

export default UserMatSin;

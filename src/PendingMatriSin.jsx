import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PendingMatriSin.css";
import axios from "axios";

const PendingMatriSin = ({ baseUrl }) => {
  const location = useLocation();
  const singlePendUserData = location.state;
  const [sinUserData, setSinUserData] = useState();
  // const navToEdit = useNavigate();
  const navToHome = useNavigate();
  // console.log(singlePendUserData);

  useEffect(() => {
    setSinUserData(singlePendUserData);
  }, [singlePendUserData]);

  // const handleNavToEdit = () => {
  //   navToEdit("/home/user/edit", { state: { sinUserData } });
  // };

  const handleApprove = async () => {
    // console.log(singlePendUserData.matrimony_details.matri_id);
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Mat_Approval/${singlePendUserData.matrimony_details.matri_id}`
      );
      // console.log(response.data);

      if (response.data.success) {
        window.alert("Approved Successfully");
        navToHome("/home/notification");
      }
    } catch (err) {
      console.log(err.response);
    }
  };


  const handleDelete = async () => {
    // Show a confirmation dialog before proceeding with deletion
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );

    // If the user clicks "OK", proceed with deletion
    if (confirmation) {
      try {
        const responseDel = await axios.post(
          `${baseUrl}Tsit_Cvmv_Mat_Delete_Admin/${singlePendUserData.matrimony_details.matri_id}`
        );
        console.log(responseDel);
        window.alert(`${responseDel.data.message}`);
          
          navToHome("/home/notification");
        
      } catch (err) {
        console.log(err.response);
      }
    }
  };


  // console.log(singlePendUserData, "image", singlePendUserData.horoscope_attach);

  return (
    <div>
      <div className="pendingmatrisin-main-div">
        <div>
          <div className="d-flex justify-content-center mb-3">
            {/* <button onClick={handleNavToEdit}>Edit</button> */}
          </div>{" "}
          <p className="pendingmatrisin-name-title">
            {singlePendUserData.matrimony_details.name}
          </p>
        </div>
        <div className="row p-4">
          <div className="col-4 col-lg-3">
            <div className="d-flex flex-column gap-3">
              <span className="pendingmatrisin-label-span">Name</span>
              <span className="pendingmatrisin-label-span">Matrimony_Id</span>
              <span className="pendingmatrisin-label-span">Contact_Detail</span>
              <span className="pendingmatrisin-label-span">Email Id</span>
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className="d-flex flex-column gap-3">
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.matrimony_details.name}
              </span>
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.matrimony_details.matri_id}
              </span>
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.matrimony_details.contact_detail}
              </span>
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.matrimony_details.email}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 pendinmatrisin-pro-image-span ">
          {singlePendUserData.matrimony_images.map((sinUser, index) => {
            return (
              <img
                key={index}
                className="pendinmatrisin-pro-image"
                src={sinUser.matri_image}
              ></img>
            );
          })}
        </div>
        <p className="pendingmatrisin-name-title">
          {" "}
          About {singlePendUserData.matrimony_details.name}
        </p>
        <div className="row pt-4 ps-4 pe-4 pb-3">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Marital Status</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.m_status}
            </span>
          </div>
        </div>

        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Date Of Birth</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.date_of_birth}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Gender</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.gender}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Blood Group</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.blood_group}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Kula Deivam</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.kula_deivam}
            </span>
          </div>
        </div>

        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Native Place</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.native_place}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">District</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.district}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Address</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.address}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Height</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.m_height}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Weight</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.m_weight}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Color</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.m_color}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Qualification</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.qualification}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Job Designation</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.job_designation}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Job Location</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.job_location}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Annual Income</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.job_annual_income}
            </span>
          </div>
        </div>
        <p className="pendingmatrisin-name-title"> Horoscope Detail</p>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Rasi</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.j_rasi}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Nakshatra</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.j_nakshatra}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Dhosam</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.j_dhosam}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Horoscope Image</span>
          </div>
          <div className="col-6 col-lg-4">
            {singlePendUserData.matrimony_details.horoscope_attach &&
              (/\.(jpg|jpeg|png|gif)$/i.test(
                singlePendUserData.matrimony_details.horoscope_attach
              ) ? (
                <img
                  className="pendinmatrisin-pro-image"
                  src={singlePendUserData.horoscope_attach}
                  alt="Horoscope Image"
                />
              ) : (
                <iframe
                  className="pendinmatrisin-pro-image"
                  src={singlePendUserData.horoscope_attach}
                  title="Horoscope PDF"
                ></iframe>
              ))}
          </div>
        </div>
        <p className="pendingmatrisin-name-title"> Father Detail</p>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Father Name</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.father_name}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Father Number</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.father_number}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">
              Father Occupation
            </span>
          </div>
          <div className="col-6 col-lg-3">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.father_occupation}
            </span>
          </div>
        </div>
        <p className="pendingmatrisin-name-title"> Mother Detail</p>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Mother Name</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.mother_name}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Mother Number</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.mother_number}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">
              Mother Occupation
            </span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.mother_occupation}
            </span>
          </div>
        </div>
        <p className="pendingmatrisin-name-title">Sibling</p>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">
              Total No Of Brothers
            </span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.no_of_brothers}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">
              Total No Of Sisters
            </span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.matrimony_details.no_of_sisters}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-center pending-aprove-button-div">
          {/* <button className="pendingmatrisin-delete-button">DELETE</button> */}
          <button
            className="pendingmatrisin-approve-button"
            onClick={handleApprove}
          >
            APPROVE
          </button>
          <button
                    className="pendingmatrisin-Del-button"
                    onClick={handleDelete}
                  >
                    DELETE
                  </button>
        </div>
      </div>
    </div>
  );
};

export default PendingMatriSin;

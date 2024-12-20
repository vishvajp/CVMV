import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import man from "./image/cvmvlogo.png";

const PendingMemSin = ({ baseUrl }) => {
  const location = useLocation();
  const singlePendUserData = location.state;
  const navToHome = useNavigate();
  console.log(singlePendUserData);
  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Mem_Approval/${singlePendUserData.mem_id}`
      );
      console.log(response.data);

      if (response.data.success) {
        window.alert("Approved Successfully");
        navToHome("/home/notification");
      }
    } catch (err) {
      //   console.log(
      //     `${baseUrl}Tsit_Cvmv_Mem_Approval/${singlePendUserData.mem_id}`
      //   );
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
          `${baseUrl}Tsit_Cvmv_Mem_Delete_Admin/${singlePendUserData.mem_id}`
        );
        console.log(responseDel);
        window.alert(`${responseDel.data.message}`);
        navToHome("/home/notification");
      } catch (err) {
        console.log(err.response);
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="pendingmatrisin-main-div">
        <div>
          <div className="d-flex justify-content-center mb-3">
            {/* <button onClick={handleNavToEdit}>Edit</button> */}
          </div>{" "}
          <p className="pendingmatrisin-name-title">
            {singlePendUserData.first_name} {singlePendUserData.last_name}
          </p>
        </div>
        <div className="row p-4">
          <div className="col-4 col-lg-3">
            <div className="d-flex flex-column gap-3">
              <span className="pendingmatrisin-label-span">Name</span>
              <span className="pendingmatrisin-label-span">Membership_Id</span>
              <span className="pendingmatrisin-label-span">Contact_Detail</span>
              {/* <span className="pendingmatrisin-label-span">Email Id</span> */}
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className="d-flex flex-column gap-3">
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.first_name} {singlePendUserData.last_name}
              </span>
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.mem_id}
              </span>
              <span className="pendingmatrisin-input-span">
                {singlePendUserData.phone}
              </span>
              {/* <span className="pendingmatrisin-input-span">
                {singlePendUserData.matrimony_details.email}
              </span> */}
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 pendinmatrisin-pro-image-span ">
          <img
            className="pendinmatrisin-pro-image"
            src={singlePendUserData.member_image}
          ></img>
        </div>
        <p className="pendingmatrisin-name-title">
          {" "}
          About {singlePendUserData.first_name} {singlePendUserData.last_name}
        </p>

        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Date Of Birth</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              <span className="pendingmatrisin-input-span">
                {new Date(
                  singlePendUserData.date_of_birth
                ).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Gender</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.gender}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Blood Group</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.blood_group}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Kula Deivam</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.kula_deivam}
            </span>
          </div>
        </div>

        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Native Place</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.native_place}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">District</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.district}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Address</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.address}
            </span>
          </div>
        </div>

        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Qualification</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.qualification}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Job Designation</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.job_designation}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Temple Place</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.temple_place}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">vagaiyara</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.vagaiyara}
            </span>
          </div>
        </div>

        <p className="pendingmatrisin-name-title"> Family Detail</p>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Father Name</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.father_name}
            </span>
          </div>
        </div>
        <div className="row ps-4 pb-3 pe-4 pt-4">
          <div className="col-4 col-lg-3">
            <span className="pendingmatrisin-label-span">Mother Name</span>
          </div>
          <div className="col-6 col-lg-4">
            <span className="pendingmatrisin-input-span">
              {singlePendUserData.mother_name}
            </span>
          </div>
        </div>

        {singlePendUserData.wife_name && (
          <div>
            <p className="pendingmatrisin-name-title">Wife</p>
            <div className="row ps-4 pb-3 pe-4 pt-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">Name</span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_name}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">Birth Place</span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_birth_place}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">DOB</span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_dob}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">District</span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_district}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">Phone</span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_phone}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">
                  Qualification
                </span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_qualification}
                </span>
              </div>
            </div>
            <div className="row ps-4 pb-3 pe-4">
              <div className="col-4 col-lg-3">
                <span className="pendingmatrisin-label-span">
                  Job Designation
                </span>
              </div>
              <div className="col-6 col-lg-4">
                <span className="pendingmatrisin-input-span">
                  {singlePendUserData.wife_job_designation}
                </span>
              </div>
            </div>
          </div>
        )}

        {singlePendUserData.children.length > 0 && (
          <div>
            <p className="pendingmatrisin-name-title">Childrens</p>
            {singlePendUserData.children.map((child, index) => {
              return (
                <div key={index}>
                  <div className="pendingmemsin-children d-flex justify-content-center align-items-center">
                    <span className="pendingmemsin-children-span">
                      Children {index + 1}
                    </span>
                  </div>
                  <div className="row ps-4 pb-3 pe-4">
                    <div className="col-4 col-lg-3">
                      <span className="pendingmatrisin-label-span">Name</span>
                    </div>
                    <div className="col-6 col-lg-4">
                      <span className="pendingmatrisin-input-span">
                        {child.children_name}
                      </span>
                    </div>
                  </div>
                  <div className="row ps-4 pb-3 pe-4">
                    <div className="col-4 col-lg-3">
                      <span className="pendingmatrisin-label-span">DOB</span>
                    </div>
                    <div className="col-6 col-lg-4">
                      <span className="pendingmatrisin-input-span">
                        {child.children_dob}
                      </span>
                    </div>
                  </div>
                  <div className="row ps-4 pb-3 pe-4">
                    <div className="col-4 col-lg-3">
                      <span className="pendingmatrisin-label-span">
                        Education
                      </span>
                    </div>
                    <div className="col-6 col-lg-4">
                      <span className="pendingmatrisin-input-span">
                        {child.children_education}
                      </span>
                    </div>
                  </div>
                  <div className="row ps-4 pb-3 pe-4">
                    <div className="col-4 col-lg-3">
                      <span className="pendingmatrisin-label-span">
                        Professional
                      </span>
                    </div>
                    <div className="col-6 col-lg-4">
                      <span className="pendingmatrisin-input-span">
                        {child.children_professional}
                      </span>
                    </div>
                  </div>
                  <div className="row ps-4 pb-3 pe-4">
                    <div className="col-4 col-lg-3">
                      <span className="pendingmatrisin-label-span">
                        Relation
                      </span>
                    </div>
                    <div className="col-6 col-lg-4">
                      <span className="pendingmatrisin-input-span">
                        {child.relation}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="d-flex justify-content-center pending-aprove-button-div">
          {/* <button className="pendingmatrisin-delete-button">DELETE</button> */}
          <button
            className="pendingmatrisin-approve-button"
            onClick={handleApprove}
          >
            APPROVE
          </button>
          <button className="pendingmatrisin-Del-button" onClick={handleDelete}>DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default PendingMemSin;

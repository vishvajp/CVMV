import React, { useState, useEffect } from "react";
import "./AdminProfile.css";
import proimage from "./image/man.jpg";
import { FaShareSquare } from "react-icons/fa";
import axios from "axios";

const AdminProfile = ({ baseUrl }) => {
  const [specificUser, setSpecificUser] = useState();

  const handleSpecificUser = (specificId) => {
    setSpecificUser(specificId);
  };

  // const handleSpecificUser = (specificId) => {
  //     const userDetail = data.find((user) => specificId === user.id);
  //     setSpecificUser(userDetail);
  //   };

  const [fullAdminData, setFullAdminData] = useState();
  const adminToken = localStorage.getItem("token");

  useEffect(() => {
    const handleAdminData = async () => {
      try {
        const AdminData = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_All_Admin_Details/${adminToken}`
        );
        // console.log(AdminData.data.message);
        if (AdminData.data.message) {
          setFullAdminData(AdminData.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleAdminData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-7 col-md-12 p-4 ">
          <div className="adminprofile-admin-records-main-div">
            <div className="d-flex flex-column">
              <p className="adminprofile-admin-records-text">Admin Records</p>
              <div className="d-flex adminprofile-total-admin-text-div">
                <span className="adminprofile-total-admin-text">
                  Total Admin's ({fullAdminData?.length})
                </span>
                <input
                  type="text"
                  placeholder="search"
                  className="adminprofile-search-input"
                ></input>
              </div>
            </div>

            <div className="d-flex flex-column p-2">
              {fullAdminData?.map((detail, index) => {
                return (
                  <div
                    className="d-flex mt-2  adminprofile-admin-records-perperson-div"
                    key={index}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        className="adminprofile-pro-img"
                        src={detail.admin_image}
                      ></img>
                    </div>
                    <div className="d-flex flex-column admin-profile-details">
                      <span className="admin-profile-user-name">
                        {detail.admin_name}
                      </span>
                      <span  className="admin-profile-email">{detail.admin_email}</span>
                      <span className="admin-profile-type">{detail.admin_type}</span>
                    </div>

                    <div className="adminprofile-share-icon-div  d-flex align-items-center justify-content-center">
                      <FaShareSquare
                        className="adminprofile-share-icon"
                        onClick={() => handleSpecificUser(detail)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 p-4">
          {specificUser && (
            <div className="adminprofile-admin-records-main-div">
              <p className="adminprofile-admin-records-text">
                {specificUser?.admin_name} Records
              </p>
              <div className="row">
                <div className="col-4">
                  <div className="d-flex flex-column ">
                    <span className="adminprofile-perperson-detail">
                      Admin Id
                    </span>
                    <span className="adminprofile-perperson-detail">Name</span>
                    <span className="adminprofile-perperson-detail">Email</span>
                    <span className="adminprofile-perperson-detail">Phone</span>
                    <span className="adminprofile-perperson-detail">Type</span>
                    <span className="adminprofile-perperson-detail">Image</span>
                  </div>
                </div>
                <div className="col-8">
                  <div className="d-flex flex-column">
                    <span className="adminprofile-perperson-detail-data">
                      {specificUser?.admin_id}
                    </span>
                    <span className="adminprofile-perperson-detail-data">
                      {specificUser?.admin_name}
                    </span>
                    <span className="adminprofile-perperson-detail-data">
                      {specificUser?.admin_email}
                    </span>
                    <span className="adminprofile-perperson-detail-data">
                      {specificUser?.admin_phone}
                    </span>
                    <span className="adminprofile-perperson-detail-data">
                      {specificUser?.admin_type}
                    </span>
                    <img
                      className="adminprofile-pro-image"
                      src={specificUser?.admin_image}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

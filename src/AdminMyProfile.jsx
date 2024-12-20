import React, { useEffect, useState } from "react";
import "./AdminMyProfile.css";
import man from "./image/man.jpg";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminMyProfile = ({ baseUrl }) => {
  const [selectedBtnName, setSelectedBtnName] = useState("My Profile");
  const [selectedButton, setSelectedButton] = useState(0);
  const [imgForUrl, setImgForUrl] = useState(null);
  const adminToken = localStorage.getItem("token");
  // const adminToken = sessionStorage.getItem("token");
  const navigate = useNavigate()
  const myprofileDetail = [{ name: "My Profile" }, { name: "Edit Profile" }];
  const [sinAdminData, setSinAdminData] = useState();

  const [mainData, setMainData] = useState({
    admin_name: "",
    admin_email: "",
    admin_phone: "",
    admin_image: "",
    admin_type: "",
  });

  const handleSelectButton = (e, index) => {
    setSelectedBtnName(e.target.value);
    setSelectedButton(index);
  };
  useEffect(() => {
    const handleSingleAdmin = async () => {
      try {
        const specAdmin = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_My_Details/${adminToken}`
        );

        // console.log(specAdmin);
        if (specAdmin.status === 200) {
          setSinAdminData(specAdmin.data.message);
          localStorage.setItem("image", specAdmin.data?.message.admin_image);
          // console.log(specAdmin.data.message.admin_image)
      
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleSingleAdmin();
  }, [baseUrl,selectedBtnName]);

  useEffect(() => {
    if (sinAdminData) {
      setMainData({
        admin_name: sinAdminData.admin_name,
        admin_email: sinAdminData.admin_email,
        admin_phone: sinAdminData.admin_phone,
        admin_image: sinAdminData.admin_image,
        admin_type: sinAdminData.admin_type,
      });
      console.log(sinAdminData, "maindata", mainData);
    }
  }, [sinAdminData]);



  const handleImgaeChange = (e) => {
    const specImg = e.target.files[0];
    setMainData((prevData) => {
      return { ...prevData, admin_image: specImg };
    });
  };

  const handleUpdate = async () => {
    console.log(mainData);
    const formData = new FormData();

    for (const key in mainData) {
      formData.append(key, mainData[key]);
    }

    try {
      const response = await axios.post(
        `${baseUrl}editMyDetailAdmin/${adminToken}`,
        formData
      );
      if (response.data) {
        alert(response.data.message);
        setSelectedBtnName("My Profile")
      }
    } catch (err) {
      console.log(err);
      alert("Error in Updating")
    }
  };

  // const handleInputChange = (e){
  //   const {name,value} = e.target
  //   setMainData((prevData) => ({...prevData,[name]:value}));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="row" style={{ padding: "30px" }}>
        <div className="col-lg-4 col-md-12  ">
          {
            <div className="d-flex flex-column myprofile-button-div">
              {myprofileDetail.map((btn, index) => (
                <div key={index} className="d-flex" style={{ width: "100%" }}>
                  <button
                    style={{
                      color: selectedButton === index ? "red" : "gray",
                      backgroundColor:
                        selectedButton === index ? "white" : "white",
                    }}
                    onClick={(e) => handleSelectButton(e, index)}
                    key={index}
                    value={btn.name}
                    className="adminMyprofile-button"
                  >
                    {btn.name}
                  </button>
                  <div
                    className="myprofile-button-span"
                    style={{
                      backgroundColor:
                        selectedButton === index ? "red" : "black",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          }
        </div>

        {selectedBtnName === "My Profile" && (
          <>
            <div className="col-lg-4 col-md-12 myprofile-all-col mb-3">
              <div
                className="row my-profile-detail-row"
                style={{ padding: "20px" }}
              >
                <div className="myprofile-profile-text mb-3">
                  My Profile Details
                </div>
                <div className="col-lg-6 col-5">
                  <div className="d-flex flex-column gap-4 ">
                    <span className="myprofile-1stcol-span">Admin Id</span>
                    <span className="myprofile-1stcol-span">Name</span>

                    <span className="myprofile-1stcol-span">Email</span>
                    <span className="myprofile-1stcol-span">Contact No</span>
                    <span className="myprofile-1stcol-span">Admin Type</span>
                  </div>
                </div>
                <div className="col-lg-6 col-7 ">
                  <div className="d-flex flex-column gap-4">
                    <span className="myprofile-2ndcol-span">
                      {sinAdminData?.admin_id}
                    </span>
                    <span className="myprofile-2ndcol-span">
                      {" "}
                      {sinAdminData?.admin_name}
                    </span>

                    <span className="myprofile-2ndcol-span">
                      {sinAdminData?.admin_email}
                    </span>
                    <span className="myprofile-2ndcol-span">
                      {" "}
                      {sinAdminData?.admin_phone}
                    </span>
                    <span className="myprofile-2ndcol-span">
                      {" "}
                      {sinAdminData?.admin_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 myprofile-all-col2 mb-3">
              <div
                className="d-flex justify-content-center myprofile-pro-image"
                style={{ padding: "30px" }}
              >
                <img
                  className="myprofile-image"
                  src={sinAdminData?.admin_image}
                ></img>
              </div>
            </div>
          </>
        )}

        {selectedBtnName === "Edit Profile" && (
          <div className="col-lg-8 col-md-12">
            <div className="change-password-whole-div">
              <p className="change-password-text">Edit User Profile</p>
              <div className="row edit-profile-field-row">
                <div className="col-lg-6 col-md-12 ">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column">
                      <label className="loginpage-label">Name</label>
                      <input
                        className="editprofile-input"
                        value={mainData?.admin_name}
                        type="text"
                        name="admin_name"
                        onChange={handleInputChange}
                      ></input>
                    </div>

                    <div className="d-flex flex-column mb-2">
                      <label className="loginpage-label">Admin Type</label>
                      <select
                        className="editprofile-input"
                        value={mainData?.admin_type}
                        type="text"
                        name="admin_type"
                        onChange={handleInputChange}
                      >
                        <option>Primary</option>
                        <option>Secondary</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 ">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column">
                      <lable className="loginpage-label">Email</lable>
                      <input
                        className="editprofile-input"
                        value={mainData?.admin_email}
                        type="text"
                        name="admin_email"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="d-flex flex-column">
                      <lable className="loginpage-label">Contact</lable>
                      <input
                        className="editprofile-input"
                        value={mainData?.admin_phone}
                        type="text"
                        name="admin_phone"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex flex-column">
                      <label className="loginpage-label mt-2">
                        Select Image
                      </label>
                      <img
                        className="usermem-man-img "
                        src={mainData.admin_image}
                      ></img>
                      <input
                        type="file"
                        name="admin_image"
                        onChange={handleImgaeChange}
                        className="mt-3"
                        accept="image/*"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mb-3 mt-4 changepassword-button-div">
                  <button
                    className="change-password-update-button"
                    onClick={handleUpdate}
                  >
                    UPDATE
                  </button>
                  <button onClick={()=>setSelectedBtnName("My Profile")} className="change-password-cancel-button" >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMyProfile;

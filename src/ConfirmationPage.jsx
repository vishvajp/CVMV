import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ConfirmationPage.css"

const ConfirmationPage = ({ baseUrl }) => {
  const location = useLocation();
  const mob = location.state?.mobile;
const navigate = useNavigate()
const mob_phone = sessionStorage.getItem("user_phone")

  // console.log(matriToken, matrimonyToken);

  const [formData, setFormData] = useState({
    matri_user_name: "",
    matri_user_proof: "",
    matri_user_phone: mob_phone,
    matri_user_address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(formData);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Create_Matri_User`,
        formData
      );
      if (response.data) {
     const name = formData.matri_user_name
       const matri_token =response.data?.matri_token
        alert(response.data.message);
        // localStorage.setItem("mat_token", matri_token);
        sessionStorage.setItem("mat_token",matri_token);
        sessionStorage.setItem("mat_name",name);
        navigate("/home/addmatri", { state: { matri_token } })
      }

      //   console.log("Success:", response.data);
      //   setToken(response.data.matri_token);
      //   console.log(token);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-lg-5 col-12">
            <div className="d-flex justify-content-lg-end justify-content-center">
              <label>Name:</label>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="d-flex justify-content-lg-start justify-content-center">
              <input
              className="confirmation-page-input"
                type="text"
                placeholder="Enter Name"
                name="matri_user_name"
                value={formData.matri_user_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-5 col-12">
            <div className="d-flex justify-content-lg-end justify-content-center">
              <label>proof:</label>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="d-flex justify-content-lg-start justify-content-center">
              <input
              placeholder="Enter Proof"
              className="confirmation-page-input "
                type="text"
                name="matri_user_proof"
                value={formData.matri_user_proof}
                onChange={handleChange}
                maxLength={12}
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-5 col-12">
            <div className="d-flex justify-content-lg-end justify-content-center">
              <label>Phone No:</label>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="d-flex justify-content-lg-start justify-content-center">
            <input
  className="confirmation-page-input"
  type="text"
  name="matri_user_phone"
  value={mob_phone}
  readOnly
  required
/>

            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-5 col-12">
            <div className="d-flex justify-content-lg-end justify-content-center">
            <label>
            Address:
            </label>
            </div>
          </div>
          <div className="col-lg-7 col-12">
            <div className="d-flex justify-content-lg-start justify-content-center">
            <textarea
            placeholder="Enter Address"
            className="confirmation-page-input"
              type="text"
              name="matri_user_address"
              value={formData.matri_user_address}
              onChange={handleChange}
              required
            />
            </div>
          </div>
        </div>
<div className="d-flex justify-content-center">
        <button type="submit" className="confirmation-page-submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmationPage;

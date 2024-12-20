import axios from "axios";
import React, { useEffect, useState } from "react";

const Location = ({ baseUrl }) => {
  const [addDistrict, setAddDistrict] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [native, setNative] = useState("");
  const [selectedNative, setSelectedNative] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const adminToken = localStorage.getItem("token");
  console.log(adminToken);

  useEffect(() => {
    const handleGetDistrictData = async () => {
      try {
        const response = await axios.post(`${baseUrl}get_dist`);
        const data = response.data.district;
        console.log(data);
        setDistrictData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetDistrictData();
  }, [baseUrl]);

  const handleAddDistrict = async () => {
    const submitDistric = {
      district: addDistrict,
    };

    try {
      const response = await axios.post(
        `${baseUrl}/${adminToken}`,
        submitDistric
      );
      if (response.data) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDistrictChange = (e) => {
    const disdata = e.target.value;
    setSelectDistrict(disdata);
    const disId = districtData?.filter(
      (specDist) => specDist.district === disdata
    );
    setDistrictId(disId.location_id);
    console.log(disId[0]?.location_id);
  };

  const handleNative = (e) => {
    const nat = e.target.value;
    setNative(nat);
  };

  const handleAddNative = () => {
    const singleNate = native;
    setSelectedNative((prevSelectedNative) => [
      ...prevSelectedNative,
      singleNate,
    ]);
    setNative("");
  };

  console.log(selectedNative);

  const handleSubmitNative = async () => {
    const fullNative = {
      native: selectedNative,
    };
    try {
      const response = await axios.post(`${baseUrl}/${districtId}`, fullNative);
      if (response.data) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userEditPage-contact-detail-div mx-2">
      <div className="d-flex flex-column">
        <label className="user-edit-form-label">Add District</label>
        <input
          style={{ width: "100%" }}
          placeholder="Enter New District Name"
          className="user-edit-form-choose-file-input"
          value={addDistrict}
          onChange={(e) => setAddDistrict(e.target.value)}
        ></input>
        <div className="d-flex justify-content-center">
          <button
            className="scrolling-update-button"
            onClick={handleAddDistrict}
          >
            Add District
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column">
            <label className="user-edit-form-label">Select District</label>
            <select
              style={{ width: "100%" }}
              placeholder="Enter New District Name"
              className="user-edit-form-choose-file-input"
              value={selectDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {districtData?.map((dis) => (
                <option key={dis.location_id} value={dis.name}>
                  {dis.district}
                </option>
              ))}
            </select>
            {/* <div className="d-flex justify-content-center">
      <button className="scrolling-update-button" onClick={handleAddDistrict} >Submit Native</button>
      </div> */}
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex flex-column justify-content-center">
            <label className="user-edit-form-label">Add Native</label>
            <div className="d-flex gap-3">
              <input
                style={{ width: "60%", marginBottom: "0px" }}
                placeholder="Enter New Native Name"
                className="user-edit-form-choose-file-input"
                value={native}
                onChange={handleNative}
              ></input>

              <button
                className="scrolling-update-button"
                onClick={handleAddNative}
              >
                Add Native
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="d-flex flex-column">
            <span className="user-edit-form-label">Selected Natives</span>
            {selectedNative.length > 0 && (
              <div
                style={{ width: "100%" }}
                className="d-flex flex-wrap user-edit-form-choose-file-input"
              >
                {selectedNative?.map((singleNat, index) => (
                  <span className="me-1" key={index}>
                    {`${singleNat}${
                      index !== selectedNative.length - 1 ? ", " : "."
                    }`}
                  </span>
                ))}
              </div>
            )}
            <div className="d-flex justify-content-center">
              <button
                className="banner-edit-button"
                onClick={handleSubmitNative}
              >
                Submit Native
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./UserMemPage.css";
import "./UserMemFilter.css";
import man from "./image/cvmvlogo.png";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const UserMemFilterPage = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  // const [specMatUser, setSpecMatUser] = useState();
  const [sinDelUser, setSinDelUser] = useState();
  const [delResponse, setDelResponse] = useState();
  const [specUser, setSpecUser] = useState();
  const [district, setDistrict] = useState();
  const [districtData, setDistrictData] = useState(null);
  const [nativeData, setNativeData] = useState(null);
  const [native, setNative] = useState();
  const singlePersonNav = useNavigate();
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setNative("");
  };

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_ALl_Mem_Admin`
        );
        const data = response.data.Members;
        console.log(data);
        setUserData(data);
        setFilteredData(data); // Set filteredData initially to full userData
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl, delResponse]);

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

  useEffect(() => {
    const handleGetDistrictData = async () => {
      if (district) {
        try {
          const response = await axios.post(`${baseUrl}get_native/${district}`);
          const data = response.data.native;
          // console.log(data);
          setNativeData(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleGetDistrictData();
  }, [district]);

  const handleSpecificActive = (user) => {
    setSpecUser(user);
  };

  useEffect(() => {
    if (specUser) {
      singlePersonNav("/user/membership/detail", { state: specUser });
    }
  }, [specUser]);

  const handleDelete = async (spec) => {
    // Show a confirmation dialog before proceeding with deletion
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );

    // If the user clicks "OK", proceed with deletion
    if (confirmation) {
      try {
        const responseDel = await axios.post(
          `${baseUrl}Tsit_Cvmv_Mem_Delete_Admin/${spec.mem_id}`
        );
        console.log(responseDel);
        window.alert(`${responseDel.data.message}`);
        setDelResponse(responseDel.data);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  useEffect(() => {
    const filtered = userData.filter((user) => {
      const matchesSearch =
        user.first_name.toLowerCase().includes(search) ||
        user.mem_id.toLowerCase().endsWith(search) ||
        user.phone.toLowerCase().includes(search);

      const matchesDistrict = district ? user.district === district : true;
      const matchesNative = native ? user.native_place === native : true;
      const userCreatedDate = user.created_date
        ? new Date(user.created_date.split("-").reverse().join("-"))
        : null;

      const fromDateObj = fromDate ? new Date(fromDate) : null;
      const toDateObj = toDate ? new Date(toDate) : null;

      const date =
        fromDateObj && toDateObj
          ? userCreatedDate >= fromDateObj && userCreatedDate <= toDateObj
          : true;

      return matchesSearch && matchesDistrict && matchesNative && date;
    });

    const sortedFiltered = filtered.sort((a, b) => {
      const aIdMatch = a.mem_id.toLowerCase().endsWith(search) ? 1 : 0;
      const bIdMatch = b.mem_id.toLowerCase().endsWith(search) ? 1 : 0;
      return bIdMatch - aIdMatch;
    });

    setFilteredData(sortedFiltered);
  }, [search, userData, district, native, fromDate, toDate]);

  return (
    <div>
      {" "}
      <div className="row">
        <div className="col-lg-11 col-11 p-4">
          <div className="usermem-1stcol-main-div">
            <div className=" usermem-active-mem-records-div">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <span className="userfill-records-text">
                    Memebership Records
                  </span>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <label>From Date</label>
                    <input
                    className="userMem-filter-select"
                      onChange={(e) => setFromDate(e.target.value)}
                      type="date"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <label>To Date</label>
                    <input
                    className="userMem-filter-select"
                      onChange={(e) => setToDate(e.target.value)}
                      type="date"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-3 col-12">
                  <div
                    className="d-flex align-items-end"
                    style={{ height: "100%" }}
                  >
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="usermem-filter-search-input "
                      placeholder="Search name/id/number"
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <lable>Select District</lable>
                    <select
                      className="userMem-filter-select"
                      value={district}
                      onChange={handleDistrictChange}
                    >
                      <option value="">Select District</option>
                      {districtData?.map((dist) => (
                        <>
                          <option>{dist.district}</option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <lable>Select Native</lable>
                    <select
                      value={native}
                      onChange={(e) => setNative(e.target.value)}
                      className="userMem-filter-select"
                    >
                      <option value="">Select Native</option>
                      {nativeData?.map((nat) => (
                        <>
                          <option>{nat.native_place}</option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div
                    className="d-flex align-items-end justify-content-center"
                    style={{ height: "100%" }}
                  >
                    <button
                      className="usermem-filter-print-button"
                      onClick={reactToPrintFn}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div ref={contentRef}>
              {filteredData?.map((user, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-evenly usermem-all-details-div"
                >
                  <img
                    src={man}
                    className="usermem-man-img"
                    alt={`User ${user.first_name}`}
                  />

                  <div className="d-flex flex-column usermem-user-mid-detail">
                    <span className="userfilter-name-span">
                      {user.first_name}, {user.last_name}
                    </span>
                    <span className="mb-1  userfilter-address-span">
                      {user.native_place} , <span>{user.district}</span>
                    </span>
                    <span className="usermem-userid-span">{user.mem_id}</span>{" "}
                    <span className="userfilter-contact-span">
                      {user.phone}
                    </span>
                  </div>
                  <span className="d-flex flex-column gap-3 justify-content-center align-items-center filter-more-delete-button-span">
                    <button
                      className="userfiter-moredetails-button"
                      onClick={() => handleSpecificActive(user)}
                    >
                      More Details{" "}
                    </button>
                    <button
                      className="userfilter-delete-button"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMemFilterPage;

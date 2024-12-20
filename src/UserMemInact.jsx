import React, { useState, useEffect } from "react";
import axios from "axios";
import man from "./image/cvmvlogo.png";
import { useNavigate } from "react-router-dom";

const UserMemInact = ({ baseUrl,delResponse }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  // const [specMatUser, setSpecMatUser] = useState();
  // const [sinDelUser, setSinDelUser] = useState();
  // const [delResponse, setDelResponse] = useState();
  const [specUser, setSpecUser] = useState();
  const singlePersonNav = useNavigate();

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_ALl_Inactive_Mem_Admin`
        );
        const data = response.data.Members
        // console.log(data)
        setUserData(data);
        setFilteredData(data); // Set filteredData initially to full userData
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl,delResponse]);

  const handleSpecificActive = (user) => {
    setSpecUser(user);
  };

  useEffect(() => {
    if (specUser) {
      singlePersonNav("/home/user/meminact", { state: specUser });
    }
  }, [specUser]);

 const handleSearch = (e) => {
    // console.log(userData);
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = userData.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.mem_id.toLowerCase().endsWith(searchTerm) ||
        user.phone.toLowerCase().includes(searchTerm)
    );
    const sortedFiltered = filtered.sort((a, b) => {
      const aIdMatch = a.mem_id
        .toLowerCase()
        .endsWith(searchTerm)
        ? 1
        : 0;
      const bIdMatch = b.mem_id
        .toLowerCase()
        .endsWith(searchTerm)
        ? 1
        : 0;
      return bIdMatch - aIdMatch; // Place items with ID matches first
    });
    setFilteredData(sortedFiltered);
  };

  return (
    <div>
      <div className="usermem-1stcol-main-div">
            <div className="d-flex usermem-active-mem-records-div justify-content-between">
              <div className="userfill-records-text-div">
                <span className="userfill-records-text">
                  Memebership Inactive Records
                </span>
              </div>
          
            </div>
            <div className="d-flex justify-content-between usermem-total-activ-div">
              <span className="usermem-total-active-mem-text userfill-records-text">
                Total Membership Inactive Users
              </span>
              <div className="pe-2">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  className="usermem-search-input "
                  placeholder="Search name/id/number"
                />
              </div>
            </div>
            {filteredData.map((user, index) => (
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
                  <span className="userfilter-name-span">{user.first_name}, {user.last_name}</span>
                  <span  className="mb-1  userfilter-address-span">{user.native_place} , <span>{user.district}</span></span>
               
                    <span className="usermem-userid-span">
                      {user.mem_id}
                    </span>{" "}
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
               
                </span>
              </div>
            ))}
          </div>
    </div>
  );
};

export default UserMemInact;

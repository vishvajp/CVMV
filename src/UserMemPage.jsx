import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserMemPage.css";
import { BsCalendarDate } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import man from "./image/cvmvlogo.png";
import { useNavigate } from "react-router-dom";
import UserMemInact from "./UserMemInact";
// import axios from "axios";

const UserMemPage = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  // const [specMatUser, setSpecMatUser] = useState();
  const [sinDelUser, setSinDelUser] = useState();
  const [delResponse, setDelResponse] = useState();
  const [specUser, setSpecUser] = useState();
  const singlePersonNav = useNavigate();
  const navigate = useNavigate()
  

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_ALl_Mem_Admin`
        );
        const data = response.data.Members;
        // console.log(data)
        setUserData(data);
        setFilteredData(data); // Set filteredData initially to full userData
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl, delResponse]);

  // console.log(userData)

  const handleSpecificActive = (user) => {
    setSpecUser(user);
  };

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
    if (specUser) {
      singlePersonNav("/user/membership/detail", { state: specUser });
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
      const aIdMatch = a.mem_id.toLowerCase().endsWith(searchTerm) ? 1 : 0;
      const bIdMatch = b.mem_id.toLowerCase().endsWith(searchTerm) ? 1 : 0;
      return bIdMatch - aIdMatch; // Place items with ID matches first
    });
    setFilteredData(sortedFiltered);
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-11 p-4">
          <div className="usermem-1stcol-main-div">
            <div className="d-flex usermem-active-mem-records-div justify-content-between">
              <div className="userfill-records-text-div">
                <span className="userfill-records-text">
                  Memebership Records
                </span>
              </div>
              <div className="d-flex usermem-1st-col-icons-div justify-content-end gap-3 align-items-center pe-2">
                {/* <BsCalendarDate className="memfill-icon" />
                <IoIosPrint className="memfill-icon" /> */}
                <FaFilter onClick={()=>navigate("/home/memuser/filter")} className="memfill-icon" />
                <FaFolderPlus
                onClick={()=>navigate("/home/membership/add")}
                  className="memfill-icon"
                  // onClick={() => handleOtpPage()}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between usermem-total-activ-div">
              <span className="usermem-total-active-mem-text userfill-records-text">
                Total Membership Users
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
                  <span className="userfilter-name-span">
                    {user.first_name}, {user.last_name}
                  </span>
                  <span className="mb-1  userfilter-address-span">
                    {user.native_place} , <span>{user.district}</span>
                  </span>
                  <span className="usermem-userid-span">{user.mem_id}</span>{" "}
                  <span className="userfilter-contact-span">{user.phone}</span>
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
        <div className="col-lg-6 col-11 p-4">
          <UserMemInact baseUrl={baseUrl} delResponse={delResponse} />
        </div>
      </div>
    </div>
  );
};

export default UserMemPage;

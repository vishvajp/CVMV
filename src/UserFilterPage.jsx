import React, { useEffect, useState } from "react";
import "./UserFilterPage.css";
import axios from "axios";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import man from "./image/cvmvlogo.png";
import UserMatInActList from "./UserMatInActList";

const UserFilterPage = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [specMatUser, setSpecMatUser] = useState();
  const [sinDelUser, setSinDelUser] = useState();
  const [delResponse, setDelResponse] = useState();
  const adminToken = localStorage.getItem("token")
const [matCount, setMatCount]=useState();
  const NavToSinMat = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_All_Matri_Details_Admin/${adminToken}`
        );
        const data = response.data.matrimony_records;
        console.log(data);
        setUserData(data);
     setMatCount(data.length)
        setFilteredData(data); // Set filteredData initially to full userData
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl, delResponse]);

  const handleSpecificActive = (user) => {
    setSpecMatUser(user);
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
          `${baseUrl}Tsit_Cvmv_Mat_Delete_Admin/${spec.matrimony_details.matri_id}`
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
    if (specMatUser) {
      // Pass the specMatUser data as part of the state
      NavToSinMat("/user/matrimony/detail", { state: specMatUser });
    }
  }, [specMatUser]);

  const handleSearch = (e) => {
    // console.log(userData);
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = userData.filter(
      (user) =>
        user.matrimony_details.name.toLowerCase().includes(searchTerm) ||
        user.matrimony_details.matri_id.toLowerCase().endsWith(searchTerm) ||
        user.matrimony_details.contact_detail.toLowerCase().includes(searchTerm)
    );
    const sortedFiltered = filtered.sort((a, b) => {
      const aIdMatch = a.matrimony_details.matri_id
        .toLowerCase()
        .endsWith(searchTerm)
        ? 1
        : 0;
      const bIdMatch = b.matrimony_details.matri_id
        .toLowerCase()
        .endsWith(searchTerm)
        ? 1
        : 0;
      return bIdMatch - aIdMatch; // Place items with ID matches first
    });
    setFilteredData(sortedFiltered);
  };

  // console.log(userData.length,filteredData.length)
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-11 p-4">
          <div className="usermem-1stcol-main-div">
            <div className="d-flex usermem-active-mem-records-text justify-content-between">
              <div className="userfill-records-text-div">
                <span className="userfill-records-text">Matrimony Records</span>
              </div>
              <div className="d-flex usermem-1st-col-icons-div justify-content-end gap-3 align-items-center pe-2">
                {/* <BsCalendarDate className="userfill-icon" />
                <IoIosPrint className="userfill-icon" /> */}
                <FaFilter
                  onClick={() => navigate("/user/matrimony/filter")}
                  className="userfill-icon"
                />
                <FaFolderPlus 
                onClick={()=>navigate("/home/otp")} className="userfill-icon" />
              </div>
            </div>
            <div className="d-flex justify-content-between usermem-total-activ-mem">
              <span className="usermem-total-active-mem-text userfill-records-text">
                Total Matrimony Users ({matCount})
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
                  alt={`User ${user.matrimony_details.name}`}
                />

                <div className="d-flex flex-column usermem-user-mid-detail">
                  <span className="userfilter-name-span">
                    {user.matrimony_details.name}
                  </span>
                  <span className="mb-1 userfilter-address-span">
                    {user.matrimony_details.address}
                  </span>
                  <span className="userfilter-userid-span">
                    {user.matrimony_details.matri_id}
                  </span>{" "}
                  <span className="userfilter-contact-span">
                    {user.matrimony_details.contact_detail}
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
        <div className="col-lg-6 col-11 p-4">
          <UserMatInActList baseUrl={baseUrl}  delResponse={delResponse} />
        </div>
      </div>
    </div>
  );
};

export default UserFilterPage;

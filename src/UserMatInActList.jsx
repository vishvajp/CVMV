import React, { useEffect, useState } from "react";
import man from "./image/cvmvlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserMatInActList = ({baseUrl,delResponse}) => {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [specMatUser, setSpecMatUser] = useState();
    const [inactCount,setInactCount]=useState("");
    const NavToSinMat = useNavigate();


    useEffect(() => {
        const handleGetUserData = async () => {
          try {
            const response = await axios.post(
              `${baseUrl}Tsit_Cvmv_Get_All_Matri_Inactive_Details_Admin`
            );
            const data = response.data.matrimony_records;
            // console.log(data)
            setUserData(data);
            setFilteredData(data);
            setInactCount(response.data.mat_inactive_count) 
          } catch (err) {
            console.log(err);
          }
        };
    
        handleGetUserData();
      }, [baseUrl,delResponse]);

    



      useEffect(() => {
        if (specMatUser) {
          // Pass the specMatUser data as part of the state
          NavToSinMat("/user/matrimony/inactdetail", { state: specMatUser });
        }
      }, [specMatUser]);

      const handleSpecificActive = (user) => {
        setSpecMatUser(user);
      };
    

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
  return (
    <div> <div className="usermem-1stcol-main-div">
    <div className="d-flex usermem-active-mem-records-text justify-content-between">
      <div className="userfill-records-text-div">
        <span className="userfill-records-text">Matrimony <span>Inactive</span> Records</span>
      </div>
    
    </div>
    <div className="d-flex justify-content-between usermem-total-activ-mem">
      <span className="usermem-total-active-mem-text userfill-records-text">
        Total Records ({inactCount})
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
          <span className="userfilter-name-span">{user.matrimony_details.name}</span>
          <span className="mb-1 userfilter-address-span">{user.matrimony_details.address}</span>
        
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
       
        </span>
      </div>
    ))}
  </div></div>
  )
}

export default UserMatInActList
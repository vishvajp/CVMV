import React, { useEffect, useState, useRef } from "react";
import "./UserFilterPage.css";
import axios from "axios";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";
import man from "./image/cvmvlogo.png";
import "./UserMatFilter.css";
import { useReactToPrint } from "react-to-print";

const UserMatFilter = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [specMatUser, setSpecMatUser] = useState();
  const [sinDelUser, setSinDelUser] = useState();
  const [delResponse, setDelResponse] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectAge, setSelectAge] = useState("");
  const [selectRasi, setSelectRasi] = useState("");
  const [selectNakshatra, setSelectNakshatra] = useState("");
  const [selectDistrict, setSelectDistirc] = useState("");
  const [selectMarital, setSelectMarital] = useState("");
  const [minValue, set_minValue] = useState(null);
  const [maxValue, set_maxValue] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const adminToken = localStorage.getItem("token")

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // const handleInput = (e) => {
  //   set_minValue(e.minValue);
  //   set_maxValue(e.maxValue);
  // };

  console.log(minValue, maxValue);
  const NavToSinMat = useNavigate();

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
           `${baseUrl}Tsit_Cvmv_Get_All_Matri_Details_Admin/${adminToken}`
        );
        const data = response.data.matrimony_records;
        console.log(data);
        setUserData(data);
        setFilteredData(data); // Set filteredData initially to full userData
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, []);

  console.log(userData)
  const handleSpecificActive = (user) => {
    setSpecMatUser(user);
    console.log(user);
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

  useEffect(() => {
    const filtered = userData.filter((user) => {
      const matchesSearch =
        user.matrimony_details.name.toLowerCase().includes(searchTerm) ||
        user.matrimony_details.matri_id.toLowerCase().endsWith(searchTerm) ||
        user.matrimony_details.contact_detail
          .toLowerCase()
          .includes(searchTerm);

      const gender = selectGender
        ? user.matrimony_details?.gender === selectGender
        : true;
      const rasi = selectRasi
        ? user.matrimony_details?.j_rasi === selectRasi
        : true;
      const nakshatra = selectNakshatra
        ? user.matrimony_details?.j_nakshatra === selectNakshatra
        : true;
      const marital = selectMarital
        ? user.matrimony_details?.m_status === selectMarital
        : true;

      const userCreatedDate = user.matrimony_details?.created_at
        ? new Date(user.matrimony_details?.created_at.slice(0, 10)) // Convert to Date
        : null;

      const fromDateObj = fromDate ? new Date(fromDate) : null;
      const toDateObj = toDate ? new Date(toDate) : null;

      const date =
        fromDateObj && toDateObj
          ? userCreatedDate >= fromDateObj && userCreatedDate <= toDateObj
          : true;
      // console.log(
      //   "fromdate",
      //   fromDateObj,
      //   "toDate",
      //   toDateObj,
      //   "create",
      //   userCreatedDate
      // );
      const age = minValue && maxValue
        ? parseInt(user.matrimony_details.age) >= parseInt(minValue) &&
          parseInt(user.matrimony_details.age) <= parseInt(maxValue)
        : true;
      console.log(minValue, maxValue, age);
      return (
        matchesSearch && gender && rasi && nakshatra && marital && date && age
      );
    });

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
      return bIdMatch - aIdMatch;
    });
    setFilteredData(sortedFiltered);
  }, [
    searchTerm,
    selectGender,
    selectRasi,
    selectNakshatra,
    selectMarital,
    fromDate,
    toDate,
    minValue,
    maxValue,
  ]);

  console.log(filteredData.length,userData.length);

  return (
    <div>
      <div className="row">
        <div className="col-11 p-4">
          <div className="usermem-1stcol-main-div">
            <div className=" usermem-active-mem-records-text ">
              <div className="row">
                <div className="col-lg-3 col-12">
                  <div
                    style={{ height: "100%" }}
                    className="d-flex align-items-center"
                  >
                    <span className="userfill-records-text">
                      Matrimony Records
                    </span>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <label>Choose Gender</label>
                    <select
                      className="userMem-filter-select"
                      onChange={(e) => setSelectGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <label>Choose Rasi</label>
                    <select
                      className="userMem-filter-select"
                      value={selectRasi}
                      onChange={(e) => setSelectRasi(e.target.value)}
                    >
                      <option value="">Select Rasi</option>
                      <option>Aries/மேஷம்</option>
                      <option>Taurus/ரிஷபம்</option>
                      <option>Gemini/மிதுனம்</option>
                      <option>Cancer/கடகம்</option>
                      <option>Leo/சிம்மம்</option>
                      <option>Virgo/கன்னி</option>
                      <option>Libra/துலாம்</option>
                      <option>Scorpio/விருச்சிகம்</option>
                      <option>Sagittarius/தனுசு</option>
                      <option>Capricorn/மகரம்</option>
                      <option>Aquarius/கும்பம்</option>
                      <option>Pisces/மீனம்</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="d-flex flex-column">
                    <label>Choose Nakshatra</label>
                    <select
                      className="userMem-filter-select"
                      value={selectNakshatra}
                      onChange={(e) => setSelectNakshatra(e.target.value)}
                    >
                      <option value="">Select Nakshatra</option>
                      <option>Ashwini/அஸ்வினி</option>
                      <option>Bharani/பரணி</option>
                      <option>Krittika/கார்த்திகை</option>
                      <option>Rohini/ரோஹிணி</option>
                      <option>Mrigashira/மிருகசீரிடம்</option>
                      <option>Ardra/திருவாதிரை</option>
                      <option>Punarvasu/புனர்பூசம்</option>
                      <option>Pushya/பூசம்</option>
                      <option>Ashlesha/ஆயில்யம்</option>
                      <option>Magha/மகம்</option>
                      <option>Purva Phalguni/பூரம்</option>
                      <option>Uttara Phalguni/உத்திரம்</option>
                      <option>Hasta/ஹஸ்தம்</option>
                      <option>Chitra/சித்திரை</option>
                      <option>Swati/சுவாதி</option>
                      <option>Vishakha/விசாகம்</option>
                      <option>Anuradha/அனுஷம்</option>
                      <option>Jyeshtha/கேட்டை</option>
                      <option>Mula/மூலம்</option>
                      <option>Purva Ashadha/பூராடம்</option>
                      <option>Uttara Ashadha/உத்திராடம்</option>
                      <option>Shravana/திருவோணம்</option>
                      <option>Dhanishta/அவிட்டம்</option>
                      <option>Shatabhisha/சதயம்</option>
                      <option>Purva Bhadrapada/பூரட்டாதி</option>
                      <option>Uttara Bhadrapada/உத்திரட்டாதி</option>
                      <option>Revati/ரேவதி</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div
                    style={{ height: "100%" }}
                    className="d-flex flex-column justify-content-center "
                  >
                    <label>Choose Age</label>
                    <div className="d-flex gap-2">
                      <input
                        type="number"
                        className="mat-filter-age-input"
                        placeholder="From"
                        onChange={(e) => set_minValue(e.target.value)}
                        value={minValue}
                      />
                      <input
                        type="number"
                        className="mat-filter-age-input"
                        placeholder="To"
                        onChange={(e) => set_maxValue(e.target.value)}
                        value={maxValue}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div
                    style={{ height: "100%" }}
                    className="d-flex flex-column justify-content-center "
                  >
                    <label>Choose Marital Status</label>
                    <select
                      className="userMem-filter-select"
                      value={selectMarital}
                      onChange={(e) => setSelectMarital(e.target.value)}
                    >
                      <option value="">Select Marital</option>
                      <option>Never Married</option>
                      <option>Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div
                    style={{ height: "100%" }}
                    className="d-flex flex-column justify-content-center "
                  >
                    <label>From Date</label>
                    <input
                      className="userMem-filter-select"
                      onChange={(e) => setFromDate(e.target.value)}
                      type="date"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div
                    style={{ height: "100%" }}
                    className="d-flex flex-column justify-content-center "
                  >
                    <label>To Date</label>
                    <input
                      className="userMem-filter-select"
                      onChange={(e) => setToDate(e.target.value)}
                      type="date"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between usermem-total-activ-mem">
              <span className="usermem-total-active-mem-text userfill-records-text">
                Total Filtered Users ({filteredData.length})
              </span>
              <button className="print-button" onClick={reactToPrintFn}>
                Print
              </button>
              <div className="pe-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="usermem-search-input"
                  placeholder="Search name/id/number"
                />
              </div>
            </div>
            <div ref={contentRef}>
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
        </div>
      </div>
    </div>
  );
};

export default UserMatFilter;

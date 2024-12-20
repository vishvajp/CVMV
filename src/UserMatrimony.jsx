import React, { useState, useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { IoIosPrint } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import "./UserMatrimony.css";
import man from "./image/man.jpg";
import { FaUser } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserMatrimony = () => {
  const [matSearch, setMatSearch] = useState();

  // const [specMatUser, setSpecMatUser] = useState();
  // const NavToSinMat = useNavigate();
  const matUserData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      whatsapp: "", 
      gender: "Male",
      maritalStatus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",
      userId: "TM6576846346",
      wifi: "GOwri",
    },
    {
      id: 2,
      name: "John cena",
      email: "john.doe@example.com",
      phone: "12345",
      whatsapp: "",
      gender: "Male",
      maritalStaus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",
      userId: "TM6576846346",
      wife: "GOwri",
    },
    {
      id: 3,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      whatsapp: "",
      gender: "Male",
      maritalStaus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",
      userId: "TM6576846346",
      wife: "GOwri",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      whatsapp: "",
      gender: "Male",
      maritalStaus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",

      userId: "TM6576846346",
      wife: "GOwri",
    },
    {
      id: 5,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234",
      whatsapp: "",
      gender: "Male",
      maritalStaus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",
      userId: "TM6576846346",
      wife: "GOwri",
    },
    {
      id: 6,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      whatsapp: "",
      gender: "Male",
      maritalStaus: "Married",
      dateOfBirth: "10/02/2022",
      bloodGroup: "A+",
      qualification: "B.tech",
      distric: "chennai",
      location: "tamilnadu",
      kulaDeivam: "MaariAmman",
      templePlace: "Madurai",
      vagaiyara: "",
      address: "No 123, checking with frontent, chennai",
      pincode: "789456",
      jobType: "business",
      jobDesignation: "realestate",
      jobLocation: "chennai",
      annualIncome: "5,00,000",
      fatherName: "Govind",
      fatherDob: "18/10/1971",
      fatherPhone: "23366547891",
      fatherQualifictaion: "btech",
      fatherJobDetail: "real estate",
      motherName: "nirmala",
      motherDob: "18/10/1975",
      motherPhone: "67846435313",
      motherQualifictaion: "btech",
      motherJobDetail: "housewife",
      image: "",
      userId: "TM6576846346",
      wife: "GOwri",
    },
  ];

// const handleSearch = (e)=>{
//   setMatSearch(e.target.value)
//   const searchTermLower = matSearch?.toLowerCase()
//   const filterSearch = matUserData.filter((user)=>user.name.toLowerCase().includes(searchTermLower))

// setSearchFilter(filterSearch)
// }
const handleSearch = (e) => {
  const searchTermLower = e.target.value.toLowerCase();
  setMatSearch(e.target.value);
  const filterSearch = matUserData.filter((user) =>
    user.name.toLowerCase().includes(searchTermLower)
  );
  setSearchFilter(filterSearch);

};


  // const handleSpecificActive = (userId) => {
  //   const perPerson = matUserData.find((onePerson) => onePerson.id === userId);
  //   setSpecMatUser(perPerson);
  // };

  // useEffect(() => {
  //   if (specMatUser) {
  //     // Pass the specMatUser data as part of the state
  //     NavToSinMat("/user/matrimony/detail", { state: specMatUser });
  //   }
  // }, [specMatUser]);

  const [searchFilter,setSearchFilter]= useState(matUserData)


  const handleFilterNav = ()=>{

  } 

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-12 p-4">
          <div className="usermem-1stcol-main-div">
            <div className="d-flex usermem-active-mem-records-text justify-content-around">
              <div>
                <span> Matrimony Records</span>
              </div>
              <div className="d-flex usermem-1st-col-icons-div justify-content-end gap-3 align-items-center">
             
                <IoIosPrint />
                <FaFilter onClick={handleFilterNav}/>
                <FaFolderPlus />
              </div>
            </div>
            <div className="d-flex justify-content-evenly usermem-total-activ-mem">
              <span className="usermem-total-active-mem-text">
                Total Membership
              </span>
              <input
                type="text"
                className="usermem-search-input"
                value={matSearch}
                onChange={handleSearch}
               
              ></input>
            </div>
            {searchFilter?.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-evenly usermem-all-details-div"
                >
                  <img className="usermem-man-img" src={man}></img>
                  <div className="d-flex flex-column usermem-user-mid-detail">
                    <span>{detail.name}</span>
                    <span className="mb-1">
                      {detail.distric}, {detail.location}
                    </span>
                    <div className="d-flex align-items-center flex-row">
                      <FaUser />
                      <div className="usermatri-empty-div"></div>
                      <FaImage />
                      <div className="usermatri-empty-div"></div>
                      <span className="usermem-userid-span">
                        {detail.userId}
                      </span>
                    </div>
                  </div>
                  <span className="d-flex align-items-center">
                    {" "}
                    <FaShareSquare
                      // onClick={() => handleSpecificActive(detail.id)}
                      className="usermem-share-icon"
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-6 col-md-12 p-4">
          <div className="usermem-1stcol-main-div">
            <div className="d-flex usermem-active-mem-records-text ">
              <div>
                <span>Matrimony Inactive Records</span>
              </div>
             
            </div>
            <div className="d-flex justify-content-evenly usermem-total-activ-mem">
              <span className="usermem-total-active-mem-text">
                Total Records
              </span>
              <input type="text" className="usermem-search-input"></input>
            </div>
            {matUserData.map((detail, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-evenly usermem-all-details-div"
                >
                  <img className="usermem-man-img" src={man}></img>
                  <div className="d-flex flex-column usermem-user-mid-detail">
                    <span>{detail.name}</span>
                    <span className="mb-1">
                      {detail.distric}, {detail.location}
                    </span>
                    <div className="d-flex align-items-center flex-row">
                      <FaUser />
                      <div className="usermatri-empty-div"></div>
                      <FaImage />
                      <div className="usermatri-empty-div"></div>
                      <span className="usermem-userid-inactive-span">
                        {detail.userId}
                      </span>{" "}
                    </div>
                  </div>
                  <span className="d-flex align-items-center">
                    {" "}
                    <FaShareSquare className="usermem-share-icon" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-lg-6 col-md-12 p-4">
            <div className="usermem-1stcol-main-div">
              <div className="d-flex usermem-active-mem-records-text j">
                <div>
                  <span>Matrimony Hidden Records</span>
                </div>
               
              </div>
              <div className="d-flex justify-content-evenly usermem-total-activ-mem">
                <span className="usermem-total-active-mem-text">
                  Total Record's ( {matUserData.length} )
                </span>
                <input type="text" className="usermem-search-input"></input>
              </div>
              {matUserData.map((detail, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-evenly usermem-all-details-div"
                  >
                    <img
                      className="usermem-man-img"
                      alt="userImage"
                      src={man}
                    ></img>
                    <div className="d-flex flex-column usermem-user-mid-detail">
                      <span>{detail.name}</span>
                      <span className="mb-1">
                        {detail.distric}, {detail.location}
                      </span>
                      <div className="d-flex align-items-center flex-row">
                        <FaUser />
                        <div className="usermatri-empty-div"></div>
                        <FaImage />
                        <div className="usermatri-empty-div"></div>
                        <span className="usermem-userid-span">
                          {detail.userId}
                        </span>
                      </div>
                    </div>
                    <span className="d-flex align-items-center">
                      {" "}
                      <FaShareSquare
                        // onClick={() => handleSpecificActive(detail.id)}
                        className="usermem-share-icon"
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMatrimony;

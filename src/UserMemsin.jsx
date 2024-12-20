import React, { useEffect, useState, useRef } from "react";
import { FaKey } from "react-icons/fa";
import "./UserMemsin.css";
import { Collapse } from "antd";
import man from "./image/man.jpg";
import mt from "./image/MS.png";
// import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const UserMemsin = () => {
  const { Panel } = Collapse;
  const location = useLocation();
  const navToEdit = useNavigate();

  const singleMatData = location.state || {};
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  console.log(singleMatData);
  // console.log(singleMatData.children);
  const handleNavToEdit = () => {
    navToEdit("/home/memuser/edit", { state: { singleMatData } });
  };


  // console.log("game",activePer)
  return (
    <div>
      <div>
        <div className=" d-flex justify-content-end ">
          <button className="usermatsin-edit-button" onClick={handleNavToEdit}>
            Edit
          </button>
        </div>
        <div ref={contentRef} className="user-mat-print-main-div">
          <div className="row">
            <div className="col-12">
              <div>
                <img className="usermat-header-img" src={mt}></img>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <span className="user-mat-matri-id-span">Membership Id</span>
                <span className="usermat-singlemat-id-span">
                  {singleMatData.mem_id}
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="d-flex ps-5">
                <span className="user-mat-matri-name-span">Name</span>
                <span className="usermat-singlemat-id-span">
                  {singleMatData.first_name} {singleMatData.last_name}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center">
              {singleMatData.member_image ? (
                <img
                  src={singleMatData.member_image}
                  className="usermem-man-img "
                  alt={`User ${singleMatData.member_image}`}
                />
              ) : (
                <img src={man} className="usermem-man-img " alt="Dummy Image" />
              )}
            </div>
          </div>
          <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Contact :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.phone ? singleMatData.phone : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              
            </div>

            <div className="d-flex usermat-width ">
              
            </div>
          </div>
          </div>
          <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Address :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.address}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Gender :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.gender}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">DOB :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {new Date(
                          singleMatData.date_of_birth
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Blood Group :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.blood_group}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Native Place :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.native_place}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">District :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.district}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Kula Deivam :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.kula_deivam}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Temple Place :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.temple_place}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Marrigae Date :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {new Date(
                          singleMatData.marriage_date
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Vagaiyara :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.vagaiyara}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Qualification :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.qualification}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Job Designation :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.job_designation}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Father Name :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.father_name}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Mother Name :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.mother_name}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife Name :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.wife_name
                            ? singleMatData.wife_name
                            : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife DOB :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.wife_dob
                            ? singleMatData.wife_dob
                            : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife Birth Place :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.wife_birth_place
                            ? singleMatData.wife_birth_place
                            : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife District :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.wife_district
                            ? singleMatData.wife_district
                            : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife Phone :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.wife_phone
                            ? singleMatData.wife_phone
                            : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife Qualification :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.wife_qualification
                            ? singleMatData.wife_qualification
                            : "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Wife Designation :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {singleMatData.wife_job_designation
                            ? singleMatData.wife_job_designation
                            : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Job Designation :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {singleMatData.job_designation}
              </span>
            </div>
          </div>
        </div>

        {singleMatData.children && ( 
          <>
          {singleMatData.children.map((child, index) => (
            <div key={index}>
            <p className="memsin-children-title mt-2" >Children {index + 1}</p>
            <div className="d-flex usermat-1st-div ">
          <div className="d-flex mt-4 usermat-email-1st-div">
            
            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">children Name :</span>
            </div>

            <div className="d-flex usermat-width">
              <span className="usermat-details-span">
              {child.children_name ? child.children_name : "-"}
              </span>
            </div>

            <div className="d-flex justify-content-end usermat-width">
              <span className="usermat-sin-label-span">Children DOB :</span>
            </div>

            <div className="d-flex usermat-width ">
              <span className="usermat-details-span">
              {child.children_dob ? child.children_dob : "-"}
              </span>
            </div>
         
          </div>
          </div>
           <div className="d-flex usermat-1st-div ">
           <div className="d-flex mt-4 usermat-email-1st-div">
             
             <div className="d-flex justify-content-end usermat-width">
               <span className="usermat-sin-label-span">children Education :</span>
             </div>
 
             <div className="d-flex usermat-width">
               <span className="usermat-details-span">
               {child.children_education
                                ? child.children_education
                                : "-"}
               </span>
             </div>
 
             <div className="d-flex justify-content-end usermat-width">
               <span className="usermat-sin-label-span">Children Professional :</span>
             </div>
 
             <div className="d-flex usermat-width ">
               <span className="usermat-details-span">
               {child.children_professional
                                ? child.children_professional
                                : "-"}
               </span>
             </div>
          
           </div>
           </div>
            <div className="d-flex usermat-1st-div ">
            <div className="d-flex mt-4 usermat-email-1st-div">
              
              <div className="d-flex justify-content-end usermat-width">
                <span className="usermat-sin-label-span">children Relation :</span>
              </div>
  
              <div className="d-flex usermat-width">
                <span className="usermat-details-span">
                {child.relation ? child.relation : "-"}
                </span>
              </div>
  
              <div className="d-flex justify-content-end usermat-width">
                
              </div>
  
              <div className="d-flex usermat-width ">
              
              </div>
           
            </div>
            </div>
            </div>
          
           ))}
           </>
       )}
       
        </div>
        <div className="d-flex justify-content-center mt-1">
        
        <button
          className="userMatsin-print-button mt-2 mb-5"
          onClick={reactToPrintFn}
        >
          PRINT
        </button>
      </div>
      </div>
    </div>
  );
};

export default UserMemsin;

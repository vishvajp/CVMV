import React, { useEffect, useRef, useState } from "react";
import { FaKey } from "react-icons/fa";
import { Collapse } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UserMemSinInact = ({baseUrl}) => {
  const { Panel } = Collapse;
    const navToFilter = useNavigate()
  const location = useLocation();
  const singleMatData = location.state || {};
  
  const handleActive = async()=>{
    try{
      const response = await axios.post(`${baseUrl}Tsit_Cvmv_Mem_Recover_Admin/${singleMatData.mem_id}`)
  
      if(response.data){
          console.log(response.data.success)
          window.alert(response.data.message)
          navToFilter("/user/membership")
  
      }
  
    }catch(err){
      console.log(err)
    }
        }
 
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 p-4">
          <div className="d-flex flex-column">
            <span className="usememsin-membership-text">
              Membership Setting
            </span>
            <div className="d-flex flex-column usermemsin-1stcol-status-div gap-2">
              <div className="d-flex justify-content-between ">
                <span className="usermemsin-1stcol-title-text">STATUS</span>
                <span>
                  <FaKey />
                </span>
              </div>
              <span className="usermemsin-1stcol-field-text">{singleMatData.status}</span>
            </div>

            <div className="d-flex flex-column usermemsin-1stcol-status-div gap-2">
              <span className="usermemsin-1stcol-title-text">DATE CREATED</span>
              <span className="usermemsin-1stcol-field-text">30th June</span>
            </div>
            <div className="d-flex flex-column  usermemsin-1stcol-status-div gap-2">
              <span className="usermemsin-1stcol-title-text">DATE UPDATED</span>
              <span className="usermemsin-1stcol-field-text">N/A</span>
            </div>
            <div className="d-flex flex-column usermemsin-1stcol-status-div gap-2 ">
              <span className="usermemsin-1stcol-title-text">
                PRINT MEMBER PROFILE
              </span>
              <span className="usermemsin-1stcol-field-text">N/A</span>
            </div>
            <div className="d-flex flex-column usermemsin-1stcol-status-div gap-2">
              <span className="usermemsin-1stcol-title-text">LAST ACTIVE</span>
              <span className="usermemsin-1stcol-field-text">N/A</span>
            </div>
            <div className="d-flex flex-column usermemsin-1stcol-last-status-div gap-2 ">
              <span className="usermemsin-1stcol-title-text">
                DELETE MEMBER
              </span>
              <div className="d-flex usermemsin-1stcol-field-text">
                <span>#</span> <span>Delete Record</span>
              </div>
            </div>
          </div>
          {/* <div>
            <p className="usermatsin-horo-mat-img-text">Horoscrope Image</p>
            {singleMatData.horoscope_attach &&
              (/\.(jpg|jpeg|png|gif)$/i.test(singleMatData.horoscope_attach) ? (
                <img
                  className="usermatsin-horo me-3 mb-3"
                  src={singleMatData.horoscope_attach}
                  alt="Horoscope Image"
                />
              ) : (
                <iframe
                  className="usermatsin-horo me-3 mb-3"
                  src={singleMatData.horoscope_attach}
                  title="Horoscope PDF"
                ></iframe>
              ))}
          </div> */}
          {/* <div className="row mt-3">
            <div className="col ">
              <p className="usermatsin-horo-mat-img-text">Matri Images</p>
              {singleMatData.matrimony_images.map((photo, imgIndex) => (
                <img
                  key={imgIndex}
                  src={photo.matri_image}
                  className="usermem-man-img me-3 mb-3"
                  alt={`User ${singleMatData.matrimony_details.name}`}
                />
              ))}
            </div>
          </div> */}
        </div>

        <div className="col-lg-8">
        <div className=" d-flex justify-content-end ">
        <button
          className="usermatsin-edit-button"
        onClick={handleActive}
        >
          Active
        </button>
      </div>
          <div className="matri-sin-mob-div">
            <p className="usermemsin-2nd-col-membership-text">
              Membership Detail
            </p>

            <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Contact" key="1">
                <div className="row">
                  <div className="col-lg-4 col-6 usermemsin-col-1-2  ">
                    <div className="d-flex flex-column usermensin-2nd-col-contact-span gap-4">
                      <span>Name</span>

                      {/* <span>Email</span> */}

                      <span>Contact No</span>

                      <span>Address</span>
                    </div>
                  </div>

                  <div className="col-lg-4 col-6 usermemsin-col-1-2">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>{singleMatData.first_name} {singleMatData.last_name}</span>
                      {/* <span>{singleMatData.matrimony_details.email}</span> */}
                      <span>
                        {singleMatData.phone
                          ? singleMatData.phone
                          : "-"}
                      </span>
                      <span>{singleMatData.address}</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 ">
                    <img
                      src={singleMatData.member_image}
                      className="usermem-man-img "
                      alt={`User ${singleMatData.member_image}`}
                    />
                  </div>
                </div>
              </Panel>
            </Collapse>
            <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel
                header={`About ${singleMatData.first_name} ${singleMatData.last_name}`}
                key="1"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Gender</span>
                      <span>Date Of Birth</span>
                      {/* <span>Marital Status</span> */}
                      <span>Blood Group</span>

                      <span>Native Place</span>
                      <span>District</span>
                      <span>Kula Deivam</span>
                      <span>Temple Place</span>
                      <span>Marriage Date</span>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>{singleMatData.gender}</span>
                      <span>
                        {new Date(
                          singleMatData.date_of_birth
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      {/* <span>{singleMatData.matrimony_details.m_status}</span> */}
                      <span>{singleMatData.blood_group}</span>

                      <span>
                        {singleMatData.native_place}
                      </span>
                      <span>{singleMatData.district}</span>
                      <span>{singleMatData.kula_deivam}</span>
                      <span>
                        {singleMatData.temple_place}
                      </span>
                      <span>
                        {new Date(
                          singleMatData.marriage_date
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>

            {/* <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Life Style Information" key="1">
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>Height</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>
                      {singleMatData.matrimony_details.m_height
                        ? singleMatData.matrimony_details.m_height
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>weight</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>
                      {singleMatData.matrimony_details.m_weight
                        ? singleMatData.matrimony_details.m_weight
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>Color</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>
                      {singleMatData.matrimony_details.m_color
                        ? singleMatData.matrimony_details.m_color
                        : "none"}
                    </span>
                  </div>
                </div>
              </Panel>
            </Collapse> */}

            <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Career & Job Detail" key="1">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Qualification</span>
                      <span>Job Designation</span>
                      {/* <span>Job Location</span>
                      <span>Annual Income</span> */}
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>
                        {singleMatData.qualification}
                      </span>
                      <span>
                        {singleMatData.job_designation}
                      </span>
                      {/* <span>
                        {singleMatData.matrimony_details.job_location}
                      </span> */}
                      {/* <span>
                        {singleMatData.matrimony_details.job_annual_income
                          ? singleMatData.matrimony_details.job_annual_income
                          : "-"}
                      </span> */}
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
            {/* <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Horoscope Detail" key="1">
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>Rasi</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>{singleMatData.matrimony_details.j_rasi}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>Nakshatra</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>{singleMatData.matrimony_details.j_nakshatra}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span> Dhosam</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>{singleMatData.matrimony_details.j_dhosam}</span>
                  </div>
                </div> */}

                {/* <div className="row mb-3">
                  <div className="col-4 usermensin-2nd-col-contact-span">
                    <span>Horoscope Image</span>
                  </div>
                  <div className="col-8 usermensin-2nd-col-contact-field-span">
                    <span>
                      <img
                        className="userMatsin-horoscope-img"
                        src={singleMatData.horoscope_attach}
                      ></img>
                    </span>
                  </div>
                </div> */}
              {/* </Panel>
            </Collapse> */}
            <p className="usermemsin-2nd-col-membership-text">Family Detail</p>
            <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Family Detail" key="1">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Father Name</span>
                      <span>Mother Name</span>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>{singleMatData.father_name}</span>
                      <span>{singleMatData.mother_name}</span>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
            {/* <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Mother" key="1">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Name</span>
                      <span>Contact</span>
                      <span>Occupation</span>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>{singleMatData.matrimony_details.mother_name}</span>
                      <span>
                        {singleMatData.matrimony_details.mother_number}
                      </span>
                      <span>
                        {singleMatData.matrimony_details.mother_occupation}
                      </span>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse> */}
            {singleMatData.wife_name &&  <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Wife" key="1">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Name</span>
                      <span>DOB</span>
                      <span>Birth Place</span>
                      <span>District</span>
                      <span>Phone</span>
                      <span>Qualification</span>
                      <span>Job Designation</span>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>
                      {singleMatData.wife_name
                          ? singleMatData.wife_name
                          : "-"}
                      </span>
                      <span>
                      {singleMatData.wife_dob
                          ? singleMatData.wife_dob
                          : "-"}
                      </span>
                      <span> {singleMatData.wife_birth_place
                          ? singleMatData.wife_birth_place
                          : "-"}</span>
                      <span>
                      {singleMatData.wife_district
                          ? singleMatData.wife_district
                          : "-"}
                      </span>
                      <span>
                      {singleMatData.wife_phone
                          ? singleMatData.wife_phone
                          : "-"}
                      </span>
                      <span>
                      {singleMatData.wife_qualification
                          ? singleMatData.wife_qualification
                          : "-"}
                      </span>
                      <span>
                      {singleMatData.wife_job_designation
                          ? singleMatData.wife_job_designation
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>}
            {singleMatData.children &&  <Collapse
              className="userMemsin-contact-collapse"
              defaultActiveKey={[]}
            >
              <Panel header="Children" key="1">
              { singleMatData.children.map((child,index)=>(
            <div className="row" key={index}>
              <div className="usermemsin-children-title d-flex justify-content-center align-items-center"><span>Children {index +1}</span></div>
                  <div className="col-4">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                      <span>Name</span>
                      <span>DOB</span>
                      <span>Education</span>
                      <span>Professional</span>
                      <span>Relation</span>
                   
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                      <span>
                      {child.children_name
                          ? child.children_name
                          : "-"}
                      </span>
                      <span>
                      {child.children_dob
                          ? child.children_dob
                          : "-"}
                      </span>
                      <span> {child.children_education
                          ? child.children_education
                          : "-"}</span>
                      <span>
                      {child.children_professional
                          ? child.children_professional
                          : "-"}
                      </span>
                      <span>
                      {child.relation
                          ? child.relation
                          : "-"}
                      </span>
                    
                    </div>
                  </div>
          
                </div>
           ))}
              </Panel>
            </Collapse>}
          
          </div>
        </div>
    
        
    
      </div>
    </div>
  );
};

export default UserMemSinInact;

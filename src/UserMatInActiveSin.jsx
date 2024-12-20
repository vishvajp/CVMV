
import React, { useEffect, useRef, useState } from "react";
import { FaKey } from "react-icons/fa";
import { Collapse } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import man from "./image/noImage.jpg";
const UserMatInActiveSin = ({baseUrl}) => {
    const { Panel } = Collapse;
    const location = useLocation();
    const singleMatData = location.state || {};
    const [sinUserData, setSinUserData] = useState();
    const navToFilter = useNavigate()
    useEffect(() => {
        setSinUserData(singleMatData);
      }, [singleMatData]);

      console.log(singleMatData)

      const handleActive = async()=>{
  try{
    const response = await axios.post(`${baseUrl}Tsit_Cvmv_Mat_Recover_Admin/${singleMatData.matrimony_details.matri_id}`)

    if(response.data){
        console.log(response.data.success)
        window.alert(response.data.message)
        navToFilter("/user/matrimony")

    }

  }catch(err){
    console.log(err)
  }
      }
  return (
    <div> <div className="row">
    <div className="col-lg-4 p-4">
      <div className="d-flex flex-column">
        <span className="usememsin-membership-text">Matrimony Setting</span>
        <div className="d-flex flex-column usermemsin-1stcol-status-div gap-2">
          <div className="d-flex justify-content-between ">
            <span className="usermemsin-1stcol-title-text">STATUS</span>
            <span>
              <FaKey />
            </span>
          </div>
          <span className="usermemsin-1stcol-field-text">{singleMatData.matrimony_details.mat_status}</span>
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
      <div>
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
      </div>
      <div className="row mt-3">
        <div className="col ">
          <p className="usermatsin-horo-mat-img-text">Matri Images</p>
          <div className="d-flex flex-wrap">
          {singleMatData.matrimony_images?.map((photo, imgIndex) => (
            <img
              key={imgIndex}
              src={photo.matri_image}
              className="usermem-man-img me-3 mb-3"
              alt={`User ${singleMatData.matrimony_details.name}`}
            />
          ))}

          {
            singleMatData.matrimony_images.length===0 && 
            <img
          
              src={man}
              className="usermem-man-img me-3 mb-3"
              alt="Dummy Image"
            />
          }
          </div>
        </div>
      </div>
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
          Matrimony Detail
        </p>

        <Collapse
          className="userMemsin-contact-collapse"
          defaultActiveKey={[]}
        >
          <Panel header="Contact" key="1">
            <div className="row">
              <div className="col-lg-4 col-4 usermemsin-col-1-2  ">
                <div className="d-flex flex-column usermensin-2nd-col-contact-span gap-4">
                  <span>Name</span>

                  <span>Email</span>

                  <span>Contact No</span>

                  <span>Address</span>
                </div>
              </div>

              <div className=" col-6 col-lg-4  usermemsin-col-2">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                  <span>{singleMatData.matrimony_details.name}</span>
                  <span>{singleMatData.matrimony_details.email}</span>
                  <span>
                    {singleMatData.matrimony_details.contact_detail
                      ? singleMatData.matrimony_details.contact_detail
                      : "-"}
                  </span>
                  <span>{singleMatData.matrimony_details.address}</span>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 ">
               {singleMatData.matrimony_images[0] &&  <img
                  src={singleMatData.matrimony_images[0]?.matri_image}
                  className="usermem-man-img "
                  alt={`User ${singleMatData.matrimony_details.name}`}
                /> }
{singleMatData.matrimony_images.length===0 &&  <img
                  src={man}
                  className="usermem-man-img "
                  alt="Dummy Image"
                /> }

              </div>
            </div>
          </Panel>
        </Collapse>
        <Collapse
          className="userMemsin-contact-collapse"
          defaultActiveKey={[]}
        >
          <Panel
            header={`About ${singleMatData.matrimony_details.name}`}
            key="1"
          >
            <div className="row">
              <div className="col-4">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                  <span>Gender</span>
                  <span>Date Of Birth</span>
                  <span>Marital Status</span>
                  <span>Blood Group</span>

                  <span>Native Place</span>
                  <span>District</span>
                  <span>Kula Deivam</span>
                  <span>Temple Place</span>
                </div>
              </div>
              <div className="col-8">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                  <span>{singleMatData.matrimony_details.gender}</span>
                  <span>
                    {new Date(
                      singleMatData.matrimony_details.date_of_birth
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <span>{singleMatData.matrimony_details.m_status}</span>
                  <span>{singleMatData.matrimony_details.blood_group}</span>

                  <span>
                    {singleMatData.matrimony_details.native_place}
                  </span>
                  <span>{singleMatData.matrimony_details.district}</span>
                  <span>{singleMatData.matrimony_details.kula_deivam}</span>
                  <span>
                    {singleMatData.matrimony_details.temple_place}
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>

        <Collapse
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
        </Collapse>

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
                  <span>Job Location</span>
                  <span>Annual Income</span>
                </div>
              </div>
              <div className="col-8">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                  <span>
                    {singleMatData.matrimony_details.qualification}
                  </span>
                  <span>
                    {singleMatData.matrimony_details.job_designation}
                  </span>
                  <span>
                    {singleMatData.matrimony_details.job_location}
                  </span>
                  <span>
                    {singleMatData.matrimony_details.job_annual_income
                      ? singleMatData.matrimony_details.job_annual_income
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
        <Collapse
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
            </div>

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
          </Panel>
        </Collapse>
        <p className="usermemsin-2nd-col-membership-text">Family Detail</p>
        <Collapse
          className="userMemsin-contact-collapse"
          defaultActiveKey={[]}
        >
          <Panel header="Father" key="1">
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
                  <span>{singleMatData.matrimony_details.father_name}</span>
                  <span>
                    {singleMatData.matrimony_details.father_number
                      ? singleMatData.matrimony_details.father_number
                      : "-"}
                  </span>
                  <span>
                    {singleMatData.matrimony_details.father_occupation}
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
        <Collapse
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
        </Collapse>
        <Collapse
          className="userMemsin-contact-collapse"
          defaultActiveKey={[]}
        >
          <Panel header="Sibling" key="1">
            <div className="row">
              <div className="col-4">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-span">
                  <span>No of Brothers</span>
                  <span>No of Sisters</span>
                  <span>Marital Count</span>
                </div>
              </div>
              <div className="col-8">
                <div className="d-flex flex-column gap-4 usermensin-2nd-col-contact-field-span">
                  <span>
                    {singleMatData.matrimony_details.no_of_brothers}
                  </span>
                  <span>
                    {singleMatData.matrimony_details.no_of_sisters}
                  </span>
                  <span>{singleMatData.matrimony_details.m_count}</span>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
    {/* <div className="d-flex justify-content-center">
      <button className="userMatsin-print-button" onClick={handlePrint}>
        PRINT
      </button>
    </div> */}
  </div></div>
  )
}

export default UserMatInActiveSin
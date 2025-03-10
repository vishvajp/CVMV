import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserMemsinEdit = ({ baseUrl }) => {
  const location = useLocation();
  const singleMemData = location.state || {};
  const specMem = singleMemData.singleMatData || {};
  const navToMemPage = useNavigate();
  const memId = specMem.mem_id;
  const [districtData, setDistrictData] = useState(null);
  const [nativeData, setNativeData] = useState(null);

  // console.log(specMem);
  const [formData, setFormData] = useState({
    first_name: specMem.first_name || "",
    last_name: specMem.last_name || "",
    phone: specMem.phone || "",
    address: specMem.address || "",
    member_image: specMem.member_image || "",
    blood_group: specMem.blood_group || "",
    date_of_birth: specMem.date_of_birth || "",
    district: specMem.district || "",
    father_name: specMem.father_name || "",
    gender: specMem.gender || "",
    job_designation: specMem.job_designation || "",
    kula_deivam: specMem.kula_deivam || "",
    marriage_date: specMem.marriage_date || "",
    mother_name: specMem.mother_name || "",
    native_place: specMem.native_place || "",
    qualification: specMem.qualification || "",
    temple_place: specMem.temple_place || "",
    vagaiyara: specMem.vagaiyara || "",
    wife_birth_place: specMem.wife_birth_place || "",
    wife_district: specMem.wife_district || "",
    wife_dob: specMem.wife_dob || "",
    wife_job_designation: specMem.wife_job_designation || "",
    wife_name: specMem.wife_name || "",
    wife_phone: specMem.wife_phone || "",
    wife_qualification: specMem.wife_qualification || "",
    children: specMem.children || [],
  });

  useEffect(() => {
    const handleGetDistrictData = async () => {
      try {
        const response = await axios.post(`${baseUrl}get_dist`);
        const data = response.data.district;
        // console.log(data);
        setDistrictData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetDistrictData();
  }, [baseUrl]);

  useEffect(() => {
    const handleGetDistrictData = async () => {
      if (formData.district) {
        try {
          const response = await axios.post(
            `${baseUrl}get_native/${formData.district}`
          );
          const data = response.data.native;
          // console.log(data);
          setNativeData(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleGetDistrictData();
  }, [formData.district]);

  const adminToken = localStorage.getItem("token");
  // console.log(adminToken);

  const handleCancel = () => {
    navToMemPage("/user/membership");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the image file directly in formData (not the URL)
      setFormData((prevState) => ({
        ...prevState,
        member_image: file,
      }));
    }
  };

  const handleChildInputChange = (index, field, value) => {
    const updatedChildren = [...formData.children]; // Make a copy of the children array
    updatedChildren[index] = {
      ...updatedChildren[index], // Copy the current child object
      [field]: value, // Update the specific field
    };

    setFormData((prevState) => ({
      ...prevState,
      children: updatedChildren, // Update the children array in formData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mainData = new FormData();

    // console.log(formData);

    // Add other fields from formData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "member_image" && formData[key]) {
          // Append the image file directly
          mainData.append("member_image", formData[key]);
        } else if (key !== "children") {
          // Exclude "children" from being appended
          mainData.append(key, formData[key]);
        }
      }
    }

    // Now, specifically add the children details:
    if (formData.children && formData.children.length > 0) {
      formData.children.forEach((child, index) => {
        mainData.append(`children_name[${index}]`, child.children_name || "");
        mainData.append(`children_id[${index}]`, child.children_id || "");
        mainData.append(`children_dob[${index}]`, child.children_dob || "");
        mainData.append(
          `children_education[${index}]`,
          child.children_education || ""
        );
        mainData.append(
          `children_professional[${index}]`,
          child.children_professional || "null"
        );
        mainData.append(`relation[${index}]`, child.relation || "");
      });
    }
    // console.log("FormData contents:");
    // for (let pair of mainData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Edit_Mem_Admin/${adminToken}/${memId}`,
        mainData,
        
      );
      if (response.data) {
        console.log(response.data);
        alert(response.data.message);
        navToMemPage("/user/membership");
      }
    } catch (err) {
      console.error(err);
     alert(err.message)
    }
  };

  return (
    <div className="edit-form-container">
      <h1>Edit Member Details</h1>
      <form className="user-edit-form" onSubmit={handleSubmit}>
        {/* Text Inputs */}
        <div className="userEditPage-contact-detail-div ">
          <div className="row">
            <p className="user-edit-page-titles">Contact</p>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="userEditPage-contact-detail-div">
          <p className="user-edit-page-titles">
            About {formData.first_name} {formData.last_name}
          </p>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Blood Group</label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleInputChange}
                >
                  <option>A+ve</option>
                  <option>A-ve</option>
                  <option>A2+ve</option>
                  <option>A1B+ve</option>
                  <option>A1B-ve</option>
                  <option>A2B+ve</option>
                  <option>A2B-ve</option>
                  <option>A1-ve</option>
                  <option>A1+ve</option>
                  <option>A2-ve</option>
                  <option>B+ve</option>
                  <option>B-ve</option>
                  <option>AB+ve</option>
                  <option>AB-ve</option>
                  <option>O+ve</option>
                  <option>O-ve</option>
                  <option>Rh</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>District</label>
                <select
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
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
          </div>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Native Place</label>
                <select
                  type="text"
                  name="native_place"
                  value={formData.native_place}
                  onChange={handleInputChange}
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
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>
                  <label>kula Deivam</label>
                  <input
                    type="text"
                    name="kula_deivam"
                    value={formData.kula_deivam}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>TemplePlace</label>
                <input
                  name="temple_place"
                  type="text"
                  value={formData.temple_place}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Marriage Date</label>
                <input
                  type="date"
                  name="marriage_date"
                  value={formData.marriage_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Vagaiyara</label>
                <input
                  name="vagaiyara"
                  type="text"
                  value={formData.vagaiyara}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="userEditPage-contact-detail-div">
          <p className="user-edit-page-titles">Career & Job Detail</p>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Job Designation</label>
                <input
                  type="text"
                  name="job_designation"
                  value={formData.job_designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="userEditPage-contact-detail-div">
          <p className="user-edit-page-titles">Family</p>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <lable>Father Name</lable>
                <input
                  type="text"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>MotherName</label>
                <input
                  type="text"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date Inputs */}

        <div className="userEditPage-contact-detail-div">
          <p className="user-edit-page-titles">Wife</p>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Wife Name</label>
                <input
                  type="text"
                  name="wife_name"
                  value={formData.wife_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Wife's Date of Birth</label>
                <input
                  type="date"
                  name="wife_dob"
                  value={formData.wife_dob}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Wife Birth Place</label>
                <input
                  name="wife_birth_place"
                  type="text"
                  value={formData.wife_birth_place}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>wifeDistrict</label>
                <input
                  name="wife_district"
                  type="text"
                  value={formData.wife_district}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Wife Phone</label>
                <input
                  type="text"
                  name="wife_phone"
                  value={formData.wife_phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>Wife's Qualification</label>
                <input
                  type="text"
                  name="wife_qualification"
                  value={formData.wife_qualification}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="d-flex flex-column">
                <label>wife Job Designation</label>
                <input
                  type="text"
                  name="wife_job_designation"
                  value={formData.wife_job_designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dropdowns */}

        {/* Wife's Details */}

        {/* File Upload */}
        <div className="userEditPage-horo-detail-div">
          <div className="row">
            <div className="d-flex flex-column">
              <label className="user-edit-page-titles text-center">
                Member Image
              </label>
              <div className="d-flex justify-content-center">
                {formData.member_image && (
                  <img
                    className="user-edit-horo-image"
                    src={formData.member_image}
                    alt="Preview"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {formData.children && (
          <div className="userEditPage-contact-detail-div">
            <h2 className="user-edit-page-titles">Children Details</h2>
            {formData.children.map((child, index) => (
              <div key={index}>
                <h3 className="user-edit-page-titles">Child {index + 1}</h3>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column">
                      <label>Name: </label>
                      <input
                        type="text"
                        value={child.children_name || ""}
                        onChange={(e) =>
                          handleChildInputChange(
                            index,
                            "children_name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column">
                      <label>DOB: </label>
                      <input
                        type="date"
                        value={child.children_dob || ""}
                        onChange={(e) =>
                          handleChildInputChange(
                            index,
                            "children_dob",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column">
                      <label>Education: </label>
                      <input
                        type="text"
                        value={child.children_education || ""}
                        onChange={(e) =>
                          handleChildInputChange(
                            index,
                            "children_education",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column">
                      <label>Profession: </label>
                      <input
                        type="text"
                        value={child.children_professional || ""}
                        onChange={(e) =>
                          handleChildInputChange(
                            index,
                            "children_professional",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="d-flex flex-column">
                      <label>Relation: </label>
                      <input
                        type="text"
                        value={child.relation || ""}
                        onChange={(e) =>
                          handleChildInputChange(
                            index,
                            "relation",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="d-flex justify-content-center gap-3">
          <button className="user-edit-page-update-button" type="submit">
            UPDATE
          </button>
          <button
            className="user-edit-page-delete-button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserMemsinEdit;

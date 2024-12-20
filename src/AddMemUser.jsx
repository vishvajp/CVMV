import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddMemUser = ({ baseUrl }) => {
  const [districtData, setDistrictData] = useState(null);
  const [nativeData, setNativeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetDistrictData = async () => {
      try {
        const response = await axios.post(`${baseUrl}get_dist`);
        const data = response.data.district;
        console.log(data);
        setDistrictData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetDistrictData();
  }, [baseUrl]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    qualification: "",
    job_designation: "",
    marriage_date: "",
    blood_group: "",
    vagaiyara: "",
    kula_deivam: "",
    temple_place: "",
    district: "",
    native_place: "",
    address: "",
    wife_name: "",
    wife_dob: "",
    wife_phone: "",
    wife_qualification: "",
    wife_birth_place: "",
    wife_job_designation: "",
    wife_district: "",
    member_image: null,
    children_name: [],
    relation: [],
    children_dob: [],
    children_education: [],
    children_professional: [],
  });

  useEffect(() => {
    const handleGetDistrictData = async () => {
      if (formData.district) {
        try {
          const response = await axios.post(
            `${baseUrl}get_native/${formData.district}`
          );
          const data = response.data.native;
          console.log(data);
          setNativeData(data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    handleGetDistrictData();
  }, [formData.district]);

  const handleDistrictChange = (e) => {
    setFormData({
      ...formData,
      district: e.target.value,
      native_place: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (
      (name === "first_name" ||
        name === "last_name" ||
        name === "kula_deivam" ||
       name === "wife_qualification"||
        name === "temple_place" ||
      name === "vagaiyara" ||
      name === "father_name" ||
      name === "mother_name" ||
      name === "wife_name" ||
      name === "wife_birth_place" ||
      name === "district" ||
      name === "wife_job_designation"||
      name === "children_professional"
      ) &&
      !/^[A-Za-z.]*$/.test(value)
    ) {
      return;
    }

    // For dynamic children fields
    if (dataset.childIndex !== undefined) {
      const { childIndex, fieldName } = dataset;
      setFormData({
        ...formData,
        [fieldName]: formData[fieldName].map((item, index) =>
          index === parseInt(childIndex) ? value : item
        ),
      });
    } else {
      // For regular form fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      member_image: e.target.files[0],
    });
  };

  const handleAddChild = () => {
    setFormData({
      ...formData,
      children_name: [...formData.children_name, ""],
      relation: [...formData.relation, ""],
      children_dob: [...formData.children_dob, ""],
      children_education: [...formData.children_education, ""],
      children_professional: [...formData.children_professional, ""],
    });
  };

  const handleRemoveChild = (index) => {
    // Remove the child data from the state
    const updatedFormData = {
      ...formData,
      children_name: formData.children_name.filter((_, i) => i !== index),
      relation: formData.relation.filter((_, i) => i !== index),
      children_dob: formData.children_dob.filter((_, i) => i !== index),
      children_education: formData.children_education.filter(
        (_, i) => i !== index
      ),
      children_professional: formData.children_professional.filter(
        (_, i) => i !== index
      ),
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    // Create FormData instance
    const fd = new FormData();

    // Append regular form data values
    for (const key in formData) {
      if (
        formData[key] &&
        key !== "children_name" &&
        key !== "relation" &&
        key !== "children_dob" &&
        key !== "children_education" &&
        key !== "children_professional"
      ) {
        fd.append(key, formData[key]);
      }
    }

    // Append children data
    formData.children_name.forEach((childName, index) => {
      fd.append(`children_name[${index}]`, childName);
      fd.append(`relation[${index}]`, formData.relation[index]);
      fd.append(`children_dob[${index}]`, formData.children_dob[index]);
      fd.append(
        `children_education[${index}]`,
        formData.children_education[index]
      );
      fd.append(
        `children_professional[${index}]`,
        formData.children_professional[index]
      );
    });

    try {
      const response = await axios.post(
        `${baseUrl}create_personal_membership`,
        fd
      );
      if (response.data) {
        console.log(response.data);
        alert(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="form-container">
      <div className="user-edit-form">
        <div className="userEditPage-contact-detail-div ">
          <h2>Add Member</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    pattern="[A-Za-z]+"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Father's Name</label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Mother's Name</label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Job Designation</label>
                  <input
                    type="text"
                    name="job_designation"
                    value={formData.job_designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Marriage Date</label>
                  <input
                    type="date"
                    name="marriage_date"
                    value={formData.marriage_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Blood Group</label>
                  <select
                    type="text"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood </option>
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
                <div className="form-group d-flex flex-column">
                  <label>Vagaiyara</label>
                  <input
                    type="text"
                    name="vagaiyara"
                    value={formData.vagaiyara}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Kula Deivam</label>
                  <input
                    type="text"
                    name="kula_deivam"
                    value={formData.kula_deivam}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Temple Place</label>
                  <input
                    type="text"
                    name="temple_place"
                    value={formData.temple_place}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>District</label>
                  <select
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                    required
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

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Native Place</label>
                  <select
                    type="text"
                    name="native_place"
                    value={formData.native_place}
                    onChange={handleChange}
                    required
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

              <div className="col-12 col-lg-6">
                <div className="form-group d-flex flex-column">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Name</label>
                  <input
                    type="text"
                    name="wife_name"
                    value={formData.wife_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Date of Birth</label>
                  <input
                    type="date"
                    name="wife_dob"
                    value={formData.wife_dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Phone</label>
                  <input
                    type="text"
                    name="wife_phone"
                    value={formData.wife_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Education</label>
                  <input
                    type="text"
                    name="wife_qualification"
                    value={formData.wife_qualification}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Birth Place</label>
                  <input
                    type="text"
                    name="wife_birth_place"
                    value={formData.wife_birth_place}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's Occupation</label>
                  <input
                    type="text"
                    name="wife_job_designation"
                    value={formData.wife_job_designation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Wife's District</label>
                  <input
                    type="text"
                    name="wife_district"
                    value={formData.wife_district}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                  <label>Member Image</label>
                  <input
                    type="file"
                    name="member_image"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <button
                  type="button"
                  className="banner-add-button"
                  onClick={handleAddChild}
                >
                  Add Children
                </button>
              </div>
            </div>
            {formData.children_name.map((childName, index) => (
              <div key={index} className="child-form row mt-2">
                <div className="col-12 col-lg-3">
                  <div className="form-group d-flex flex-column">
                    <label>Child {index + 1} Name</label>
                    <input
                      type="text"
                      name="children_name"
                      value={childName}
                      onChange={handleChange}
                      required
                      data-child-index={index}
                      data-field-name="children_name"
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <div className="form-group d-flex flex-column">
                    <label>Relation</label>
                    <select
                      type="text"
                      name="relation"
                      value={formData.relation[index]}
                      onChange={handleChange}
                      required
                      data-child-index={index}
                      data-field-name="relation"
                    >
                      <option value="">Select Relation</option>
                      <option>Son</option>
                      <option>Daughter</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <div className="form-group d-flex flex-column">
                    <label>Children's Date of Birth</label>
                    <input
                      type="date"
                      name="children_dob"
                      value={formData.children_dob[index]}
                      onChange={handleChange}
                      required
                      data-child-index={index}
                      data-field-name="children_dob"
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <div className="form-group d-flex flex-column">
                    <label>Children's Education</label>
                    <input
                      type="text"
                      name="children_education"
                      value={formData.children_education[index]}
                      onChange={handleChange}
                      data-child-index={index}
                      data-field-name="children_education"
                    />
                  </div>
                </div>

                <div className="col-12 col-lg-3">
                  <div className="form-group d-flex flex-column">
                    <label>Children's Occupation</label>
                    <input
                      type="text"
                      name="children_professional"
                      value={formData.children_professional[index]}
                      onChange={handleChange}
                      data-child-index={index}
                      data-field-name="children_professional"
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <button
                    type="button"
                    className="add-mem-user-remove-child-button"
                    onClick={() => handleRemoveChild(index)} // Call the remove function with the index
                  >
                    Remove Child
                  </button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center gap-2">
              <button
                className="banner-edit-button"
                onClick={() => navigate("/user/membership")}
              >
                Cancel
              </button>
              <button className=" banner-add-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMemUser;

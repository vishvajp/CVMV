import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserEditPage.css";

const UserEditPage = ({ baseUrl }) => {
  const location = useLocation();
  const editUserData = location.state;

  const [singleData, setSingleData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [matriImgId, setMatriImgId] = useState([]);
  const [matriImg, setMatriImg] = useState([]);
  const [horoImg, setHoroImg] = useState();
  const [deletedImages, setDeletedImages] = useState(new Set());
  const [matri, setMatri] = useState();
  const navToMatri = useNavigate();
  const navToMatriPage = useNavigate();
  useEffect(() => {
    if (editUserData && editUserData.sinUserData) {
      setSingleData(editUserData.sinUserData);
      setMatri(editUserData.sinUserData.matrimony_details.matri_id);
    }
  }, [editUserData]);

  // console.log(matri);
  useEffect(() => {
    if (singleData && singleData.matrimony_images) {
      const ids = singleData.matrimony_images.map((img) => img.matri_img_id);
      setMatriImgId(ids);
    }
  }, [singleData]);

  useEffect(() => {
    if (singleData && singleData.matrimony_images) {
      const img = singleData.matrimony_images.map((img) => img.matri_image);
      setMatriImg(img);
      setHoroImg(singleData.horoscope_attach);
    }
  }, [singleData]);

  useEffect(() => {
    if (singleData && singleData.matrimony_details) {
      setProfileData({
        name: singleData.matrimony_details.name,
        m_status: singleData.matrimony_details.m_status,
        email: singleData.matrimony_details.email,
        date_of_birth: singleData.matrimony_details.date_of_birth,
        blood_group: singleData.matrimony_details.blood_group,
        qualification: singleData.matrimony_details.qualification,
        kula_deivam: singleData.matrimony_details.kula_deivam,
        temple_place: singleData.matrimony_details.temple_place,
        m_height: singleData.matrimony_details.m_height,
        m_weight: singleData.matrimony_details.m_weight,
        m_color: singleData.matrimony_details.m_color
          ? singleData.matrimony_details.m_color
          : "none",
        district: singleData.matrimony_details.district,
        native_place: singleData.matrimony_details.native_place,
        address: singleData.matrimony_details.address,
        gender: singleData.matrimony_details.gender,
        job_designation: singleData.matrimony_details.job_designation,
        job_location: singleData.matrimony_details.job_location,
        job_annual_income: singleData.matrimony_details.job_annual_income,
        father_name: singleData.matrimony_details.father_name
          ? singleData.matrimony_details.father_name
          : "Null",
        father_occupation: singleData.matrimony_details.father_occupation
          ? singleData.matrimony_details.father_occupation
          : "Null",
        father_number: singleData.matrimony_details.father_number
          ? singleData.matrimony_details.father_number
          : 0,
        mother_name: singleData.matrimony_details.mother_name
          ? singleData.matrimony_details.mother_name
          : "Null",
        mother_occupation: singleData.matrimony_details.mother_occupation
          ? singleData.matrimony_details.mother_occupation
          : "Null",
        mother_number: singleData.matrimony_details.mother_number
          ? singleData.matrimony_details.mother_number
          : 0,
        contact_detail: singleData.matrimony_details.contact_detail,
        j_rasi: singleData.matrimony_details.j_rasi,
        j_nakshatra: singleData.matrimony_details.j_nakshatra,
        j_dhosam: singleData.matrimony_details.j_dhosam,
        no_of_brothers: singleData.matrimony_details.no_of_brothers,
        no_of_sisters: singleData.matrimony_details.no_of_sisters,
        m_count: singleData.matrimony_details.m_count,
        matri_img_ids: matriImgId, // IDs of images being updated
        horoscope_attach: horoImg,
        matri_images: matriImg, // Array of file inputs for matrimony images
      });
    }
  }, [horoImg || singleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(profileData);
  const handleMatriImageChange = (index, file) => {
    const updatedMatriImg = [...matriImg];
    updatedMatriImg[index] = file; // Replace the file at the specific index

    setMatriImg(updatedMatriImg); // Update state with new image list
    setProfileData((prevData) => ({
      ...prevData,
      matri_images: updatedMatriImg, // Reflect changes in profile data
    }));
  };

  const handleAddMatriImages = (files) => {
    const addedImages = Array.from(files);
    const updatedMatriImg = [...matriImg, ...addedImages]; // Append new images to existing list

    setMatriImg(updatedMatriImg);
    setProfileData((prevData) => ({
      ...prevData,
      matri_images: updatedMatriImg, // Reflect changes in profile data
    }));
  };

  // const handleDeleteMatriImage = (index) => {

  //   const updatedMatriImg = matriImg.filter(
  //     (_, imgIndex) => imgIndex !== index
  //   );
  //   const updatedMatriImgId = matriImgId.filter(
  //     (_, imgIndex) => imgIndex !== index
  //   );

  //   setMatriImg(updatedMatriImg);
  //   setMatriImgId(updatedMatriImgId);

  //   setProfileData((prevData) => ({
  //     ...prevData,
  //     matri_images: updatedMatriImg,
  //     matri_img_id: updatedMatriImgId,
  //   }));
  //   console.log("Updated Matri Images:", updatedMatriImg);
  //   console.log("Updated Matri Image IDs:", updatedMatriImgId);
  // };

  const handleCancel = () => {
    navToMatriPage("/user/matrimony");
  };

  // Submit data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append profile data to FormData
    for (const key in profileData) {
      if (key === "horoscope_attach" && horoImg) {
        formData.append("horoscope_attach", horoImg);
      } else if (key === "matri_images") {
        matriImg.forEach((file, index) => {
          // Check if the file is an instance of File
          if (file instanceof File) {
            formData.append(`matri_images[${index}]`, file); // Adjust key name
            formData.append(`matri_img_ids[${index}]`, matriImgId[index] || "");
          }
        });
      } else {
        formData.append(key, profileData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Edit_Matrimony/${matri}`,
        formData
      );
      // console.log("Data sent successfully:", response.data.success);

      if (response.data.success) {
        window.alert("updated successfully");
        navToMatri("/user/matrimony");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      {profileData && (
        <form className="user-edit-form" onSubmit={handleSubmit}>
          <div>
            <div className="userEditPage-contact-detail-div ">
              <div className="row">
                <p className="user-edit-page-titles">Contact</p>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label> Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Contact Detail</label>
                    <input
                      type="number"
                      name="contact_detail"
                      value={profileData.contact_detail}
                      onChange={handleChange}
                      placeholder="Contact Details"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="userEditPage-contact-detail-div">
              <div className="row">
                <p className="user-edit-page-titles">
                  About {profileData.name}
                </p>
                <div className="col-12 col-lg-3">
                  <div className="d-flex flex-column">
                    <label>Gender</label>
                    <select
                      type="text"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      placeholder="Gender"
                      required
                    >
                      <option defaultValue={profileData.gender}></option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="d-flex flex-column">
                    <label>Date Of Birth</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={profileData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="d-flex flex-column">
                    <label>Marital Status</label>
                    <select
                      type="text"
                      name="m_status"
                      value={profileData.m_status}
                      onChange={handleChange}
                      placeholder="Marital Status"
                      required
>   <option value="">Select Marital</option>
          <option>Never Married</option>
          <option >Divorced</option></select>
                   
                    
                  </div>
                </div>
                <div className="col-12 col-lg-3">
                  <div className="d-flex flex-column">
                    <label>Blood Group</label>
                    <select
                      type="text"
                      name="blood_group"
                      value={profileData.blood_group}
                      onChange={handleChange}
                      placeholder="Blood Group"
                      required
                    >
                      <option defaultValue={profileData.blood_group}></option>
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
              </div>
              <div className="row">
                <div className="col-12 col-lg-2">
                  <div className="d-flex flex-column">
                    <label>Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={profileData.qualification}
                      onChange={handleChange}
                      placeholder="Qualification"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="d-flex flex-column">
                    <label>Native Place</label>
                    <input
                      type="text"
                      name="native_place"
                      value={profileData.native_place}
                      onChange={handleChange}
                      placeholder="Native Place"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="d-flex flex-column">
                    <label>District</label>
                    <input
                      type="text"
                      name="district"
                      value={profileData.district}
                      onChange={handleChange}
                      placeholder="District"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="d-flex flex-column">
                    <label>Kula Deivam</label>
                    <input
                      type="text"
                      name="kula_deivam"
                      value={profileData.kula_deivam}
                      onChange={handleChange}
                      placeholder="Kula Deivam"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-2">
                  <div className="d-flex flex-column">
                    <label>Temple Place</label>
                    <input
                      type="text"
                      name="temple_place"
                      value={profileData.temple_place}
                      onChange={handleChange}
                      placeholder="Temple Place"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                />
              </div>
            </div>

            <div className="userEditPage-contact-detail-div">
              <div className="row">
                <p className="user-edit-page-titles">Life Style Information</p>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Height</label>
                    <input
                      type="text"
                      name="m_height"
                      value={profileData.m_height}
                      onChange={handleChange}
                      placeholder="Height"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Weight</label>
                    <input
                      type="text"
                      name="m_weight"
                      value={profileData.m_weight}
                      onChange={handleChange}
                      placeholder="Weight"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Color</label>
                    <input
                      type="text"
                      name="m_color"
                      value={profileData.m_color}
                      onChange={handleChange}
                      placeholder="Color"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="userEditPage-contact-detail-div">
              <div className="row">
                <p className="user-edit-page-titles"> Career & Job Detail</p>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Job Designation</label>
                    <input
                      type="text"
                      name="job_designation"
                      value={profileData.job_designation}
                      onChange={handleChange}
                      placeholder="Job Designation"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Job Location</label>
                    <input
                      type="text"
                      name="job_location"
                      value={profileData.job_location}
                      onChange={handleChange}
                      placeholder="Job Location"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Annual Income</label>
                    <input
                      type="text"
                      name="job_annual_income"
                      value={profileData.job_annual_income}
                      onChange={handleChange}
                      placeholder="Annual Income"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="userEditPage-contact-detail-div">
              <div className="row">
                <p className="user-edit-page-titles">Horoscope Detail</p>
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Rasi</label>
                    <select
                      
                      name="j_rasi"
                      value={profileData.j_rasi}
                      onChange={handleChange}
                      placeholder="J Rasi"
                      required
                    >
                      <option defaultValue={profileData.j_rasi}></option>
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
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Nakshatra</label>
                    <select
                      type="text"
                      name="j_nakshatra"
                      value={profileData.j_nakshatra}
                      onChange={handleChange}
                      placeholder="J Nakshatra"
                      required
                    >
                      <option defaultValue={profileData.j_nakshatra}></option>
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
                <div className="col-12 col-lg-4">
                  <div className="d-flex flex-column">
                    <label>Dhosam</label>
                    <input
                      type="text"
                      name="j_dhosam"
                      value={profileData.j_dhosam}
                      onChange={handleChange}
                      placeholder="J Dhosam"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="user-edit-page-family-text">Family Detail</p>
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="userEditPage-contact-detail-div">
                  <div className="row">
                    <p className="user-edit-page-titles">Father</p>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <label>Father Name</label>
                        <input
                          type="text"
                          name="father_name"
                          value={
                            profileData.father_name
                              ? profileData.father_name
                              : "Null"
                          }
                          onChange={handleChange}
                          placeholder="Father's Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <label>Father Occupation</label>
                        <input
                          type="text"
                          name="father_occupation"
                          value={profileData.father_occupation}
                          onChange={handleChange}
                          placeholder="Father's Occupation"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <label>Father Number</label>
                        <input
                          type="tel"
                          name="father_number"
                          value={profileData.father_number}
                          onChange={handleChange}
                          placeholder="Father's Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userEditPage-contact-detail-div">
                  <div className="row">
                    <p className="user-edit-page-titles">Mother</p>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <label>Mother Name</label>
                        <input
                          type="text"
                          name="mother_name"
                          value={profileData.mother_name}
                          onChange={handleChange}
                          placeholder="Mother's Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <lable>Mother Occupation</lable>
                        <input
                          type="text"
                          name="mother_occupation"
                          value={profileData.mother_occupation}
                          onChange={handleChange}
                          placeholder="Mother's Occupation"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="d-flex flex-column">
                        <label>Mother Number</label>
                        <input
                          type="tel"
                          name="mother_number"
                          value={profileData.mother_number}
                          onChange={handleChange}
                          placeholder="Mother's Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="userEditPage-contact-detail-div">
                  <div className="d-flex flex-column">
                    <label>No Of Brothers</label>
                    <input
                      type="number"
                      name="no_of_brothers"
                      value={profileData.no_of_brothers}
                      onChange={handleChange}
                      placeholder="Number of Brothers"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label>No Of Sisters</label>
                    <input
                      type="number"
                      name="no_of_sisters"
                      value={profileData.no_of_sisters}
                      onChange={handleChange}
                      placeholder="Number of Sisters"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label>Marital Count</label>
                    <input
                      type="number"
                      name="m_count"
                      value={profileData.m_count}
                      onChange={handleChange}
                      placeholder="M Count"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="userEditPage-horo-detail-div">
              <div className="d-flex flex-column">
                <h3 className="user-edit-page-titles text-center">
                  Horoscope Image
                </h3>
                <div className="d-flex justify-content-center">
                  {horoImg ? (
                    /\.(jpg|jpeg|png|gif)$/i.test(horoImg) ? (
                      <img
                        className="user-edit-horo-image"
                        src={horoImg}
                        alt="Horoscope"
                        style={{ width: "200px", height: "auto" }}
                      />
                    ) : (
                      <iframe
                        className="user-edit-horo-pdf mb-2"
                        src={horoImg}
                        title="Horoscope PDF"
                        style={{ width: "200px", height: "auto" }}
                      ></iframe>
                    )
                  ) : /\.(jpg|jpeg|png|gif)$/i.test(
                      profileData.horoscope_attach.name
                    ) ? (
                    <img
                      src={URL.createObjectURL(profileData.horoscope_attach)}
                      alt="Horoscope"
                      style={{ width: "200px", height: "auto" }}
                    />
                  ) : (
                    <iframe
                      src={URL.createObjectURL(profileData.horoscope_attach)}
                      title="Horoscope PDF"
                      style={{ width: "200px", height: "auto" }}
                    ></iframe>
                  )}
                </div>

                <input
                  type="file"
                  onChange={(e) => setHoroImg(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="userEditPage-contact-detail-div">
            <div className="d-flex flex-wrap gap-3">
              {matriImg.map((image, index) => (
                <div key={index}>
                  <h3 className="user-edit-page-titles text-center ">
                    Matrimony Image {index + 1}
                  </h3>
                  <div className="d-flex justify-content-center">
                    <img
                      className="user-edit-horo-image"
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt={`Matrimony Image ${index + 1}`}
                      style={{ width: "200px" }}
                    />
                  </div>
                  {deletedImages.has(index) ? (
                    <input
                      type="file"
                      onChange={(e) =>
                        handleMatriImageChange(index, e.target.files[0])
                      }
                    />
                  ) : (
                    <input
                      className="user-edit-form-choose-file-input"
                      type="file"
                      onChange={(e) =>
                        handleMatriImageChange(index, e.target.files[0])
                      }
                    />
                  )}
                  {/* <button
                type="button"
                onClick={() => handleDeleteMatriImage(index)}
              >
                Delete
              </button> */}
                </div>
              ))}
            </div>
          </div>
          <div className="userEditPage-contact-detail-div">
            <h3>Add More Matrimony Images</h3>
            <input
              type="file"
              multiple
              onChange={(e) => handleAddMatriImages(e.target.files)}
            />
          </div>
          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="user-edit-page-update-button">
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
      )}
    </div>
  );
};

export default UserEditPage;

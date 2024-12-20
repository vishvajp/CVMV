import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const AddMatUser = ({baseUrl}) => {
    const location = useLocation();
  const userToken = location.state?.matri_token;
 
  const navigate = useNavigate()
  const mob_phone = sessionStorage.getItem("user_phone")
  const matri_token = sessionStorage.getItem("mat_token")
  const matriName = sessionStorage.getItem("mat_name");
  console.log(matri_token)
  const [formData, setFormData] = useState({
    name: "",
    m_status: "",
    email: "",
    date_of_birth: "",
    blood_group: "",
    qualification: "",
    kula_deivam: "",
    temple_place: "",
    m_height: "",
    m_weight: "",
    district: "",
    native_place: "",
    address: "",
    gender: "",
    job_designation: "",
    job_location: "",
    job_annual_income: "",
    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    contact_detail: mob_phone,
    j_rasi: "",
    j_nakshatra: "",
    j_dhosam: "",
    horoscope_attach: null,
    no_of_brothers: "",
    no_of_sisters: "",
    m_count: "",
    matri_image:null,
    m_color: "",
    father_number: "",
    mother_number: "",
  });

  console.log(userToken);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (
      (name === "name" ||
        name === "kula_deivam" ||
        name === "temple_place" ||
      name === "father_name" ||
      name === "mother_name" ||
      name === "wife_name" ||    
      name === "district" ||
      name === "native_place" ||
      name === "j_dhosam" ||
    name === "father_occupation" ||
    name === "mother_occupation" 
    
      ) &&
      !/^[A-Za-z. ]*$/.test(value)
    ) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSinImageChange =(e)=>{

const fileImg = Array.from(e.target.files)

setFormData((prevData)=>({
    ...prevData,
    matri_image: fileImg
}))
  }

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    for (const key in formData) {
        if (key === "matri_image") {
          formData[key]?.forEach((file, index) => {
            data.append(`matri_image[${index}]`, file); 
          });
        } else {
          data.append(key, formData[key]);
        }
      }

      console.log(formData)

    try {
      const response = await axios.post(`${baseUrl}Tsit_Cvmv_Create_Matrimony_Admin/${matri_token}`,data)
      if(response.data){
        alert(response.data.message)
        console.log(message)
        navigate("/user/matrimony")
      }
    } catch (error) {
    alert("Error submitting form:", error);
    }
  };

//   const handleAddImage =()=>{
//     setFormData((prevData)=>(
//         {...prevData,matri_image: [...prevData.matri_image,null]}
//     ))
//   }

  // const handleImageChange = (e, index) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     matri_image: [
  //       ...prevData.matri_image.slice(0, index), 
  //       e.target.files[0], 
  //       ...prevData.matri_image.slice(index + 1)
  //     ]
  //   }));
  // };
  
  return (
    <div >
      <div className="user-edit-form">
      <div className="userEditPage-contact-detail-div ">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
      <div className="row">
      <div className="col-12 col-lg-3">
      <div className="form-group d-flex flex-column">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Phone No</label>
        <input
          type="text"
          name="contact_detail"
          placeholder="Contact Details"
          value={formData.contact_detail}
          readOnly
        />
            
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
            <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Marital Status</label>
        <select
          type="text"
          name="m_status"
          placeholder="Marital Status"
          value={formData.m_status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Marital</option>
          <option>Never Married</option>
          <option >Divorced</option>
        </select>
           
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
          
        <label>D.O.B</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          
        </select>
                
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Height</label>
        <input
          type="text"
          name="m_height"
          placeholder="Height"
          value={formData.m_height}
          onChange={handleInputChange}
          required
        />
       
        </div>
        </div>

        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Weight</label>
        <input
          type="text"
          name="m_weight"
          placeholder="Weight"
          value={formData.m_weight}
          onChange={handleInputChange}
          required
        />
        
        
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Blood Group</label>
        <select
          type="text"
          name="blood_group"
          placeholder="Blood Group"
          value={formData.blood_group}
          onChange={handleInputChange}
          required
        >
          <option value=""> Select Blood</option>
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
                <label>Color</label>
        <input
          type="text"
          name="m_color"
          placeholder="Color"
          value={formData.m_color}
          onChange={handleInputChange}
        />
               
        </div>
        </div>

        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                    <label>District</label>
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                    <label>Native Place</label>
        <input
          type="text"
          name="native_place"
          placeholder="Native Place"
          value={formData.native_place}
          onChange={handleInputChange}
          required
        />
        </div></div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-6">
        <div className="form-group d-flex flex-column">
            <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>

        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Education</label>
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleInputChange}
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
          placeholder="Job Designation"
          value={formData.job_designation}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
       <label>Job Location</label>
        <input
          type="text"
          name="job_location"
          placeholder="Job Location"
          value={formData.job_location}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Annual Income</label>
        <input
          type="number"
          name="job_annual_income"
          placeholder="Annual Income"
          value={formData.job_annual_income}
          onChange={handleInputChange}
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
          placeholder="Kula Deivam"
          value={formData.kula_deivam}
          onChange={handleInputChange}
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
          placeholder="Temple Place"
          value={formData.temple_place}
          onChange={handleInputChange}
          required
        />
        
         
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Rasi</label>
        <select
          type="text"
          name="j_rasi"
          placeholder="J Rasi"
          value={formData.j_rasi}
          onChange={handleInputChange}
          required
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

        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Nakshatra</label>
        <select
          type="text"
          name="j_nakshatra"
          placeholder="J Nakshatra"
          value={formData.j_nakshatra}
          onChange={handleInputChange}
          required
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
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Dhosam</label>
        <input
          type="text"
          name="j_dhosam"
          placeholder="J Dhosam"
          value={formData.j_dhosam}
          onChange={handleInputChange}
          required
        />
      </div>
      </div>
      <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                <label>Horoscope Attach</label>
        <input
          type="file"
          name="horoscope_attach"
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
       
        </div></div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">

              </div>
              </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
                    <label>Father Name</label>
        <input
          type="text"
          name="father_name"
          placeholder="Father's Name"
          value={formData.father_name}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
       <label>Father Occupation</label>
        <input
          type="text"
          name="father_occupation"
          placeholder="Father's Occupation"
          value={formData.father_occupation}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
       <label>Father Contact</label>
        <input
          type="text"
          name="father_number"
          placeholder="Father's Contact Number"
          value={formData.father_number}
          onChange={handleInputChange}
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
                <div className="form-group d-flex flex-column">
        <label>Add Matri Image</label>
<input
                type="file"
                name="matri_image"
                onChange={handleSinImageChange}
                 accept="image/*"
                multiple
                required
              />
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 col-lg-3">
       <label>Mother Name</label>
        <div className="form-group d-flex flex-column">
        <input
          type="text"
          name="mother_name"
          placeholder="Mother's Name"
          value={formData.mother_name}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Mother Occupation</label>
        <input
          type="text"
          name="mother_occupation"
          placeholder="Mother's Occupation"
          value={formData.mother_occupation}
          onChange={handleInputChange}
          required
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
          <label>Mother Number</label>
        <input
          type="text"
          name="mother_number"
          placeholder="Mother's Contact Number"
          value={formData.mother_number}
          onChange={handleInputChange}
        />
        </div>
        </div>
        
        </div>
        <div className="row">
        

       
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
          <label>No of brothers</label>
        <input
          type="number"
          name="no_of_brothers"
          placeholder="Number of Brothers"
          value={formData.no_of_brothers}
          onChange={handleInputChange}
        
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
          <label>No of sisters</label>
        <input
          type="number"
          name="no_of_sisters"
          placeholder="Number of Sisters"
          value={formData.no_of_sisters}
          onChange={handleInputChange}
    
        />
        </div>
        </div>
        <div className="col-12 col-lg-3">
        <div className="form-group d-flex flex-column">
        <label>Marital Count</label>          
        <input
          type="number"
          name="m_count"
          placeholder="M Count"
          value={formData.m_count}
          onChange={handleInputChange}
          
        />
        </div></div>
        </div>
       
       

        
    
    
         {/* {formData.matri_image.length>0 && formData.matri_image.map((_,index)=>{
            return(
                <input
                type="file"
                name="matri_image"
                onChange={(e)=>{handleImageChange(e,index)}}
                 accept="image/*"
                multiple
              />
            )
         })} */}
        {/* <button onClick={handleAddImage}>Add Image</button> */}
        <div className="d-flex justify-content-center gap-2">
          <button className="banner-edit-button" onClick={()=>navigate("/user/matrimony")}>Cancel</button>
        <button className=" banner-add-button" type="submit">Submit</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default AddMatUser
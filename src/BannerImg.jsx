import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BannerImage.css";
import { useNavigate } from "react-router-dom";

const BannerImg = ({ baseUrl }) => {
  const [bannerData, setBannerData] = useState(null);
  const [addImage, setAddImage] = useState(null);
  const [addImagePrevieW, setAddImagePreview] = useState(null);
  const [addUrl, setAddUrl] = useState("");
  const [reload, setReload] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axios.post(`${baseUrl}Tsit_Cvmv_Get_Mem_Banner
`);
        if (response.data) {
          console.log(response.data.data);
          setBannerData(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getBannerData();
  }, [baseUrl,reload]);

  const handleSinImg = (imgData) => {
    navigate("/user/bannermem/image/edit", { state: imgData });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    
    // Create an image element to check the file's dimensions
    const img = new Image();
  
    img.onload = () => {
      const maxWidth = 1500; 
      const maxHeight = 1500; 
  
    
      if (img.width > maxWidth || img.height > maxHeight) {
        alert(`Image dimensions should be less than ${maxWidth}x${maxHeight}px. Please choose a smaller image.`);
        e.target.value = '';
        setAddImage(null); 
        setAddImagePreview(null);
      } else {
        
        setAddImage(file);
        setAddImagePreview(URL.createObjectURL(file));
      }
    };
  
    // img.onerror = () => {
    //   alert("The selected file is not a valid image.");
    // };
  
    // Read the selected file as a data URL
    if (file) {
      img.src = URL.createObjectURL(file);
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("banner_image", addImage);
    formData.append("redirect_url", addUrl);
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Add_Mem_Banner`,
        formData
      );
      if (response.data) {
        setReload(response.data);
        alert(response.data.message);
        setAddImage(null)
        setAddUrl("")
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
        <div className="banner-main-div">
      <div className="row">
        {bannerData &&
          bannerData.map((item, index) => (
            <div className="col-lg-3 col-11">
              <div className="banner-img-div" key={index}>
                <img
                  className="banner-mem-image"
                  src={item.mem_banner_image}
                  alt={item.mem_banner_id}
                />
                <div className="d-flex justify-content-center">
                <button className="banner-edit-button" onClick={() => handleSinImg(item)}>Edit</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="d-flex flex-column">
          <label className="banner-label">Add Image</label>
          <input
          className="banner-input-choose"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          ></input>
        </div>
        <div className="d-flex flex-column">
          <label className="banner-label">Url</label>
          <input
          className="banner-url-input"
            type="text"
            value={addUrl}
            onChange={(e) => setAddUrl(e.target.value)}
          ></input>
          <div className="d-flex">
          <button className="banner-add-button" onClick={handleAdd}>ADD</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BannerImg;

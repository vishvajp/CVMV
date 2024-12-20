import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BannerImage.css";
import { useNavigate } from "react-router-dom";

const BannerMatImg = ({ baseUrl }) => {
  const [bannerData, setBannerData] = useState(null);
  const [addImage, setAddImage] = useState(null);
  const [addImagePrevieW, setAddImagePreview] = useState(null);
  const [addUrl, setAddUrl] = useState("");
  const navigate = useNavigate();
  const [reload, setReload] = useState("");

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axios.post(`${baseUrl}Tsit_Cvmv_Get_Mat_Banner`);
        if (response.data) {
          console.log(response.data.data);
          setBannerData(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getBannerData();
  }, [baseUrl, reload]);

  const handleSinImg = (imgData) => {
    navigate("/user/bannermat/image/edit", { state: imgData });
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
        `${baseUrl}Tsit_Cvmv_Add_Mat_Banner`,
        formData
      );
      if (response.data) {
        alert(response.data.message);
        setReload(response.data);
        setAddImage(null);
        setAddImagePreview(null);
        setAddUrl("");
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
              <div className="col-lg-3 col-11 mb-2" key={index}>
                <div className="banner-img-div">
                  <img
                    className="banner-mem-image"
                    src={item.mat_banner_image}
                    alt={item.mat_banner_id}
                  />
                  <div className="d-flex justify-content-center">
                    <button
                      className="banner-edit-button"
                      onClick={() => handleSinImg(item)}
                    >
                      Edit
                    </button>
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
            />
          </div>
          <div className="d-flex flex-column">
            <label className="banner-label">Url</label>
            <input
              className="banner-url-input"
              type="text"
              value={addUrl}
              onChange={(e) => setAddUrl(e.target.value)}
            />
            <div className="d-flex">
              <button className="banner-add-button" onClick={handleAdd}>
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerMatImg;

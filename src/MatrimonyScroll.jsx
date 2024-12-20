import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ScrollingText.css"

const MatrimonyScroll = ({ baseUrl }) => {
  const [scrollingText, setScrollingText] = useState("");
  const [scrolling_Id,setScrolling_Id]=useState("")

  useEffect(() => {
    const getScrollingText = async () => {
      try {
        const response = await axios.post(`${baseUrl}Tsir_Cvmv_Get_Mat_Scrolling_Text`);
        if (response.data) {
     
        console.log(response.data.data.mat_scrolling_text_id)
          setScrollingText(response.data.data.mat_scrolling_text);
          setScrolling_Id(response.data.data.mat_scrolling_text_id)
        }
      } catch (err) {
        // alert(err);
        console.log(err)
      }
    };getScrollingText()
  },[baseUrl]);

  const handleSubmit = async () => {
    const formData = {
      scrolling_text : scrollingText
    }
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Edit_Mat_Scrolling_Text/${scrolling_Id}`,formData
      );
      if (response.data) {
        alert(response.data[0].message);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <div className="userEditPage-contact-detail-div mx-2">
        <div className="d-flex flex-column">
          <label className="user-edit-form-label">Scrolling Test</label>
          <textarea
            style={{ width: "100%" }}
            className="user-edit-form-choose-file-input"
            value={scrollingText}
            onChange={(e) => setScrollingText(e.target.value)}
          ></textarea>
          <div className="d-flex justify-content-center">
          <button className="scrolling-update-button" onClick={handleSubmit}>UPDATE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyScroll;

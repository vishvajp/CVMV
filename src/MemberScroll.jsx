import axios from "axios";
import React, { useEffect, useState } from "react";

const BannerScroll = ({ baseUrl }) => {
  const [scrollText, setScrollText] = useState("");
  const [scrollId, setScrollId] = useState("");

  useEffect(() => {
    const getScrollingText = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsir_Cvmv_Get_Mem_Scrolling_Text`
        );
        if (response.data) {
          console.log(response.data);
          setScrollText(response.data.data.mem_scrolling_text);
          setScrollId(response.data.data.mem_scrolling_text_id);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getScrollingText();
  }, [baseUrl]);

  const handleSubmit = async () => {
    const formData = {
      scrolling_text: scrollText,
    };
    try {
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_Edit_Mem_Scrolling_Text
/${scrollId}`,
        formData
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
            value={scrollText}
            onChange={(e) => setScrollText(e.target.value)}
          ></textarea>
          <div className="d-flex justify-content-center">
          <button className="scrolling-update-button" onClick={handleSubmit}>UPDATE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerScroll;

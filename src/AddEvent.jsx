import React, { useState } from "react";

const AddEvent = ({ baseUrl }) => {
  const [allUrl, setAllUrl] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prveData) => ({ ...prveData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const fileImg = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: fileImg,
    }));
  };

  const handleAdd = () => {
    const url = newUrl;
    setAllUrl((prevData) => [...prevData, url]);
    setFormData((prevData) => ({
      ...prevData,
      video_url: [...prevData.video_url, url], // Add the new URL to the video_url array
    }));
    setNewUrl("");
  };

  const handleSubmit = async () => {
    console.log(formData);
    const data = new FormData();

    for (const key in formData) {
      if (key === "images") {
        formData[key]?.forEach((element) => {
          data.append("images", element);
        });
      } else if (key === "video_url") {
        formData[key]?.forEach((element) => {
          data.append("video_url", element);
        });
      } else {
        data.append(key, formData[key]);
      }
    }
  };
  // console.log(allUrl)
  return (
    <div>
      <div className="user-edit-form">
        <div className="userEditPage-contact-detail-div ">
          <div className="row">
            <div className="col-12">
              <div className="form-group d-flex flex-column">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group d-flex flex-column">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="form-group d-flex flex-column">
                <label>Video Url</label>
                <input
                  type="text"
                  name="video_url"
                  placeholder="Enter Video Url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-4">
              <div
                style={{ height: "100%" }}
                className="d-flex align-items-center"
              >
                <button onClick={handleAdd}>Add</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="d-flex flex-column">
                <span className="user-edit-form-label">Added Urls</span>
                {allUrl.length > 0 && (
                  <div
                    style={{ width: "100%" }}
                    className="d-flex flex-wrap user-edit-form-choose-file-input"
                  >
                    {allUrl?.map((singleNat, index) => (
                      <span className="me-1" key={index}>
                        {`${singleNat}${
                          index !== allUrl.length - 1 ? ", " : "."
                        }`}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group d-flex flex-column">
                <label>Add Images</label>
                <input
                  type="file"
                  name="images"
                  //   value={formData.images}
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>
          <button className=" banner-add-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;

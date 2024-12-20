import React, { useState } from "react";
import "./EventDetail.css";
import { BsCalendarDate } from "react-icons/bs";
import { BsFastForwardCircle } from "react-icons/bs";
import cvmv from "./image/cvmvbg.png";
import mt from "./image/home-bg.jpg"
import img1 from "./image/cvmvlogo.png"
import img2 from "./image/Virudhunagar.png"
import img3 from "./image/Dindugal.png"
import img from "./image/Sample.jpg"
import { useNavigate } from "react-router-dom";
const EventDetail = () => {
  const navigate = useNavigate()
  const [eventValue,setEventValue]=useState([
    {
      title: "சென்னை ஒருங்கிணைந்த விழா",
      descriptions: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusamus, fugiat. Incidunt, neque illum. Eum facere atque,
      tenetur provident fugiat, obcaecati eos aliquam iusto, sequi
      alias et sapiente corrupti tempora quos illum! Alias expedita
      corporis cum a quod mollitia! Sit asperiores distinctio
      tempore ipsum repellendus doloremque quod delectus animi
      doloribus numquam!`,
      date:"29-10-2023",
      image:[img,cvmv,mt,img1,img2,img3] ,
      url:["https://www.youtube.com/embed/y70dYJsOpvo?si=LdrtFyMRS2SWGeIA","https://www.youtube.com/embed/pGvp5Q-1Yag?si=48NeF1ZIG9qJMYgQ"]
    },
    {
      title: "சென்னை ஒருங்கிணைந்த விழா",
      descriptions: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusamus, fugiat. Incidunt, neque illum. Eum facere atque,
      tenetur provident fugiat, obcaecati eos aliquam iusto, sequi
      alias et sapiente corrupti tempora quos illum! Alias expedita
      corporis cum a quod mollitia! Sit asperiores distinctio
      tempore ipsum repellendus doloremque quod delectus animi
      doloribus numquam!`,
      date:"29-10-2023",
      image:[img,cvmv,mt,img1,img2,img3] ,
      url:["https://www.youtube.com/embed/y70dYJsOpvo?si=QtAl0rDDqHBh2BVX","https://www.youtube.com/embed/pGvp5Q-1Yag?si=iy9cPi0fmjyhE5ip"]
    },
    {
      title: "சென்னை ஒருங்கிணைந்த விழா",
      descriptions: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusamus, fugiat. Incidunt, neque illum. Eum facere atque,
      tenetur provident fugiat, obcaecati eos aliquam iusto, sequi
      alias et sapiente corrupti tempora quos illum! Alias expedita
      corporis cum a quod mollitia! Sit asperiores distinctio
      tempore ipsum repellendus doloremque quod delectus animi
      doloribus numquam!`,
      date:"29-10-2023",
      image:[img,cvmv,mt,img1,img2,img3] ,
      url:["https://www.youtube.com/embed/y70dYJsOpvo?si=QtAl0rDDqHBh2BVX","https://www.youtube.com/embed/pGvp5Q-1Yag?si=iy9cPi0fmjyhE5ip"]
    },
    {
      title: "சென்னை ஒருங்கிணைந்த விழா",
      descriptions: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusamus, fugiat. Incidunt, neque illum. Eum facere atque,
      tenetur provident fugiat, obcaecati eos aliquam iusto, sequi
      alias et sapiente corrupti tempora quos illum! Alias expedita
      corporis cum a quod mollitia! Sit asperiores distinctio
      tempore ipsum repellendus doloremque quod delectus animi
      doloribus numquam!`,
      date:"29-10-2023",
      image:[img,cvmv,mt,img1,img2,img3] ,
      url:["https://www.youtube.com/embed/y70dYJsOpvo?si=QtAl0rDDqHBh2BVX","https://www.youtube.com/embed/pGvp5Q-1Yag?si=iy9cPi0fmjyhE5ip"]
    },
    {
      title: "சென்னை ஒருங்கிணைந்த விழா",
      descriptions: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Accusamus, fugiat. Incidunt, neque illum. Eum facere atque,
      tenetur provident fugiat, obcaecati eos aliquam iusto, sequi
      alias et sapiente corrupti tempora quos illum! Alias expedita
      corporis cum a quod mollitia! Sit asperiores distinctio
      tempore ipsum repellendus doloremque quod delectus animi
      doloribus numquam!`,
      date:"29-10-2023",
      image:[img,cvmv,mt,img1,img2,img3] ,
      url:["https://www.youtube.com/embed/y70dYJsOpvo?si=QtAl0rDDqHBh2BVX","https://www.youtube.com/embed/pGvp5Q-1Yag?si=iy9cPi0fmjyhE5ip"]
    },
  ])

  const handleNavToParti =(user)=>{
navigate("/home/event/particular",{state:user})
  }
  return (
    <div>
      {" "}
      <div className="user-edit-form">
        <div className="event-detail-main-div">

             <div className="row">
             {eventValue.map((singleEvent,index)=>(
             <div key={index}  className="col-lg-4 col-12 mb-3">
               <div className="single-details-div">
                 <img src={singleEvent.image[0]} className="event-detail-banner-img"></img>
                 <h5 className="mt-2">{singleEvent.title}</h5>
                 <p className="d-flex align-items-center mt-3"><BsCalendarDate className="event-detail-calender-icons" />{singleEvent.date}</p>
                 <p>
                  {(singleEvent.descriptions).slice(0,150)}....
                 </p>
                 <div className="d-flex justify-content-end">
                     <span onClick={()=>handleNavToParti(singleEvent)}> Read More <BsFastForwardCircle className="event-detail-calender-icons"/>
                     </span>
                 </div>
               </div>
             </div>
                 ))}
           </div>
      
         
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

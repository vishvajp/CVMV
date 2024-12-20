import React, { useState } from 'react'

import logimg from "./image/cvmvlogo.png";
import { FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {

    const navigate = useNavigate()

    const handleRecover = ()=>{
        console.log("password recovered")
    }

    const [email,setEmail]=useState("")
  return (
    <div className="loginpage-bg-div">
        <div className='d-flex justify-content-center'>
            <div className="loginpage-form-main-div">
            <form onSubmit={handleRecover}>
            <div className="d-flex justify-content-center">
              <img className="loginpage-logo" src={logimg}></img>
            </div>
            <div className="d-flex justify-content-center">
                <span className="loginpage-admin-text">Recover Password</span>
            </div>
            <div className="d-flex flex-column">
              <label className="loginpage-label">Email </label>
              <div className="loginpage-input-div d-flex align-items-center">
              <input
              className="loginpage-input"
              placeholder="Enter Email"
                type="email"
                value={email}
                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <sapn><FaLock className="loginpage-icons" />
              </sapn>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <span className="loginpage-forget-password-span" onClick={()=>navigate("/")} >Login Now?</span>
            </div>
            <button type="submit" className="loginpage-login-button">Recover Password</button>
            </form>
               {/* <span className="loginpage-bottom-2024-text">©
          2024</span> <span className="loginpage-bottom-cvmv-text">CVMV</span> */}
            </div>
        </div>
       </div>
  )
}

export default ForgetPassword
import React, { useEffect, useState } from "react";
import "./LoginPage.css";
// import logimg from "./image/cvmvlogo.png";
// import { FaUser } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Flex, Input, Typography } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./image/Capture.png";

const { Title } = Typography;

const LoginPage = ({ baseUrl, onLogin, adminUserData }) => {
  const [mobNo, setMobNo] = useState();
  const [filledOtp, setFilletOtp] = useState();
  const [otpResponse, setOtpResponse] = useState();
  const [otpError, setOtpError] = useState();
  const [submitOtpError, setSubmitOtpError] = useState();
  const location = useLocation();

  const [adminData, setAdminData] = useState();
  // const [memToken, setMemToken] = useState();
  // const [matriToken, setMatriToken] = useState();

  const navToChoosePage = useNavigate();

  const onChange = (text) => {
    // console.log("onChange:", text);
    setFilletOtp(text);
  };
  const sharedProps = {
    onChange,
  };

  const mobObj = {
    phone: mobNo,
  };

  const otpObj = {
    phone: mobNo,
    otp: filledOtp,
  };

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.clear();
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${baseUrl}Tsit_Cvmv_VerifyOTP_Admin`,
        otpObj
      ); // <-- Closing parenthesis and semicolon added here
      // console.log("API response:", response.data);
      if (response.data && response.data?.success) {
        setAdminData(response.data);
      } else {
        console.error("Admin data not found in response");
      }
      if (response.data?.success) {
        localStorage.setItem("token", response.data?.admin.admin_token);
        localStorage.setItem("name", response.data?.admin.admin_name);
        localStorage.setItem("image", response.data?.admin.admin_image);
        sessionStorage.setItem("token", response.data?.admin.admin_token);
        sessionStorage.setItem("name", response.data?.admin.admin_name);
        sessionStorage.setItem("image", response.data?.admin.admin_image);
        // localStorage.setItem("type", response.data.admin_type);

        // setMemToken(response.data.mem_token);
        // setMatriToken(response.data.matri_token);
        window.alert("OTP matched successfully");
        onLogin();

        navToChoosePage("/home");
      } else {
        sessionStorage.setItem("isAuth", false);
        // navToChoosePage("/");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.otp?.[0] ||
        err.response?.data?.message ||
        "An error occurred";
      setSubmitOtpError(errorMessage);
      console.log(err, "otpe", errorMessage);
    }
  };

  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();
      const phoneNo = await axios.post(
        `${baseUrl}Tsit_Cvmv_SendOTP_Admin`,
        mobObj
      );
      // console.log(phoneNo);
      setOtpResponse(phoneNo?.data?.message);
    } catch (err) {
      console.log(err.response);

      setOtpError(err.response.data?.error?.phone?.[0]);
    }
  };

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");
  // const navToForget = useNavigate();
  // const navToHome = useNavigate();
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Replace with actual API endpoint and credentials logic
  //   const validUsername = "user";
  //   const validPassword = "password";

  //   if (username === validUsername && password === validPassword) {
  //     alert("Login successful!");
  //     localStorage.setItem("isAuth", true);
  //     navToHome("/home");
  //     // You can redirect or proceed with further logic
  //   } else {
  //     setErrorMessage("Invalid username or password");
  //   }
  // };

  return (
    <div className="loginpage-bg-div">
      {/* <div className="d-flex justify-content-center ">
        <div className="loginpage-form-main-div">
          <form onSubmit={handleLogin}>
            <div className="d-flex justify-content-center">
              <img className="loginpage-logo" src={logimg}></img>
            </div>
            <div className="d-flex justify-content-center">
              <span className="loginpage-admin-text">Admin Login</span>
            </div>
            <div className="d-flex flex-column">
              <label className="loginpage-label">Username: </label>
              <div className="loginpage-input-div d-flex align-items-center">
                <input
                  className="loginpage-input"
                  placeholder="Enter UserName"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <sapn>
                  <FaUser className="loginpage-icons" />
                </sapn>
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="loginpage-label">Password: </label>
              <div className="loginpage-input-div">
                <input
                  placeholder="Enter Password"
                  className="loginpage-input"
                  type={passwordVisible ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? (
                    <FaEye className="loginpage-icons" />
                  ) : (
                    <FaEyeSlash className="loginpage-icons" />
                  )}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <span
                className="loginpage-forget-password-span"
                onClick={() => navToForget("/forgetpassword")}
              >
                Forget Password?
              </span>
            </div>
            <button type="submit" className="loginpage-login-button">
              Sign In
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </div>
      </div> */}

      <div className="d-flex justify-content-center  h-75 align-items-center">
        <form className="otp-form " onSubmit={handleSubmit}>
          <div className="d-flex flex-column align-items-center">
            <img className="login-logo" src={logo} alt="logo"></img>
            <h2 className="text-center mb-3 login-login-text">Login</h2>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column align-items-center">
              <label className="otp-label">Mobile Number</label>
              <div className="d-flex flex-column align-items-center ">
                <input
                  className="otp-mobile-input"
                  value={mobNo}
                  onChange={(e) => setMobNo(e.target.value)}
                  type="tel"
                  maxLength={10}
                  required
                ></input>
                <button className="otp-send-otp-button" onClick={handleSendOtp}>
                  {" "}
                  SEND OTP
                </button>
              </div>
            </div>
            {otpResponse && !filledOtp && (
              <div className="d-flex justify-content-center">
                <span className="otp-message-span">{otpResponse}</span>
              </div>
            )}
            {otpError && (
              <div className="d-flex justify-content-center">
                <span className="otp-err-message-span">{otpError}</span>
              </div>
            )}
            <div className="d-flex flex-column align-items-center">
              <Flex
                className="otp-otp-div"
                gap="middle"
                align="flex-start"
                vertical
              >
                <Title level={5} className="otp-ant-otp-title">
                  Enter OTP
                </Title>
                <Input.OTP
                  className="otp-ant-otp-input"
                  length={4}
                  variant="filled"
                  {...sharedProps}
                />
              </Flex>
            </div>
            <div className="otp-err-message-span d-flex justify-content-center">
              {submitOtpError}
            </div>
            <div className="d-flex justify-content-center">
              <button className="otp-submit-button" type="submit">
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

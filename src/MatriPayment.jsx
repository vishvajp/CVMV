import React, { useEffect, useState } from "react";
import axios from "axios";
const MatriPayment = ({ baseUrl }) => {

  const [PaymentData, setPaymentData]=useState("")
  const [PaymentId, setPaymentId]=useState("")
  const adminToken = localStorage.getItem("token")
  console.log(adminToken)
  useEffect(() => {
    const getPaymentAmount = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}tsitCvmvGetMatFee`
        );
        if (response.data) {
          console.log(response.data.data[0].mat_fee_id);
          setPaymentData(response.data.data[0].mat_fee);
          setPaymentId(response.data.data[0].mat_fee_id);
        }
      } catch (err) {
        console.log(err)
      }
    };
    getPaymentAmount();
  }, [baseUrl]);


  const handleSubmit = async () => {
    const formData = {
      MatrimonyFee: PaymentData,
    };
    try {
      const response = await axios.post(
        `${baseUrl}tsitCvmvUpdateMatFee/${adminToken}/${PaymentId}`,formData
       
      );
      if (response.data) {
        console.log(response.data)
        alert(response.data.message);
      }
    } catch (err) {
      alert(err);
    }
  };


  return (
    <div><div className="userEditPage-contact-detail-div mx-2">
    <div className="d-flex flex-column">
      <label className="user-edit-form-label">Enter Payment Amount</label>
      <input
        style={{ width: "100%" }}
        className="user-edit-form-choose-file-input"
        value={PaymentData}
        onChange={(e) => setPaymentData(e.target.value)}
        placeholder="Enter Amount"
      ></input>
      <div className="d-flex justify-content-center">
      <button className="scrolling-update-button" onClick={handleSubmit}>UPDATE</button>
      </div>
    </div>
  </div></div>
  )
}

export default MatriPayment
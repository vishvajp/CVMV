import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import mt from "./image/MT.png";
const MatriTransaction = ({ baseUrl }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const adminToken = localStorage.getItem("token");
  console.log(adminToken);
  const [matTrac, setmatTrac] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}matPaymentDetailsAdmin/${adminToken}`
        );
        if (response.data) {
          console.log(response.data.data);
          setmatTrac(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [baseUrl]);

  //   const handleNavToPrint = (user) => {
  //     navigate("/home/detail/print", { state: user });
  //   };

  const handlePrint = (user) => {
    const imgBase64 = mt; // The base64 string of the image (or a valid URL)

    const userDetailsHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .user-details {
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              max-width: 600px;
              margin: 0 auto;
            }
            .user-details h2 {
              text-align: center;
            }
          .img-div{
    width: 100px;
}

.usermat-header-img{
width:100px;
height:100px;
}
            .user-details table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .user-details table th, .user-details table td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .user-details table th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
         <div className="img-div">
              <img style="width: 100%;" src="${imgBase64}" alt="User Header" />
            </div>
          <div class="user-details">
          
            <table>
              <tr><th>Matri ID</th><td>${user.matri_id}</td></tr>
              <tr><th>Name</th><td>${user.name}</td></tr>
              <tr><th>Phone No</th><td>${user.contact}</td></tr>
              <tr><th>Email</th><td>${user.email}</td></tr>
              <tr><th>Status</th><td>${user.status}</td></tr>
              <tr><th>Transaction Id</th><td>${user.paymentId}</td></tr>
              <tr><th>Bank Reference Num</th><td>${user.bankReferenceNum}</td></tr>
               <tr><th>address</th><td>${user.address}</td></tr>
                <tr><th>Adhar</th><td>${user.proof}</td></tr>
                 <tr><th>Amount</th><td>${user.amount}</td></tr>
                 <tr><th>Date</th><td>${user.date}</td></tr>
                 <tr><th>Mode</th><td>${user.mode}</td></tr>
                 <tr><th>PayuId</th><td>${user.payuId}</td></tr>
            </table>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open();
    printWindow.document.write(userDetailsHtml);

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  console.log(matTrac);
  useEffect(() => {
    const filtered = matTrac?.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search) ||
        user.matri_id?.toLowerCase().endsWith(search) ||
        user.contact?.toLowerCase().includes(search);

      const userCreatedDate = user.date
        ? new Date(user.date.split("-").reverse().join("-"))
        : null;
      // const userCreatedDate = user.date ? new Date(user.date) : null;

      const fromDateObj = fromDate ? new Date(fromDate) : null;
      const toDateObj = toDate ? new Date(toDate) : null;
      console.log(userCreatedDate, fromDateObj, toDateObj);
      const date =
        fromDateObj && toDateObj
          ? userCreatedDate >= fromDateObj && userCreatedDate <= toDateObj
          : true;

      return matchesSearch && date;
    });

    const sortedFiltered = filtered?.sort((a, b) => {
      const aIdMatch = a.matri_id.toLowerCase().endsWith(search) ? 1 : 0;
      const bIdMatch = b.matri_id.toLowerCase().endsWith(search) ? 1 : 0;
      return bIdMatch - aIdMatch;
    });

    setFilteredData(sortedFiltered);
  }, [search, fromDate, matTrac, toDate]);

  return (
    <div>
      {" "}
      <div className="table-main-div">
        <div className="row mb-2">
          <div className="col-12 col-lg-3"></div>

          <div className="col-12 col-lg-3 mb-2">
            <div className="d-flex flex-column">
              <label>From Date</label>
              <input
                className="usermatri-transac-page"
                onChange={(e) => setFromDate(e.target.value)}
                type="date"
              ></input>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-2">
            <div className="d-flex flex-column">
              <label>To Date</label>
              <input
                className="usermatri-transac-page"
                onChange={(e) => setToDate(e.target.value)}
                type="date"
              ></input>
            </div>
          </div>
          <div className="col-12 col-lg-3 mb-2">
            <div style={{ height: "100%" }} className="d-flex align-items-end">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="usermatri-transac-page"
                placeholder="Search name/id/number"
              />
            </div>
          </div>
        </div>
        <Table responsive="sm" className="matri-transac-table-scroll">
          <thead className="table-thead">
            <tr>
              <th className="table-header-col " scope="col">
                S.No
              </th>
              <th className="table-header-col " scope="col">
                PayuID
              </th>
              <th className="table-header-col " scope="col">
                ID
              </th>
              <th className="table-header-col " scope="col">
                Name
              </th>
              <th className="table-header-col" scope="col">
                Phone
              </th>
              <th className="table-header-col " scope="col">
                Email
              </th>
              <th className="table-header-col " scope="col">
                Status
              </th>
              <th className="table-header-col " scope="col">
                Payment Id
              </th>
              <th className="table-header-col " scope="col">
                Bank Reference Number
              </th>
              <th className="table-header-col" scope="col">
                Address
              </th>
              <th className="table-header-col" scope="col">
                Adhar Number
              </th>
              <th className="table-header-col" scope="col">
                Amount
              </th>
              <th className="table-header-col " scope="col">
                Date
              </th>
              <th className="table-header-col " scope="col">
                Mode
              </th>

              <th className="table-header-col" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((tabData, index) => (
              <tr className="mat-body-row" key={index}>
                <th className="table-td" scope="row">
                  {index + 1}
                </th>
                <td className="table-td">{tabData.payuId}</td>
                <td className="table-td">{tabData.matri_id}</td>
                <td className="table-td">{tabData.name}</td>
                <td className="table-td">{tabData.contact}</td>
                <td className="table-td">{tabData.email}</td>
                <td className="table-td">{tabData.status}</td>
                <td className="table-td">{tabData.paymentId}</td>
                <td className="table-td">{tabData.bankReferenceNum}</td>
                <td className="table-td">{tabData.address}</td>
                <td className="table-td">{tabData.proof}</td>
                <td className="table-td">{tabData.amount}</td>
                <td className="table-td">{tabData.date}</td>
                <td className="table-td">{tabData.mode}</td>

                <td className="table-td">
                  <button
                    className="usermatri-transac-print"
                    onClick={() => handlePrint(tabData)}
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MatriTransaction;

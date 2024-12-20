import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import axios from "axios";

const MemberTable = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_ALl_Mem_Admin`
        );
        const data = response.data.Members;

        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl]);

  const downloadPDF = ()=>{

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Membership Records", 14,22);

    doc.autoTable({
      startY:30,
      head:[["Member Id","Name","Native","District","Phone No"]],
      body: userData?.map((specUser)=>[
        specUser.mem_id,
        specUser.first_name + " " + specUser.last_name,
        specUser.native_place,
        specUser.district,
        specUser.phone,
      ])
    })

    doc.save("Membership_records.pdf")
  }

  console.log(userData)
 
  return (
    <div>
      {" "}
      <div className="d-flex justify-content-end pe-2">
        <button onClick={downloadPDF} className="btn btn-primary">
          Download PDF
        </button>
        </div>
      <div className="table-main-div">
        <Table responsive="sm">
          <thead className="table-thead">
            <tr>
              <th className="table-header-Mem " scope="col">
                Member Id
              </th>
              <th className="table-header-Mem" scope="col">
                Name
              </th>

              <th className="table-header-Mem" scope="col">
                Native
              </th>
              <th className="table-header-Mem" scope="col">
                District
              </th>
              <th className="table-header-Mem" scope="col">
                Phone No
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((specUser, index) => (
              <tr className="mat-body-row" key={index}>
                <th className="table-td" scope="row">
                  {specUser.mem_id}
                </th>
                <td className="table-td">
                  {specUser.first_name} {specUser.last_name}
                </td>

                <td className="table-td">{specUser.native_place}</td>
                <td className="table-td">{specUser.district}</td>
                <td className="table-td">{specUser.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MemberTable;

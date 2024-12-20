import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Import the autoTable plugin
import "./MatrimonyTable.css";

const MatrimonyTable = ({ baseUrl }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const handleGetUserData = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}Tsit_Cvmv_Get_All_Matri_Details_Admin`
        );
        const data = response.data.matrimony_records;
        console.log(data);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetUserData();
  }, [baseUrl]);

  // Function to generate and download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(18);
    doc.text("Matrimony Records", 14, 22);

    // Add the table
    doc.autoTable({
      startY: 30, // Position the table starting below the title
      head: [["Matri Id", "Name", "Phone No", "Native", "District"]],
      body: userData?.map((specUser) => [
        specUser.matrimony_details.matri_id,
        specUser.matrimony_details.name,
        specUser.matrimony_details.contact_detail,
        specUser.matrimony_details.native_place,
        specUser.matrimony_details.district,
      ]),
    });

    // Save the generated PDF
    doc.save("Matrimony_records.pdf");
  };

  return (
    <div>
        <div className="d-flex justify-content-end pe-2">
        <button onClick={downloadPDF} className="btn btn-primary">
          Download PDF
        </button>
        </div>
      <div className="table-main-div">
        <Table responsive="sm">
          <thead className="table-thead">
            <tr>
              <th className="table-header-col" scope="col">
                Matri Id
              </th>
              <th className="table-header-col" scope="col">
                Name
              </th>
              <th className="table-header-col" scope="col">
                Phone No
              </th>
              <th className="table-header-col" scope="col">
                Native
              </th>
              <th className="table-header-col" scope="col">
                District
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((specUser, index) => (
              <tr className="mat-body-row" key={index}>
                <th className="table-td" scope="row">
                  {specUser.matrimony_details.matri_id}
                </th>
                <td className="table-td">{specUser.matrimony_details.name}</td>
                <td className="table-td">{specUser.matrimony_details.contact_detail}</td>
                <td className="table-td">{specUser.matrimony_details.native_place}</td>
                <td className="table-td">{specUser.matrimony_details.district}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Button to download the table as PDF */}
        
      </div>
    </div>
  );
};

export default MatrimonyTable;

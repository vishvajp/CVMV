import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";
import mt from "./image/MS.png";
import Table from "react-bootstrap/Table";
const MemDonPrint = ({baseUrl}) => {
    const specUser = useLocation()
    const singleUser = specUser.state
    const contentRef = useRef()
    const navigate = useNavigate()
    const reactToPrintFn = useReactToPrint({ contentRef });
   
  return (
    <div>
        <div ref={contentRef} className="user-mat-print-main-div">
        <div className="row">
            <div className="col-12">
              <div>
                <img className="usermat-header-img" src={mt}></img>
              </div>
            </div>
          </div>
        <Table responsive="sm">
          <thead className="table-thead">
            <tr>
            <th className="table-header-Mem " scope="col">
               S.No
              </th> 
              <th className="table-header-Mem " scope="col">
               ID
              </th> 
              <th className="table-header-Mem " scope="col">
               Name
              </th>
              <th className="table-header-Mem " scope="col">
              Date
              </th>
              <th className="table-header-Mem" scope="col">
               Address
              </th>

              <th className="table-header-Mem" scope="col">
                Adhar Number
              </th>
              <th className="table-header-Mem" scope="col">
                Phone
              </th>
              <th className="table-header-Mem" scope="col">
               Amount
              </th>
             
            </tr>
          </thead>
          <tbody>
           
              <tr className="mat-body-row" >
                <th className="table-td" scope="row">
                  {1}
                </th>
                <td className="table-td">
                  {singleUser.id}
                </td>
                <td className="table-td">
                  {singleUser.name}
                </td>
                <td className="table-td">
                  {singleUser.date}
                </td>
                <td className="table-td">{singleUser.address}</td>
                <td className="table-td">{singleUser.adhar_proof}</td>
                <td className="table-td">{singleUser.phone}</td>
                <td className="table-td">{singleUser.amount}</td>
                
              </tr>
        
          </tbody>
        </Table>
        </div>
        <div className="d-flex justify-content-center mt-1 gap-3">
        <button style={{backgroundColor:"red"}} className="userMatsin-print-button mt-2 mb-5" onClick={()=>navigate("/home/memdonation")} >BACK</button>
        <button
          className="userMatsin-print-button mt-2 mb-5"
          onClick={reactToPrintFn}
        >
          PRINT
        </button>
      </div>
    </div>
  )
}

export default MemDonPrint
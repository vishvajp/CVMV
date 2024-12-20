import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const UserDataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [userPendingData, setUserPendingData] = useState([]);
  const [userMemPend, setUserMemPend] = useState([]);
  const [matUserPendCount, setMatUserPendCount] = useState();
  const [memUserPendCount, setMemUserPendCount] = useState();
  const baseUrl =
    "https://cvmvreddystrust.com/App/tsitClient2024/cvmv/public/api/";

  // const baseUrl =
  //   "https://tabsquareinfotech.com/App/Abinesh_be_work/tsit_cvmv/public/api/";

  // Notification Page
  const location = useLocation();
  const handlePending = async () => {
    try {
      const pendingData = await axios.post(
        `${baseUrl}Tsit_Cvmv_Get_All_Pending_Matri_Details`
      );
      // console.log(pendingData.data.matrimony_records);
      setUserPendingData(pendingData?.data?.matrimony_records);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMatPendCount = async () => {
    try {
      const matPendingCount = await axios.post(
        `${baseUrl}Tsit_Cvmv_Mat_Pending_List_Count`
      );

      // console.log(matPendingCount.data.data);
      setMatUserPendCount(matPendingCount?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMemPendCount = async () => {
    try {
      const memPendingCount = await axios.post(
        `${baseUrl}Tsit_Cvmv_Mem_Pending_List_Count`
      );
      // console.log(memPendingCount.data.data);
      setMemUserPendCount(memPendingCount?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMemPending = async () => {
    try {
      const MempendingData = await axios.post(
        `${baseUrl}Tsit_Cvmv_Get_ALl_Pending_Mem_Admin`
      );
      // console.log("game",MempendingData.data.Members);
      setUserMemPend(MempendingData?.data.Members);
    } catch (err) {
      setUserMemPend([]);
      console.log(err);
    }
  };

  // Use effect to trigger data fetching when the URL changes
  useEffect(() => {
    handlePending();
    handleMatPendCount();
    handleMemPending();
    handleMemPendCount();
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname === "/home/notification" &&
      !sessionStorage.getItem("reloaded")
    ) {
      // Set a flag in sessionStorage to indicate the page has been reloaded
      sessionStorage.setItem("reloaded", "true");

      // Reload the page
      window.location.reload();
    }
  }, [location.pathname]);

  return (
    <UserDataContext.Provider
      value={{
        userPendingData,
        matUserPendCount,
        userMemPend,
        memUserPendCount,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;

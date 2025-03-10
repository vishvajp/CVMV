import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import Homepage from "./Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./LoginPage";
import ForgetPassword from "./ForgetPassword";
import AdminProfile from "./AdminProfile";
import AdminMyProfile from "./AdminMyProfile";
import UserMemPage from "./UserMemPage";
import UserMemsin from "./UserMemsin";
import UserMatrimony from "./UserMatrimony";
import { useEffect, useState } from "react";
import UserMatSin from "./UserMatSin";
import UserFilterPage from "./UserFilterPage";
import UpadateMatSin from "./UpadateMatSin";
import OtpPage from "./OtpPage";
import MemMatPage from "./MemMatPage";
import { DataProvider } from "./Context/UserDataContext";
import NotificationPage from "./NotificationPage";
import PendingMatriSin from "./PendingMatriSin";
import UserEditPage from "./UserEditPage";
import ContinuePage from "./ContinuePage";
import UserMatInActiveSin from "./UserMatInActiveSin";
import UserMemSinInact from "./UserMemSinInact";
import PendingMemSin from "./PendingMemSin";
import UserMemsinEdit from "./UserMemsinEdit";
import UserMemFilterPage from "./UserMemFilterPage";
import MemberScroll from "./MemberScroll";
import BannerImg from "./BannerImg";
import UserMatFilter from "./UserMatFilter";
import MemBannerEdit from "./MemBannerEdit";
import BannerMatImg from "./BannerMatImg";
import MatBannerEdit from "./MatBannerEdit";
import MatrimonyScroll from "./MatrimonyScroll";
import AddMemUser from "./AddMemUser";

import ConfirmationPage from "./ConfirmationPage";
import AddMatUser from "./AddMatUser";
import MatriPayment from "./MatriPayment";
import MatrimonyTable from "./MatrimonyTable";
import MemberTable from "./MemberTable";

import MemDonation from "./MemDonation";
import MemDonPrint from "./MemDonPrint";
import MatriTransaction from "./MatriTransaction";

// import ProtectedRoute from "./ProtectedRouter";

function App() {
  const [activeMem, setActiveMem] = useState([]);
  // const [admin, setAdmin] = useState();
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const baseUrl =
    "https://cvmvreddystrust.com/App/tsitClient2024/cvmv/public/api/";

  // const baseUrl =
  //   "https://tabsquareinfotech.com/App/Abinesh_be_work/tsit_cvmv/public/api/";

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(localStorage.getItem("isAuth") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem("isAuth", true);
  };
  // console.log(isAuth, "is auth ");

  const activeMemSingleDetail = (singleUserActive) => {
    setActiveMem(singleUserActive);
  };

  // const adminUserData = (adminUser) => {
  //   setAdmin(adminUser);
  // };

  // console.log(admin);

  return (
    <div className="App">
      <DataProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <LoginPage
                baseUrl={baseUrl}
                onLogin={handleLogin}
                // adminUserData={adminUserData}
              />
            }
          />

          {/* Protected Routes */}
          {isAuth ? (
            <>
              <Route
                path="/home"
                element={
                  <AppLayout>
                    <Homepage baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="admin/myprofile"
                element={
                  <AppLayout>
                    <AdminMyProfile baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="admin/profile"
                element={
                  <AppLayout>
                    <AdminProfile baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="user/membership"
                element={
                  <AppLayout>
                    <UserMemPage
                      activeMemSingleDetail={activeMemSingleDetail}
                      baseUrl={baseUrl}
                    />
                  </AppLayout>
                }
              />
              <Route
                path="user/membership/detail"
                element={
                  <AppLayout>
                    <UserMemsin activeMem={activeMem} />
                  </AppLayout>
                }
              />
              {/* <Route
                path="user/matrimony/filter"
                element={
                  <AppLayout>
                    <UserMatrimony />
                  </AppLayout>
                }
              /> */}
              <Route
                path="user/matrimony/detail"
                element={
                  <AppLayout>
                    <UserMatSin />
                  </AppLayout>
                }
              />
              <Route
                path="user/matrimony/table"
                element={
                  <AppLayout>
                    <MatrimonyTable baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="user/member/table"
                element={
                  <AppLayout>
                    <MemberTable baseUrl={baseUrl}></MemberTable>
                  </AppLayout>
                }
              />
              <Route
                path="user/matrimony"
                element={
                  <AppLayout>
                    <UserFilterPage baseUrl={baseUrl} />
                  </AppLayout>
                }
              />

              <Route
                path="user/matrimony/filter"
                element={
                  <AppLayout>
                    <UserMatFilter baseUrl={baseUrl} />
                  </AppLayout>
                }
              />

              <Route
                path="user/matrimony/update"
                element={
                  <AppLayout>
                    <UpadateMatSin />
                  </AppLayout>
                }
              />
              <Route
                path="home/otp"
                element={
                  <AppLayout>
                    <OtpPage baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="home/confirmation"
                element={
                  <AppLayout>
                    <ConfirmationPage baseUrl={baseUrl}></ConfirmationPage>
                  </AppLayout>
                }
              />
              <Route
                path="home/addmatri"
                element={
                  <AppLayout>
                    <AddMatUser baseUrl={baseUrl}></AddMatUser>
                  </AppLayout>
                }
              />
              <Route
                path="home/choosedetail"
                element={
                  <AppLayout>
                    <MemMatPage />
                  </AppLayout>
                }
              />
              <Route
                path="home/notification"
                element={
                  <AppLayout>
                    <NotificationPage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/notification/singleUser"
                element={
                  <AppLayout>
                    <PendingMatriSin baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/user/edit"
                element={
                  <AppLayout>
                    <UserEditPage baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/memuser/filter"
                element={
                  <AppLayout>
                    <UserMemFilterPage baseUrl={baseUrl}></UserMemFilterPage>
                  </AppLayout>
                }
              />
              <Route
                path="home/memuser/edit"
                element={
                  <AppLayout>
                    <UserMemsinEdit baseUrl={baseUrl}></UserMemsinEdit>
                  </AppLayout>
                }
              />

              <Route
                path="/home/ourteam"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/meeting"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/marketing"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/newsandevents"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="home/location"
                element={
                  <AppLayout>
                    <ContinuePage></ContinuePage>
                  </AppLayout>
                }
              />
              <Route
                path="/home/faq"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/company"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/cvmvprofile"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/cvmvback"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/payment"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/memcheck"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/maripayment"
                element={
                  <AppLayout>
                    <MatriPayment baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/memdonation"
                element={
                  <AppLayout>
                    <MemDonation baseUrl={baseUrl}></MemDonation>
                  </AppLayout>
                }
              />

              <Route
                path="/home/matri/transaction"
                element={
                  <AppLayout>
                    <MatriTransaction baseUrl={baseUrl}></MatriTransaction>
                  </AppLayout>
                }
              />
              <Route
                path="/home/detail/print"
                element={
                  <AppLayout>
                    <MemDonPrint baseUrl={baseUrl}></MemDonPrint>
                  </AppLayout>
                }
              />

              <Route
                path="/home/mempayment"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/home/memdonation"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="user/member/scrolling"
                element={
                  <AppLayout>
                    <MemberScroll baseUrl={baseUrl}></MemberScroll>
                  </AppLayout>
                }
              />
              <Route
                path="user/matrimony/scrolling"
                element={
                  <AppLayout>
                    <MatrimonyScroll baseUrl={baseUrl}></MatrimonyScroll>
                  </AppLayout>
                }
              />
              <Route
                path="user/banner/image"
                element={
                  <AppLayout>
                    <BannerImg baseUrl={baseUrl}></BannerImg>
                  </AppLayout>
                }
              />

              <Route
                path="user/banner/matimage"
                element={
                  <AppLayout>
                    <BannerMatImg baseUrl={baseUrl}></BannerMatImg>
                  </AppLayout>
                }
              />

              <Route
                path="user/bannermem/image/edit"
                element={
                  <AppLayout>
                    <MemBannerEdit baseUrl={baseUrl}></MemBannerEdit>
                  </AppLayout>
                }
              />

              <Route
                path="user/bannermat/image/edit"
                element={
                  <AppLayout>
                    <MatBannerEdit baseUrl={baseUrl}></MatBannerEdit>
                  </AppLayout>
                }
              />
              <Route
                path="/home/contact"
                element={
                  <AppLayout>
                    <ContinuePage />
                  </AppLayout>
                }
              />
              <Route
                path="/user/matrimony/inactdetail"
                element={
                  <AppLayout>
                    <UserMatInActiveSin baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/user/meminact"
                element={
                  <AppLayout>
                    <UserMemSinInact baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/notification/memberapprove"
                element={
                  <AppLayout>
                    <PendingMemSin baseUrl={baseUrl} />
                  </AppLayout>
                }
              />
              <Route
                path="/home/membership/add"
                element={
                  <AppLayout>
                    <AddMemUser baseUrl={baseUrl}></AddMemUser>
                  </AppLayout>
                }
              />
              <Route
                path="/home/event/histrory"
                element={
                  <AppLayout>
                    <ContinuePage></ContinuePage>
                  </AppLayout>
                }
              />
              <Route
                path="/home/event/add"
                element={
                  <AppLayout>
                 <ContinuePage></ContinuePage>
                  </AppLayout>
                }
              />
               <Route
                path="/home/event/detail"
                element={
                  <AppLayout>
               <ContinuePage></ContinuePage>
                  </AppLayout>
                }
              />
              <Route
                path="/home/event/particular"
                element={
                  <AppLayout>
              <ContinuePage></ContinuePage>
                  </AppLayout>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </DataProvider>
    </div>
  );
}
{/* <Route
path="/home/event/histrory"
element={
  <AppLayout>
    <EventHistory baseUrl={baseUrl}></EventHistory>
  </AppLayout>
}
/>
<Route
path="/home/event/add"
element={
  <AppLayout>
  <AddEvent baseUrl={baseUrl}></AddEvent>
  </AppLayout>
}
/>
<Route
path="/home/event/detail"
element={
  <AppLayout>
<EventDetail baseUrl={baseUrl}></EventDetail>
  </AppLayout>
}
/>
<Route
path="/home/event/particular"
element={
  <AppLayout>
<SingleEventDetail baseUrl={baseUrl}></SingleEventDetail>
  </AppLayout>
}
/> */}

{/* <Route
path="home/location"
element={
  <AppLayout>
    <Location baseUrl={baseUrl}></Location>
  </AppLayout>
}
/> */}

export default App;

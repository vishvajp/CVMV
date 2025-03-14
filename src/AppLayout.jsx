import React, { useContext, useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
// import HomeHeader from "./HomeHeader";
import { useNavigate, useLocation } from "react-router-dom";
// import { FaPlusCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import logimg from "./image/Capture.png";
import { MdTableRows } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import UserDataContext from "./Context/UserDataContext";
import "./AppLayout.css";
// import { MdTableRows } from "react-icons/md";
// import { PiTableBold } from "react-icons/pi";
// import { FaMinusCircle } from "react-icons/fa";
  
export default function AppLayout({ children, admin }) {
  const navigate = useNavigate();
  const { Header, Content, Sider, Footer } = Layout;
  const [openKeys, setOpenKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navToNotify = useNavigate();
  const { userPendingData, matUserPendCount, memUserPendCount } =
    useContext(UserDataContext);
  const adminName = localStorage.getItem("name");
  const adminImage = localStorage.getItem("image");


  const matCount = matUserPendCount ? matUserPendCount : 0;
  const memCount = memUserPendCount ? memUserPendCount : 0;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  function getItem(label, key, visible, icon, children) {
    const isSubMenuOpen = openKeys.includes(key);

    return {
      key,
      icon,
      children,
      label: (
        <div className="menu-item-label">
          <span>{label}</span>
          {/* {visible && (
            <div className="menu-icon-container">
              {isSubMenuOpen ? (
                <FaMinusCircle className="menu-plus-icon" />
              ) : (
                <FaPlusCircle className="menu-plus-icon" />
              )}
              
            </div>
          )} */}
        </div>
      ),
    };
  }

  const val = [
    {
      menu_name: "CVMV Home",
      menu_url: "home",
      menu_icon: <FaHome />,
      submenuservice: [],
      //   visible: true,
    },
    {
      menu_name: "Admin",
      menu_url: "home/pro",
      menu_icon: <FaHome />,
      submenuservice: [
        {
          menu_name: "My Profile",
          menu_url: "admin/myprofile",

          //   visible: false,
        },
        {
          menu_name: "Admin Profile",
          menu_url: "admin/profile",
          //   visible: false,
        },
      ],
      visible: true,
    },

    {
      menu_name: "Users",
      menu_url: "home/user",
      menu_icon: <FaUser />,
      submenuservice: [
        {
          menu_name: "Membership",
          menu_url: "user/membership",

          //   visible: false,
        },
        {
          menu_name: "Matrimony",
          menu_url: "user/matrimony",
          //   visible: false,
        },
        {
          menu_name: "Member Table",
          menu_url: "user/member/table",
          //   visible: false,
        },
        {
          menu_name: "Matrimony Table",
          menu_url: "user/matrimony/table",
          //   visible: false,
        },
     
        {
          menu_name: "Our Team",
          menu_url: "home/ourteam",
          //   visible: false,
        },
      ],
      //   visible: true,
    },
    {
      menu_name: "Meeting [Events]",
      menu_url: "home/meeting",
      menu_icon: <HiMiniUserGroup />,
      submenuservice: [],
      //   visible: true,
    },
    {
      menu_name: "Marketing [Mail]",
      menu_url: "home/marketing",
      menu_icon: <IoMdMail />,
      submenuservice: [],
      //   visible: true,
    },
    // {
    //   menu_name: "News and Events",
    //   menu_url: "home/newsandevents",
    //   menu_icon: <FaHome />,
    //   submenuservice: [],
    //   //   visible: true,
    // },
    
    
    {
      menu_name: "Banner ",
      menu_url: "home/banner",
      menu_icon: <FaHome />,
      submenuservice: [
        {
          menu_name: "Banner Mem Img",
          menu_url: "user/banner/image",

          //   visible: false,
        },
        {
          menu_name: "Banner Matri Img",
          menu_url: "user/banner/matimage",

          //   visible: false,
        },
        {
          menu_name: "Mem Scrolling Text",
          menu_url: "user/member/scrolling",

          //   visible: false,
        },
        {
          menu_name: "Matri Scrolling Text",
          menu_url: "user/matrimony/scrolling",

          //   visible: false,
        },
      ],
      //   visible: true,
    },
    {
      menu_name: "Location",
      menu_url: "home/location",
      menu_icon: <FaHome />,
      submenuservice: [
       
      ],
      //   visible: true,
    },
    {
      menu_name: "FAQ's",
      menu_url: "home/faq",
      menu_icon: <FaHome />,
      submenuservice: [],
      //   visible: true,
    },
    {
      menu_name: "Company Details",
      menu_url: "home/company",
      menu_icon: <FaHome />,
      submenuservice: [
        {
          menu_name: "CVMV Profile",
          menu_url: "home/cvmvprofile",
          //   visible: false,
        },
        {
          menu_name: "CVMV Backup",
          menu_url: "home/cvmvback",
          // visible: false,
        },
      ],
      //   visible: true,
    },
    {
      menu_name: "Payment Details",
      menu_url: "home/payment",
      menu_icon: <FaHome />,
      submenuservice: [
        {
          menu_name: "Mem Checkout",
          menu_url: "home/memcheck",
          //   visible: false,
        },
        {
          menu_name: "Matri Payment",
          menu_url: "/home/maripayment",
          //   visible: false,
        },
        {
          menu_name: "Mem Payment",
          menu_url: "home/mempayment",
          //   visible: false,
        },
        {
          menu_name: "Donation",
          menu_url: "home/memdonation",
          //   visible: false,
        },
        {
          menu_name: "Matri Transaction",
          menu_url: "home/matri/transaction",
          //   visible: false,
        },
      ],
      //   visible: true,
    },
    {
      menu_name: "Event",
      menu_url: "home/Event",
      menu_icon: <FaHome />,
      submenuservice: [
        {
          menu_name: "History",
          menu_url: "home/event/histrory",
          //   visible: false,
        },
        {
          menu_name: "Add Event",
          menu_url: "home/event/add",
          //   visible: false,
        },
        {
          menu_name: "Event Details",
          menu_url: "home/event/detail",
          //   visible: false,
        },
      ],
      //   visible: true,
    },
    {
      menu_name: "Contacting",
      menu_url: "home/contact",
      menu_icon: <FaHome />,
      submenuservice: [],
      //   visible: true,
    },
  ];

  const items1 = val.map((item) => {
    if (item.submenuservice.length === 0) {
      return getItem(
        item.menu_name,
        `/${item.menu_url}`,
        item.visible,
        item.menu_icon
      );
    } else {
      return getItem(
        item.menu_name,
        `/${item.menu_url}`,
        item.visible,
        item.menu_icon,
        item.submenuservice.map((submenu) =>
          getItem(submenu.menu_name, `/${submenu.menu_url}`, submenu.visible)
        )
      );
    }
  });

  const location = useLocation();
  const locationUrl = location.pathname;
  const checklocation = locationUrl
    .slice(1)
    .split("")
    .map((team, index) => (index === 0 ? team.toUpperCase() : team))
    .join("");

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleMenuClick = ({ key, keyPath }) => {
    const clickedItem = val.find(
      (item) => `/${item.menu_url}` === keyPath[keyPath.length - 1]
    );

    // If the clicked item is a top-level menu item and has no submenus, close the menu
    if (
      !clickedItem ||
      (clickedItem.submenuservice.length === 0 && keyPath.length === 1)
    ) {
      setOpenKeys([]); // Close all submenus
    }

    navigate(key);
  };
  return (
    <Layout>
      <Header className="Applayout-header">
        {/* <HomeHeader /> */}
        <div className="d-flex applayout-header-main-div">
          <div className="d-flex">
            <div className="d-flex align-items-center applayout-header-img-div">
              <img className="applayout-header-img" src={logimg}></img>
            </div>
            <div className="d-flex justify-content-center align-items-center applayout-tab-icon-div">
              <MdTableRows
                className="applayout-header-tab-icon"
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>

            <div className="applayout-header-search-div">
              <input
                className="applayout-header-search-input"
                type="text"
              ></input>
              <span>
                <FaSearch className="applayout-header-search-icon" />
              </span>
            </div>
          </div>
          <div className="d-flex  align-items-center applayout-header-search-div">
            <div className="d-flex align-items-center ms-3">
              <FaRegBell
                className="applayout-header-bell-icon"
                onClick={() => navToNotify("/home/notification")}
              />
              <div className="applayout-notification-count-div">
                <span className="applayout-notification-count">
                  {matCount || memCount
                    ? matCount + memCount
                    : 0}
                </span>
              </div>
            </div>
            <div>
              <span className="applayout-header-man-icon-span">
                <img className="applayout-header-man-icon" src={adminImage} />
              </span>
              <span className="applayout-header-testing-span">{adminName}</span>
            </div>

            <div>
              <span className="applayout-logout-span" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </Header>
      <Layout
        className="ant-sider-and-content-layout"
        style={{ minHeight: "100vh" }}
      >
        <Sider
          className="Applayout-sider"
          collapsed={collapsed}
          onCollapse={setCollapsed} // Toggle the collapsed state
          style={{
            boxShadow: "0px 1px 5px gray",
            // display: isMobile ? (sidebar ? "block" : "none") : "block",
          }}
        >
          <Menu
            style={{ marginTop: "3px" }}
            onClick={handleMenuClick}
            selectedKeys={[location.pathname]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            mode="inline"
            items={items1}
            className="applayout-menu"
          />
        </Sider>
        <Layout className="ant-content-layout" style={{ flex: 1 }}>
          <Layout className="ant-ant-content">
            <Breadcrumb style={{ margin: "16px 0 " }}>
              <Breadcrumb.Item>
                <FaHome className="me-1" />
                {checklocation}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <div className="content-wrapper mb-3 ms-0">{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}

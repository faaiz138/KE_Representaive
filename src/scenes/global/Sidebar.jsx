import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReportIcon from '@mui/icons-material/Report';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubjectIcon from '@mui/icons-material/Subject';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Cookies from 'js-cookie'
import ChatIcon from '@mui/icons-material/Chat';
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './sidebar.css'
const routes = [
  {
    path: "/dashboard/home",
    name: "Dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    path: "/dashboard/team",
    name: "Team",
    icon: <PeopleOutlinedIcon/>,
  },
  {
    path: "/dashboard/bill",
    name: "Bill Generation",
    icon: <ReceiptOutlinedIcon />,
  },
  {
    path: "/dashboard/register",
    name: "Add Supervisor",
    icon: <HowToRegIcon  />,
  },
  {
    path: "/dashboard/complaint",
    name: "Complaint Management",
    icon: <ReportIcon/>,
    subRoutes: [
      {
        path: "/dashboard/complaint/pending",
        name: "Pending Complaints ",
        icon: <PendingActionsIcon/>,
      },
      {
        path: "/dashboard/complaint/assigned",
        name: "Assigned Complaint",
        icon: <AssignmentIcon/>,
      },
      {
        path: "/dashboard/complaint/completed",
        name: "Completed Complaints",
        icon: <AssignmentTurnedInIcon />,
      },
    ],
  },
  {
    path: "/dashboard/chat",
    name: "Supervisor Chat",
    icon: <ChatIcon/>,
  },
  {
    path: "/",
    name: "Logout",
    icon: <Logout />,
  }
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.05,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.05,
      },
    },
  };
  function handleClick(e){
    if(e==='Logout')
    {
      console.log(true)
      localStorage.removeItem("auth");
      Cookies.remove('auth')
    }
    console.log(localStorage.getItem('auth'))
  }
  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "75px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  K Electric Dashboard
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
          <div className="bars">
              <SubjectIcon onClick={toggle} />
            </div>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => handleClick(route.name)}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
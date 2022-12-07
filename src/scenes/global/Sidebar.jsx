import "../../scenes/global/sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebarDash">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/home" className="link">
            <li className="sidebarListItem active">
              <HomeOutlinedIcon className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tools</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/team" className="link">
              <li className="sidebarListItem">
                <PeopleOutlinedIcon className="sidebarIcon" />
                Supervisor Team
              </li>
            </Link>
            <Link to="/dashboard/bill" className="link">
              <li className="sidebarListItem">
                <ReceiptOutlinedIcon className="sidebarIcon" />
                Bill Generation
              </li>
            </Link>
            <Link to="/dashboard/register" className="link">
              <li className="sidebarListItem">
                <PersonOutlinedIcon className="sidebarIcon" />
                Add Supervisor
              </li>
            </Link>
            <Link to="/dashboard/complaint" className="link">
              <li className="sidebarListItem">
                <HelpOutlineOutlinedIcon className="sidebarIcon" />
                Complaints Management
              </li>
            </Link>
            <Link to="/dashboard/chat" className="link">
              <li className="sidebarListItem">
                <ChatIcon  className="sidebarIcon" />
                Supervisor Chat
              </li>
            </Link> 
          </ul>
        </div>
      </div>
    </div>
  );
}
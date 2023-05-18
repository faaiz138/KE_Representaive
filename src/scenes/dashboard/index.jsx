import { Box, Typography, useTheme } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { tokens } from "../../theme";
import FireTruckIcon from '@mui/icons-material/FireTruck';
import ReportIcon from '@mui/icons-material/Report';
import { useState,useEffect } from "react";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Divider from '@mui/material/Divider';
import StatBox from "../../components/StatBox";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dashboardData, setdashboardData] = useState([])
  const [dashboardComplain, setdashboardComplain] = useState([])
  useEffect(() => {
    fetch("http://localhost:3080/user_complain/getpendingcomplains", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdashboardData(data);
        //setdashboardComplain(data.dashobard_complains); // Access dashboardData after it's been set
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3080/employee_complain/getpendingcomplains",{   method: "GET", 
    'credentials': 'include',
     headers: new Headers({
         'Accept': 'application/json',
         'Access-Control-Allow-Origin':'http://localhost:3000/',
         'Content-Type': 'application/json',
 })
})
      .then((data) => data.json())
      .then((data) => setdashboardComplain(data))

  }, [])
  var prog = parseFloat(dashboardData.new_complains)/(parseFloat(dashboardData.new_complains)+parseFloat(dashboardData.resolved_complains)+parseFloat(dashboardData.completed_complains)).toString()
  var totalComplaints = (parseFloat(dashboardData.new_complains)+parseFloat(dashboardData.resolved_complains)+parseFloat(dashboardData.completed_complains))
  var assignedComplaints = parseFloat(dashboardData.resolved_complains)/(parseFloat(dashboardData.new_complains)+parseFloat(dashboardData.resolved_complains)+parseFloat(dashboardData.completed_complains)).toString()
  var completedComplaints =  parseFloat(dashboardData.completed_complains)/(parseFloat(dashboardData.new_complains)+parseFloat(dashboardData.resolved_complains)+parseFloat(dashboardData.completed_complains)).toString()
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Hello Faaiz" subtitle="Welcome to your dashboard" />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.supervisor_list}
            subtitle="Total Supervisors"
            icon={
              <FireTruckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.new_complains}
            subtitle="New Complaints"
            progress={prog}
            increase={(parseFloat(prog)*100).toFixed(2).toString().concat("%")}
            icon={
              <ReportIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.resolved_complains}
            subtitle="Complaints Assigned"
            progress={assignedComplaints}
            increase={(parseFloat(assignedComplaints)*100).toFixed(2).toString().concat("%")}
            icon={
              <TaskAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.completed_complains}
            subtitle="Complaints Completed"
            progress={completedComplaints}
            increase={(parseFloat(completedComplaints)*100).toFixed(2).toString().concat("%")}
            icon={
              <AssignmentIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Complaints Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {totalComplaints}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  overflow="auto"
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom={`4px solid ${colors.primary[500]}`}
    colors={colors.grey[500]}
    p="25px"
  >
    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
      Recent Complaints
    </Typography>
  </Box>
  <Box p="25px">
    {dashboardComplain.length > 0 ? (
      dashboardComplain.map((complaint, index) => (
        <Box key={complaint.account_no} mb="16px">
          <Typography
          color={colors.greenAccent[500]}
          variant="body1"
          fontSize="1.2rem"
          
        >
          Complaint Number: {complaint.complain_no}
        </Typography>
          <Typography variant="subtitle1" fontSize="1rem">
            Type: {complaint.complain_type}
          </Typography>
          <Typography variant="subtitle1" fontSize="1rem">
            Details: {complaint.details}
          </Typography>
          <Typography variant="subtitle1" fontSize="1rem">
            Date: {new Date(complaint.complain_date).toLocaleDateString()}
          </Typography>
          <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.9)',
                margin: '8px 0', }}/>
          
        </Box>
      ))
    ) : (
      <Typography>No recent complaints</Typography>
    )}
  </Box>
</Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

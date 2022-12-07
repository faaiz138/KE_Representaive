import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
const columns = [
  { field: 'complain_no', headerName: 'Complain #', width: 80},
  { field: 'complain_type', headerName: 'Type', width: 150 },
  { field: 'complain_status', headerName: 'Status', width: 100 },
  { field: 'affected_area', headerName: 'Area Affected', width: 200 },
  { field: 'consumer_id', headerName: 'Consumed ID', width: 100 },
  { field: 'account_no', headerName: 'Account Number', width: 100 },
  { field: 'details', headerName: 'Complain Details', width: 400 }
]
const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);
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
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData);

  return (
    <Box m="20px">
      <Header title="Complaint List" subtitle="Managing Complaints" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={tableData} columns={columns} getRowId={(row) => row.complain_no} />
      </Box>
    </Box>
  );
};
export default FAQ;

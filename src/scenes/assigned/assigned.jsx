import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import { mockDataTeam } from "../../data/mockData";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Header from "../../components/Header";
import {GridActionsCellItem} from '@mui/x-data-grid-pro';
import axios from "axios";
import {Navigate, useNavigate} from 'react-router-dom';
const Assigned = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);

  const columns = [
    { field: 'complain_no', headerName: 'Complain #', width: 65},
    { field: 'complain_type', headerName: 'Type', width: 150 },
    { field: 'complain_status', headerName: 'Status', width: 100 },
    { field: 'affected_area', headerName: 'Area Affected', width: 150 },
    { field: 'consumer_id', headerName: 'Consumer ID', width: 100 },
    { field: 'account_no', headerName: 'Account Number', width: 100 },
    { field: 'details', headerName: 'Complain Details', width: 400 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ row }) => {

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ]
  const handleDeleteClick = (id) => () => {
    setTableData(tableData.filter((row) => row.id !== id));
    delete_acc(id.account_no,id.consumer_id,id.complain_no,id)
  };
  async function delete_acc(account_no,consumer_id,complain_no,id)
  {
    const response = await axios.delete('http://localhost:3080/employee_complain/deleteComplain',
    {
      data: {
        account_no : account_no,
        consumer_id : consumer_id,
        complain_no:complain_no

      },
      withCredentials:true,
    }
    );
    if(response.status===200)
    {
      const newData = [...tableData];
      const prevIndex = tableData.findIndex((item) => item.key === id);
      newData.splice(prevIndex, 1);
      setTableData(newData);
      console.log(response);
    }   
  }
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
      <Header title="Assigned Complaints List" subtitle="View All the Complaints Assigned to Supervisors" />
      <Box
        m="42px 0 0 0"
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
        <DataGrid rows={tableData} columns={columns} getRowId={(row) => row.complain_no} />
      </Box>
    </Box>
  );
};
export default Assigned;

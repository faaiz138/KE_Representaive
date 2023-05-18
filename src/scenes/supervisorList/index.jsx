import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState,useEffect } from "react";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])
  const columns = [
    { field: 'supervisor_id', headerName: 'ID' },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'first_name', headerName: 'First Name', width: 160 },
    { field: 'last_name', headerName: 'Last Name', width: 160 },
    { field: 'contact_no', headerName: 'Contact', width: 200 },
    { field: 'cnic', headerName: 'CNIC', width: 100 },
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

  useEffect(() => {
    fetch("http://localhost:3080/Supervisor/getsupervisor",{   method: "GET", 
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
  const handleDeleteClick = (id) => () => {
    setTableData(tableData.filter((row) => row.id !== id));
    console.log(id.supervisor_id)
    delete_acc(id.supervisor_id,id)
  };
  async function delete_acc(supervisor_id,id)
  {
    fetch(`http://localhost:3080/Supervisor/delete_supervisor/${supervisor_id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete supervisor');
      }
      if(response.status===200)
      {
      const newData = [...tableData];
      const prevIndex = tableData.findIndex((item) => item.key === id);
      newData.splice(prevIndex, 1);
      setTableData(newData);
    }
    if (response.ok) {
      window.alert('Supervisor Deleted');
      window.location.reload(); // Refresh the page
    }
      // If the deletion is successful, update the tableData state by filtering out the deleted row
    })
    .catch((error) => {
      // Handle error if necessary
      console.log('Error deleting supervisor:', error);
    });
  }

  return (
    <Box m="20px">
      <Header title="Supervisor List" subtitle="Managing the Supervisors" />
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
        <DataGrid  rows={tableData} columns={columns} getRowId={(row) => row.supervisor_id} />
      </Box>
    </Box>
  );
};

export default Team;

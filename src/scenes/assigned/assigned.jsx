import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import PreviewIcon from '@mui/icons-material/Preview';
import { useState,useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Header from "../../components/Header";
import {GridActionsCellItem} from '@mui/x-data-grid-pro';
import axios from "axios";
import NumbersIcon from '@mui/icons-material/Numbers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HomeIcon from '@mui/icons-material/Home';
import StatBox from "../../components/StatBox";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Stack from '@mui/material/Stack';
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  fontsize: 40,
  p: 2,
};
const Assigned = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState(tableData);
  const [deletedRows, setDeletedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };




  const columns = [
    { field: 'complain_no', headerName: 'Complain #', width: 65},
    { field: 'complain_type', headerName: 'Type', width: 100 },
    { field: 'complain_status', headerName: 'Status', width: 100 },
    { field: 'affected_area', headerName: 'Area Affected', width: 100 },
    { field: 'consumer_id', headerName: 'Consumer ID', width: 100 },
    { field: 'account_no', headerName: 'Account Number', width: 100 },
    { field: 'details', headerName: 'Complain Details', width: 300 },
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
    {
      field: 'Preview',
      type: 'actions',
      headerName: 'Preview',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ row }) => {

        return [
          <GridActionsCellItem
            icon={<PreviewIcon />}
            label="Preview"
            onClick={handlePreviewClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ]
  const handlePreviewClick = (id) => () => {
    setOpen(true)
    setRows(id)
  }
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
  const handleClose = () => setOpen(false);
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
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <List
      sx={{
        width: '100%',
        maxWidth: 360
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <NumbersIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Supervisor ID" secondary="54585"/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PermIdentityIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Supervisor Name" secondary="Ali Khan"/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ElectricBoltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Type" secondary={rows.complain_type} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Area Affected" secondary={rows.affected_area} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TimelapseIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Estimated Time" secondary= "53 Minuites" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PermIdentityIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Account Number" secondary={rows.account_no}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DescriptionIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Complain Details" secondary={rows.details} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <Typography align="center" style={{ paddingTop: '10px' }} variant="h5" gutterBottom>
        Supervisor Updates
      </Typography>
    </List>   
    <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        <Box style={{ backgroundColor: '#f5f5f5',border: '1px solid black' }} display="flex" justifyContent="center" alignItems="center" p={2}>
        Need Hardware Tools
        </Box>
        <Box  style={{backgroundColor: '#f5f5f5', border: '1px solid black' }} display="flex" justifyContent="center" alignItems="center" p={2}>
        Will Be Fixed Soon
        </Box>
        <Box  style={{backgroundColor: '#f5f5f5' ,border: '1px solid black' }} display="flex" justifyContent="center" alignItems="center" p={2}>
        Need Backup for Quick Resolve
        </Box>
      </Stack>
          </Box>
        </Fade>
      </Modal>
      </Box>
    </Box>
  );
};
export default Assigned;

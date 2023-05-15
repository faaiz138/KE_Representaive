import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import PreviewIcon from '@mui/icons-material/Preview';
import { useState,useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Header from "../../components/Header";
import {GridActionsCellItem} from '@mui/x-data-grid-pro';
import NumbersIcon from '@mui/icons-material/Numbers';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Stack from '@mui/material/Stack';
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
  const [supervisorData,setSupervisorData]= useState([]);
  const [rows2, setRows2] = useState(supervisorData);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: 'complain_no', headerName: 'Complain #', width: 80},
    {field: 'supervisor_id', headerName: 'Supervisor ID',width: 100},
    { field: 'complain_type', headerName: 'Type', width: 150 },
    {field: 'first_name', headerName: 'Supervisor Assigned',width:150},
    { field: 'affected_area', headerName: 'Area Affected', width: 150 },
    { field: 'account_no', headerName: 'Account Number', width: 100 },
    { field: 'details', headerName: 'Complain Details', width: 300 },
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
    setRows2(id)
  }
 
  useEffect(() => {
    fetch("http://localhost:3080/user_complain/get_supervisor_complain",{   method: "GET", 
    'credentials': 'include',
     headers: new Headers({
         'Accept': 'application/json',
         'Access-Control-Allow-Origin':'http://localhost:3000/',
         'Content-Type': 'application/json',
 })
})
      .then((data) => data.json())
      .then((data) => setSupervisorData(data))

  }, [])
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
        <DataGrid rows={supervisorData} columns={columns} getRowId={(row) => row.complain_no} />
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
        <ListItemText primary="Supervisor ID" secondary={rows2.supervisor_id}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PermIdentityIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Supervisor Name" secondary={rows2.first_name+ ' '+ rows2.last_name}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ElectricBoltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Type" secondary={rows2.complain_type} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Area Affected" secondary={rows2.affected_area} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TimelapseIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Estimated Time" secondary= {rows2.estimated_time} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PermIdentityIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Account Number" secondary={rows2.account_no}/>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DescriptionIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Complain Details" secondary={rows2.details} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <Typography align="center" style={{ paddingTop: '10px' }} variant="h5" gutterBottom>
        Supervisor Updates
      </Typography>
    </List>   
    <Stack
      >
        <Box style={{ backgroundColor: '#f5f5f5',border: '1px solid black' }} display="flex" justifyContent="center" alignItems="center" p={2}>
        {rows2.supervisor_detail}
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

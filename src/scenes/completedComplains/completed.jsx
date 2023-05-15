import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { Fragment } from 'react'
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
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DescriptionIcon from '@mui/icons-material/Description';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
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
const Completed = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [completeData,setcompleteData]= useState([]);
  const [rows2, setRows2] = useState(completeData);
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
      .then((data) => setcompleteData(data))

  }, [])
  const handleClose = () => setOpen(false);
  return (
    <Box m="20px">
      <Header title="Completed Complaints List" subtitle="View All the Resolved Complaints" />
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
        <DataGrid rows={completeData} columns={columns} getRowId={(row) => row.complain_no} />
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
        <ListItemText primary="Complaint Number" secondary={rows2.complain_no}/>
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
      <Divider variant="middle" component="li" />
      <Typography align="center" style={{ paddingTop: '10px' }} variant="h5" gutterBottom>
        Attachment
      </Typography>
    </List>
    <Card sx={{ maxWidth: 450 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="241"
          image="http://2.bp.blogspot.com/-ltqifwhtvgw/VQV4ZCtGYwI/AAAAAAAABk8/MGhvdarxoTo/s1600/New%2BElectric%2BMeters.jpg"
          alt="meter reading"
        />
      </CardActionArea>
    </Card>
          </Box>
        </Fade>
      </Modal>
      </Box>
    </Box>
  );
};
export default Completed;

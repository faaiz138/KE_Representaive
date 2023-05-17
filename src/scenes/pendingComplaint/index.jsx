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
import WorkIcon from '@mui/icons-material/Work';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DescriptionIcon from '@mui/icons-material/Description';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import React, { useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { Grid } from '@mui/material';
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
var extractedNames = [];
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
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  fontsize: 40,
  p: 2,
};
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFhaXphc2lmIiwiYSI6ImNsZXU3dHplMjA0aGkzd212YzRraWliNGgifQ.jyvKkbsdtxS_7EC_sxPDVg';

function ChildModal({ selectedSupervisorId, accountNo }) {
  const [open, setOpen] = useState(false);
  const [trackCordinates, setTrackCoordinates] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker1 = useRef(null);
  const marker2 = useRef(null);
  const directions = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3080/supervisor/getsupervisor/${selectedSupervisorId}/${accountNo}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTrackCoordinates(data);
        } else {
          // Handle error case
          console.log("Error: ", response.status);
        }
      } catch (error) {
        // Handle fetch error
        console.log("Fetch error: ", error);
      }
    };

    fetchData();
  }, [selectedSupervisorId, accountNo]);

  useEffect(() => {
    if (open) {
      if (!map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [67.0822, 24.9056], // Karachi coordinates
          zoom: 10,
        });
        directions.current = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving-traffic',
            alternatives:true,
            interactive: false,
          });
        }
        map.current.addControl(directions.current, 'top-right');
        directions.current.setOrigin([parseFloat(trackCordinates.supervisor_latitude),parseFloat(trackCordinates.supervisor_longitude)]);
        directions.current.setDestination([parseFloat(trackCordinates.consumer_longitude),parseFloat(trackCordinates.consumer_latitude)]);
        directions.current.on('route', () => {
          // Hide the markers when a route is displayed
          marker1.current.remove();
          marker2.current.remove();
        });
    } else {
      if (map.current) {
        map.current.remove();
        map.current = null;
        marker1.current = null;
        marker2.current = null;
      }
    }
  }, [open]);

  return (
    <>
      <Button
        sx={{ height: 30, marginTop: '16px', backgroundColor: 'darkgreen' }}
        onClick={handleOpen}
      >
        Track
      </Button>
      {open && (
        <Box sx={{ height: '50%', width: '100%' }}>
          <Box
            sx={{ height: 'calc(57vh - 50px)', width: '100%' }}
            ref={mapContainer}
          />
           <Button
          sx={{ height: 30, marginTop: '16px', backgroundColor: 'darkgreen' }}
          onClick={handleClose}
          >Close Map</Button>
        </Box>
      )}
    </>
  );
}

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [billOpen,setbillOpen] = useState(false);
  const [nameData,setNameData] = useState([])
  const [personName, setPersonName] = useState([]);
  const [count,setCount] = useState(0)
  const [selectedSupervisorId, setSelectedSupervisorId] = useState('');

  useEffect(() => {
    extractedNames = []
    fetch("http://localhost:3080/Supervisor/getsupervisor",{   method: "GET", 
    'credentials': 'include',
     headers: new Headers({
         'Accept': 'application/json',
         'Access-Control-Allow-Origin':'http://localhost:3000/',
         'Content-Type': 'application/json',
 })

})
      .then((data) => data.json())
      .then((data) => setNameData(data))
  }, [])
  
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
      headerName: 'Delete',
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
    if(id.complain_type==='Voltage Complaint' || id.complain_type==='Faulty Meter' || id.complain_type==='Phase Complaint' ||  id.complain_type==='Supply OFF/PMT Complaint')
    {
      setOpen(true)
    }
    else{
      setbillOpen(true)
    }
    setRows(id)
    if(count<1)
    {
      setCount(2)
      for(let i=0;i<nameData.length;i++)
        {
          const row = nameData[i];
          const name = `${row.first_name} ${row.last_name}`;
          const supervisorId = row.supervisor_id; // Get the supervisor ID from the nameData object
          extractedNames.push({ name, supervisor_id: supervisorId });
        }
      }
      
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
    }   
  }
  const handleAssignClick = async (complainNo, supervisorId,consumer_id) => {
    console.log('Consumer: ',consumer_id)
    try {
      const url = `http://localhost:3080/supervisor/assigning_supervisor_complain_status/${supervisorId}/${complainNo}`;

      const data = {}; // Initialize the data variable with the appropriate initial value

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        window.alert('Supervisor Assigned!');
        window.location.reload(); // Refresh the page
      }

      const responseData = await response.json();
      //console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    console.log(consumer_id)
    axios.post(`https://app.nativenotify.com/api/indie/notification`, 
    {      
        subID: `${consumer_id}`,      
        appId: 7970,      
        appToken: 'mHLXubAX3j2dGUFOb7IG7h',      
        title: 'Complain In-Progress',      
        message: `Supervisor has been assigned to your Complain Number: ${complainNo}` 
      });
  };
  useEffect(() => {
    fetch("http://localhost:3080/employee_complain/getpendingcomplains",{   method: "GET", 
    'credentials': 'include',
     headers: new Headers({
         'Accept': 'application/json',
         'Access-Control-Allow-Origin':'http://localhost:3000/',
         'Content-Type': 'application/json',
          })})
      .then((data) => data.json())
      .then((data) => setTableData(data))

      }, [])
  const handleBillClose = () => setbillOpen(false);
  const handleClose = () => setOpen(false);
  return (
    <Box m="20px">
      <Header title="Pending Complaint List" subtitle="Managing New Complaints" />
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
          <Grid container>
        <Grid item xs={6} sx={{ paddingRight: '16px' }}>
          <List sx={{ width: '100%', maxWidth: 360 }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <NumbersIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Complain Number" secondary={rows.complain_no}/>
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
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Consumer ID" secondary={rows.consumer_id} />
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
    </List>

    <Stack spacing={2} direction="row">
    <FormControl sx={{ width: 350 }}>
    <InputLabel id="demo-multiple-name-label">Assign Supervisors</InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput label="Assign Supervisors" />}
      MenuProps={MenuProps}
    >
      {extractedNames.map((item) => (
        <MenuItem
          key={item.name}
          value={item.name}
          style={getStyles(item.name, personName, theme)}
          onClick={() => setSelectedSupervisorId(item.supervisor_id)}
        >
          {item.name}
        </MenuItem>    
      ))}
    </Select>
  </FormControl>
  <Button
      sx={{ height: 50, backgroundColor: 'black', marginTop: 10 }}
      variant="contained"
      color="primary"
      onClick={() => handleAssignClick(rows.complain_no, selectedSupervisorId,rows.consumer_id)}
    >
      Assign
    </Button>
      </Stack>
      </Grid>
      <Divider sx={{ margin: '16px 0', backgroundColor: 'black'  }} />
      <Grid item xs={6} sx={{ paddingLeft: '16px' }}>
      <ChildModal selectedSupervisorId={selectedSupervisorId} accountNo={rows.account_no} />
          </Grid>
      </Grid>
      
          </Box>
        </Fade>
      </Modal>
      <Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={billOpen}
  onClose={handleBillClose}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Update modal styles
>
  <Fade in={billOpen}>
    <Box sx={{ position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '26%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  fontsize: 40,
  p: 2,}}>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <NumbersIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Complaint Number" secondary={rows.complain_no} />
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
              <PermIdentityIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Account Number" secondary={rows.account_no} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DescriptionIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Complain Details" secondary={rows.details} />
        </ListItem>
        <Divider variant="middle" component="li" />
        <Typography align="center" style={{ paddingTop: '10px' }} variant="h5" gutterBottom>
          Attachment
        </Typography>
      </List>
      <Card sx={{ maxWidth: 360, mt: 2 }}> {/* Updated maxWidth */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="241"
            image="http://2.bp.blogspot.com/-ltqifwhtvgw/VQV4ZCtGYwI/AAAAAAAABk8/MGhvdarxoTo/s1600/New%2BElectric%2BMeters.jpg"
            alt="meter reading"
          />
        </CardActionArea>
      </Card>
      {console.log(rows.complain_no)}
      <Link
      to={`/dashboard/complaint/completed/resolve?accountNo=${rows.account_no}&complainNo=${rows.complain_no}&complainType=${rows.complain_type}&details=${rows.details}`}
      >
      <Button sx={{ mt: 2, width: '100%', maxWidth: 360 }} variant="contained" color="success">
        Resolve
      </Button>
        </Link>
    </Box>
  </Fade>
</Modal>
      </Box>
    </Box>
  );
};
export default FAQ;

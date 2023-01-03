import { Box, Button, TextField,AlertTitle } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions,Typography,Alert } from '@mui/material';
import Header from "../../components/Header";
import Stack from '@mui/material/Stack';
const Resolve = () => {

  return (
    <Box  sx={{ml:20}}>
      <Header title="Resolve Complaint" subtitle="Resolve Complaint Of Customer" />
      <Stack direction="row" spacing={20}>
      <Stack direction="column"
        justifyContent="space-evenly"
        spacing={1}>
      <TextField
        sx={{ width: 300,
        maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Account Number"
          defaultValue="514522"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 300,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Units Stored of Customer"
          defaultValue="15.51"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 300,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Supevisor Reading"
          defaultValue="6.94"
          InputProps={{
            readOnly: true,
          }}
        />
         <TextField
         sx={{ width: 300,
            maxWidth: '100%',gridColumn: "span 2",
            height:50}}
          id="filled-textarea"
          label="Enter New Reading"
          placeholder="Updated Value"
          multiline
          variant="filled"
        />
      </Stack>
      <Stack sx={{mt:3}} direction="column" spacing={2}>
      <Typography variant="h5" align="center" gutterBottom>
        Snapshot Provided by User
      </Typography>
         <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="https://fcache1.pakwheels.com/original/4X/5/2/d/52d9be6fda51427f9c1e0394aeaa77a349d9091a.jpg"
          alt="meter reading"
        />
      </CardActionArea>
    </Card>
    <Typography variant="h5" align="center" gutterBottom>
        Snapshot Provided by Supervisor
      </Typography>
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="http://2.bp.blogspot.com/-ltqifwhtvgw/VQV4ZCtGYwI/AAAAAAAABk8/MGhvdarxoTo/s1600/New%2BElectric%2BMeters.jpg"
          alt="meter reading"
        />
      </CardActionArea>
    </Card>
      </Stack>
      </Stack>
      <Button sx={{width:100,ml:10,height:40,display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}} variant="contained" color="success">
        Success
       </Button>
       <Box display="flex"  >
        { <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <strong>New Meter Reading Updated!</strong>
        </Alert>}
        </Box>
    </Box>
    
  );
};
export default Resolve;

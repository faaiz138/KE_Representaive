import { Box, Button, TextField,AlertTitle } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea, CardActions,Typography,Alert } from '@mui/material';
import Header from "../../components/Header";
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import {useEffect,useState} from 'react';
import Divider from '@mui/material/Divider';
const Resolve = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accountNo = parseInt(searchParams.get('accountNo'), 10);
  const complainNo = parseInt(searchParams.get('complainNo'), 10);
  const complainType = searchParams.get('complainType');
  const details = searchParams.get('details');
  const [billData,setbillData] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3080/account/get_bill_details/${accountNo}`, {
      method: "GET",
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json',
      }),
    })
      .then((data) => data.json())
      .then((data) => setbillData(data))
      .catch((error) => {
        console.error("Error fetching bill data:", error);
        // Handle the error or set a default value for billData
      });
  }, []);
  //console.log(billData[0]?.invoice_no || ""); // Access the value in the console
  let invoice =billData[0]?.invoice_no || ''
  let pay_status = billData[0]?.payment_status || ''
  let lastMonthReading = billData[0]?.last_month_reading || ''
  let currentMonthReading = billData[0]?.current_month_reading|| ''
  let dueDate = new Date(billData[0]?.due_date || '').toLocaleDateString()
  let Amount = billData[0]?.amount || ''
  const [billamount, setbillAmount] = useState('');
  const [updateReading, setupdateReading] = useState(billData[0]?.current_month_reading|| '');
  console.log(updateReading)
  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    setbillAmount(newAmount);
  };
  const handlereadingChange = (event) => {
    const newReading = event.target.value;
    setupdateReading(newReading);
  };
  const handleUpdateClick = () => {updateAmount(pay_status,billamount,updateReading);};

  const updateAmount = (pay_status,newAmount,updateReading) => {
    console.log(pay_status)
    console.log(newAmount)
    console.log(billData[0]?.due_date || '')
    console.log(updateReading)
    fetch(`http://localhost:3080/account/update_bill/${accountNo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({payment_status:pay_status,amount:newAmount !== "" ? newAmount : (billData[0]?.amount || ''),due_date:billData[0]?.due_date || '',current_month_reading: updateReading !== "" ? updateReading : (billData[0]?.current_month_reading || '') })
    })
      .then(response => {
        if (response.ok) {
          console.log("Successfully Updated!");
          window.alert("Successfully Updated!");
          window.location.reload(); // Refresh the page
          
          return response.json();
        } else {
          throw new Error("Query failed!");
        }
      })
      
      .then(data => {
        // Handle the updated bill data
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
      
  }
  return (
    <Box  sx={{ml:10}}>
      <Header title="Resolve Complaint" subtitle="Resolve Complaint Of Customer" />
      <Stack direction="row" spacing={6}>
      <Stack direction="column"
        justifyContent="space-evenly"
        >
      <Typography variant="h2" sx={{color: "black", fontSize: "2.2rem" }}>
      Complaint data
      </Typography>
      <TextField
        sx={{ width: 300,
        maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Account Number"
          defaultValue={accountNo}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 300,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Complain Number"
          defaultValue={complainNo}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 300,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Complain Typle"
          defaultValue={complainType}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
      multiline
      id="outlined-read-only-input"
      label="Details"
      defaultValue={details}
      InputProps={{
        readOnly: true,
      }}
    />

      </Stack>
      <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
      <Stack direction="column"
        justifyContent="space-evenly"
        >
      <Typography variant="h2" sx={{ mb:4,color: "black", fontSize: "2.2rem",bottom:'30px' }}>
      Bill data
      </Typography>
      <TextField
        sx={{ width: 200,
        maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Invoice Number"
          value= {invoice}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 200,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Payment Status"
          value={pay_status}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 200,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Last Month Reading"
          value={lastMonthReading}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 200,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Current Month Reading"
          value={currentMonthReading}
          InputProps={{
            readOnly: true,
          }}
        />
         <TextField
          sx={{ width: 200,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Due Date"
          value={dueDate}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          sx={{ width: 200,
            maxWidth: '100%'}}
          id="outlined-read-only-input"
          label="Amount "
          value={Amount}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
      <Stack direction="column"
        >
      <Typography variant="h2" sx={{ mb:10,color: "black", fontSize: "2.2rem",bottom:'50px' }}>
      Make Updates
      </Typography>
      <TextField
          id="outlined-number"
          label="Amount"
          sx={{marginBottom:4}}
          type="number"
          onChange={handleAmountChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      <TextField
          id="outlined-number"
          label="New Meter Reading"
          type="number"
          onChange={handlereadingChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="caption" sx={{ fontSize: "0.8rem", maxWidth: 300,marginTop:3 }}>
        The units on Record are {currentMonthReading}. Per Unit Rate is Rs28.
        Additional Surcharge is at Rs 3.82 Per Unit. The Electricity Duty is at Rs 225 & Sales Tax is at Rs 2,746.
        <Box component="span" sx={{ fontWeight: 'bold', maxWidth: 300 }}>
          The Bill Amount should be 28*{currentMonthReading} + 3.82*{currentMonthReading} + 225 + 2746 = {(28 * currentMonthReading) + (3.82 * currentMonthReading) + 225 + 2746}.
        </Box>
         Make Changes if there is a Difference in Bill Amount and Actual Bill Due
      </Typography>
      <Button
        sx={{
          width: 100,
          marginLeft: 8, // Adjust this value to move the button towards the right
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4
        }}
        onClick={handleUpdateClick}
        variant="contained"
        color="success"
      >
        Update
      </Button>
      </Stack>
      <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
      <Stack sx={{mt:2}} direction="column" spacing={1}>
      <Typography variant="h2" align="center" sx={{ mb:4,color: "black", fontSize: "2.2rem",bottom:'30px' }}>
      Reference
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Snapshot Provided by User
      </Typography>
         <Card sx={{ maxWidth: 300 }}>
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
    <Card sx={{ maxWidth: 300 }}>
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
      <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
      </Stack>
      <Divider flexItem sx={{backgroundColor: '#000000'}}/>
    </Box>
    
  );
};
export default Resolve;

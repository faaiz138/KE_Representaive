import { Box, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import {CardActionArea, CardActions,Typography,Alert } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Autocomplete, TextField } from '@mui/material';
const BillGeneration = () => {
  const [accountlist, setAccountList] = useState([]);
  const [value, setValue] = useState(null);
  const [displayItems, setDisplayItems] = useState(false);
  const [billamount, setbillAmount] = useState(null);
  const [dueData,setDueDate] = useState(null);
  const [currentMonthReading,setCurrentMonthReading] = useState(null);
  const [billMonthYear,setbillmonthYear] = useState(null);
  const [invoiceNumber,setinvoiceNumber] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const handleAmountChange = (event) => {
    const newAmount = parseInt(event.target.value);
    setbillAmount(newAmount);
  };
  const handleduedateChange = (event) => {
    const new_date = event.target.value;
    setDueDate(new_date);
  };
  const handlecurrentmonthChange = (event) => {
    const newcurrentmonth = parseInt(event.target.value);
    setCurrentMonthReading(newcurrentmonth);
  };
  const handlebillmonthyearChange = (event) => {
    const newbillmonthyear = event.target.value;
    setbillmonthYear(newbillmonthyear);
  };
  const handleinvoiceChange = (event) => {
    const newInvoice = parseInt(event.target.value);
    setinvoiceNumber(newInvoice);
  };
  const handleUpdateClick = () => {
    if (!billamount || !dueData || !invoiceNumber || !currentMonthReading || !billMonthYear || !value) {
      setValidationError("All fields are required");
        window.alert('All fields are required"');
        window.location.reload(); // Refresh the page
    } else if (billamount < 0 || currentMonthReading < 0) {
      setValidationError("Amount and current month reading cannot be negative");
      window.alert('Amount and current month reading cannot be negative');
        window.location.reload(); // Refresh the page
    } else {
      setValidationError(null);
    }
    generatebill(billamount,dueData,invoiceNumber,currentMonthReading,billMonthYear,value.value);
  };
  const generatebill= (billamount,dueData,invoiceNumber,currentMonthReading,billMonthYear,account_no) => {
    console.log(invoiceNumber)
    fetch(`http://localhost:3080/account/generation_new_bill/${account_no}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount:billamount,due_date:dueData,invoice_no:invoiceNumber,current_month_reading:currentMonthReading,bill_month_year:billMonthYear})
    })
      .then(response => {
        if (response.ok) {
          console.log("Successfully Generated");
          window.alert("Successfully Generated");
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
      });}
  useEffect(() => {
    fetch("http://localhost:3080/account/search_all_accounts", {
      method: "GET",
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Content-Type': 'application/json',
      })
    })
      .then((data) => data.json())
      .then((data) => setAccountList(data))
      .catch((error) => {
        console.error("Error fetching account list:", error);
      });
  }, []);
  const handleAccountSelection = (event, newValue) => {
    setValue(newValue);
    setDisplayItems(true);
  };
  function generateInvoiceNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString();
    let invoiceNumber = timestamp + random;
    invoiceNumber = invoiceNumber.slice(5, 10)
    invoiceNumber = parseInt(invoiceNumber)
    return invoiceNumber;
  }
  return (
    <div>
      <Header title="Bill Genration" subtitle="Generating Bill of Customer" />
      {accountlist.length > 0 ? (
        <Autocomplete
          value={value}
          onChange={handleAccountSelection}
          options={accountlist.map((account) => ({
            label: String(account.account_no), // Convert to string
            value: account.account_no,
          }))}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Select Account Number" variant="outlined" />
          )}
          isOptionEqualToValue={(option, value) => option.value === value?.value}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              String(option.label).toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
          renderOption={(props, option) => (
            <li {...props}>{option.label}</li>
          )}
          ListboxProps={{
            style: {
              maxHeight: '200px',
              overflowY: 'auto',
            },
          }}
        />
      ) : (
        <p>Loading account list...</p>
      )}
      {displayItems && ( 
      <Stack direction="row" spacing={12} sx={{marginLeft:36,marginTop:10}}>
      <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
      <Stack direction="column"
        justifyContent="space-evenly"
        >
      <TextField
          id="outlined-number"
          label="Amount"
          sx={{marginBottom:4}}
          onChange={handleAmountChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Due Date"
          sx={{marginBottom:4}}
          onChange={handleduedateChange}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
          <TextField
          id="outlined-number"
          label="Invoice Number"
          sx={{ marginBottom: 4 }}
          onChange={handleinvoiceChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
  </Stack>
  <Divider orientation="vertical" flexItem sx={{ backgroundColor: "#000000" }} />
  <Stack direction="column" justifyContent="space-evenly">
    <TextField
      id="outlined-number"
      label="Current Month Reading"
      sx={{ marginBottom: 4 }}
      onChange={handlecurrentmonthChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      id="outlined-number"
      label="Bill Month Year"
      sx={{ marginBottom: 4 }}
      onChange={handlebillmonthyearChange}
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
    />
    </Stack>
    <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
        </Stack>
        )
        }
        <Divider orientation="vertical" flexItem sx={{backgroundColor: '#000000'}}/>
        <Divider flexItem sx={{backgroundColor: '#000000',width:'50.8%',marginLeft:36}}/>
        {displayItems &&<Button
        sx={{
          width: 100,
          marginLeft: 75, // Adjust this value to move the button towards the right
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
        Generate Bill
      </Button>
    }
      </div>
    );
  };
export default BillGeneration;

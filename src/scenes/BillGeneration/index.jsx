import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const BillGeneration = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  return (
    <Box m="10px">
      <Header title="Bill Generation" subtitle="Generate and Pay Bill" />
    <div style={{border: 2+ "px solid #e0e0e0", overflow: "hidden", margin: 30+"px auto", 
    maxWidth: 1120+"px",borderRadius: 10+"px"}}>
    <iframe allowtransparency="true" scrolling="no" src="https://www.ke.com.pk/customer-services/billls-and-e-payments/" 
    style={{border: 0+"px none", marginLeft: -200+"px", height: 1460+"px", marginTop: -770+"px", width: 1325+"px",backgroundColor:"#e0e0e0"}}>
    </iframe>
    </div>
    </Box>
  );
};

export default BillGeneration;

import { Box, Button, TextField,AlertTitle } from "@mui/material";
import { useState} from "react"
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Alert from '@mui/material/Alert';
import axios from "axios";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
const Form = () => {
  const [submit,setSubmit] = useState(false)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values) => {
    let fname = values.firstname
    let lname = values.lastname
    let mail = values.email
    let num = values.contact
    let nic = values.cnic
    let pw = values.password

    const json = JSON.stringify(values);
    console.log(json)
    try {
      const res = await axios.post("http://localhost:3080/Supervisor/create_supervisor", {
        email: mail,
        password : pw,
        firstname : fname,
        lastname : lname,
        contact_no : num,
        cnic : nic
      },
      {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        withCredentials:true,
    })
      
      .then(function(res){
        if(res.status===200)
        {
          setSubmit(true);
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Create Supervisor Profile" subtitle="Add a New Supervisor/Driver Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cnic"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cnic}
                name="cnic"
                error={!!touched.cnic && !!errors.cnic}
                helperText={touched.cnic && errors.cnic}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                type="file"
                sx={{ gridColumn: "span 2" }}
                accept="image/*"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <div>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                          <PhotoCameraIcon />
                      </label>
                    </div>
                  ),
                }}
              />   
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="success" variant="contained">
                Create New User
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" mt="30px">
            { submit &&  <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>User Account Created!</strong>
            </Alert>}
            </Box>
          </form>
        )
        }
      </Formik>
    </Box>
    
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstname: yup.string().required("required"),
  lastname: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required")
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits'),
  cnic: yup.string().required("required").min(13, 'Must be exactly 13 digits')
  .max(13, 'Must be exactly 13 digits'),
});
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password : "",
  contact: "",
  cnic: "",
};

export default Form;

import { useState,useEffect } from "react"
import {Navigate, useNavigate} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import logo from './LOGO.png'
import './login.css'
function Login(){
    const initialValues = { email: "", password: ""};
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    const [iscaptcha,setIsCaptcha] = useState(false)
    const [isSubmit,setIsSubmit] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState()
    const navigate = useNavigate();
    const handleChange = (e) => {
    
        const {name,value} = e.target;
        if(e.target.type==='email')
        {
            setEmail(e.target.value)
        }
        else{
            setPassword(e.target.value)
        }
        setFormValues({ ...formValues, [name]:value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setFormErrors(validate(formValues)); 
        setIsCaptcha(true);
        setIsSubmit(true);

        try {
            const res = await axios.post("http://localhost:3080/employee/login", {
              email:email,
              password: password,
            },
            {
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                withCredentials:true,
            }
            )
            //localStorage.setItem("user", JSON.stringify(res.data.user));
            //navigate("/home");
            .then(function(res){
                console.log(res)
                navigate("/dashboard");
            })
          } catch (error) {
            console.log(error);
            const errorMsg = error.response.data.error;
          }
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          ;
        }
      }, [formErrors]);
    useEffect(()=> {
        if(localStorage.getItem('user-info')){
            navigate("/dashboard")
        }
    })
    async function login()
    {
        let item = {email,password};
        console.log(email)
        console.log(password)
        /*let result = await fetch("http://localhost:3080/employee/login",{   
            mode: 'no-cors',
            method:'POST',
            headers : {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password":password
            })
        });
        result = await result.json();
        console.log(result.data)*/
        //localStorage.setItem("user-info",JSON.stringify(result))
        //navigate("/dashboard")
    }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email)
        {
            errors.email = "Email is required!";
        } 
        else if (!regex.test(values.email))
        {
            errors.email = "This is not a valid email format!";
        }
        if(!values.password) 
        {
            errors.password = "Password is required";
        } 
        else if (values.password.length < 4)
        {
            errors.password = "Password must be more than 4 characters";
        }
        else if (values.password.length > 10) 
        {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    }
    return(
        <div className="container">
            <img src={logo} alt="Logo" height="200vh" />
            <form onSubmit={handleSubmit}>
                <h1>KE Login</h1>
                <div className="ui divider"></div>
                <div className="ui form">
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label>Email </label>
                        <input type="email" name="email" placeholder="Email" value = {formValues.email} onChange={handleChange}/>
                    </div>
                    <div className="field">
                    <p>{formErrors.password}</p>
                        <label>Password </label>
                        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </div>
                    <div className="captcha">
                    <ReCAPTCHA
                    sitekey="6LeEHGoiAAAAABNDVxwQ-o6kX2n_mm1YhD5fFYPP"
                    onChange={handleChange}/>
                    </div>
                    <button onClick={login} className="fluild ui button blue">Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login
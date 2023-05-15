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
    const [res,setRes]= useState(false)
    const [isSubmit,setIsSubmit] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState()
    const navigate = useNavigate();
    function handleCaptcha(){
        setIsCaptcha(true)
    }
    const handleChange = (e) => {
    
        const {name,value} = e.target;
        if(e.target.type==='email')
        {
            setEmail(e.target.value)
            localStorage.setItem('loggedInUserEmail', e.target.value);
        }
        else{
            setPassword(e.target.value)
        }
        setFormValues({ ...formValues, [name]:value});
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        var errors = validate(formValues,res,iscaptcha)
          
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
                if(res.status===200)
                {
                    setRes(true);
                }
                if(res.status===200 && iscaptcha===true)
                {
                    localStorage.setItem("auth", JSON.stringify(res.data));
                    navigate("/dashboard/home");
                }
                console.log(res.data)
            })
          } catch (error) {
            console.log(error);
            const errorMsg = error.response.data.error;
          }
          errors = validate(formValues,res,iscaptcha)
          setFormErrors(errors); 
          setIsSubmit(true);
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
        let item = {email,password}
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
    const validate = (values,res,capt) => {
        const errors = {};
        console.log(res)
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
        if(res===false)
        {
            errors.password = "Incorrent username or Password";
        }
        if(capt===false)
        {
            errors.captcha = 'Incorrect Recaptcha.'
        }
        return errors;
    }
    return(
        <div className="Login">
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
                        <label>Password </label>
                        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.password}</p>
                    <div className="captcha">
                    <ReCAPTCHA
                    sitekey="6LeEHGoiAAAAABNDVxwQ-o6kX2n_mm1YhD5fFYPP"
                    onChange={handleCaptcha}/>
                    </div>
                    <p>{formErrors.captcha}</p>
                    <button onClick={login} className="fluild ui button yellow">Login</button>
                </div>
            </form>
        </div>
        </div>
    )
}
export default Login
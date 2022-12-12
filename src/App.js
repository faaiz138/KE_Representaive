import MainDashboard from './pages/MainDashboard/MainDashboard';
import Homepage from '../src/pages/Homepage/Homepage'
import Login from './pages/Login/login';
import {Routes, Route,Navigate,useNavigate } from "react-router-dom";
import Dashboard from "../src/scenes/dashboard/index";
import Team from "../src/scenes/form/index";
import FAQ from "../src/scenes/faq";
import BillGeneration from "../src/scenes/BillGeneration/index";
import Form from "../src/scenes/form";
import Chat from "../src/scenes/chat/Chat";
import Cookies from 'js-cookie'
function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/dashboard/" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>}>
              <Route path="/dashboard/home" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>}/>
              <Route path="/dashboard/team" element={<ProtectedRoute> <Team /> </ProtectedRoute>} />
              <Route path="/dashboard/bill" element={<ProtectedRoute><BillGeneration /></ProtectedRoute>} />
              <Route path="/dashboard/complaint" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="register" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="chat" element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  )
}
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("auth");
  console.log({user})
  if (user===null){
    Cookies.remove('auth')
    navigate("/");
  };
  return children;
};

export default App;

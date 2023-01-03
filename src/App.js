import MainDashboard from './pages/MainDashboard/MainDashboard';
import Homepage from '../src/pages/Homepage/Homepage'
import Login from './pages/Login/login';
import {Routes, Route,Navigate,useNavigate } from "react-router-dom";
import Dashboard from "../src/scenes/dashboard/index";
import Team from "../src/scenes/form/index";
import FAQ from "../src/scenes/faq";
import Assigned from './scenes/assigned/assigned';
import BillGeneration from "../src/scenes/BillGeneration/index";
import Form from "../src/scenes/form";
import Maps from './scenes/maps/Maps';
import Chat from "../src/scenes/chat/Chat";
import Completed from './scenes/completed/completed';
import Resolve from './scenes/resolve/Resolve'
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
              <Route path="/dashboard/complaint/pending" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/dashboard/complaint/assigned" element={<ProtectedRoute><Assigned /></ProtectedRoute>} />
              <Route path="/dashboard/complaint/completed" element={<ProtectedRoute><Completed/></ProtectedRoute>} />
              <Route path="/dashboard/complaint/completed/resolve" element={<ProtectedRoute><Resolve/></ProtectedRoute>} />
              <Route path="register" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/dashboard/tracking" element={<ProtectedRoute><Completed /></ProtectedRoute>} />
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

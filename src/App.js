import MainDashboard from './pages/MainDashboard/MainDashboard';
import Sidebar from './scenes/global/Sidebar';
import Homepage from '../src/pages/Homepage/Homepage'
import Login from './pages/Login/login';
import {Routes, Route } from "react-router-dom";
import Dashboard from "../src/scenes/dashboard/index";
import Team from "../src/scenes/form/index";
import FAQ from "../src/scenes/faq";
import BillGeneration from "../src/scenes/BillGeneration/index";
import Form from "../src/scenes/form";
import Chat from "../src/scenes/chat/Chat"

function App() {


  return (
    <div className="App">
      <Routes>
      <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/dashboard" element={<MainDashboard />}>
              <Route path="/dashboard/home" element={<Dashboard />} />
              <Route path="/dashboard/team" element={<Team />} />
              <Route path="/dashboard/bill" element={<BillGeneration />} />
              <Route path="/dashboard/complaint" element={<FAQ />} />
              <Route path="register" element={<Form />} />
              <Route path="chat" element={<Chat/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;

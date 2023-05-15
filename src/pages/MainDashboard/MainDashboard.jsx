import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Topbar from '../../scenes/global/Topbar';
import Sidebar from "../../scenes/global/Sidebar";
import Dashboard from "../../scenes/dashboard";
import Team from "../../scenes/supervisorList";
import BillGeneration from "../../scenes/BillGeneration";
import Form from "../../scenes/form";
import AssignedComplaint from "../../scenes/assigned/assigned";
import FAQ from "../../scenes/pendingComplaint";
import Tracking from "../../scenes/maps/Maps"
import Chat from "../../scenes/chatSupervisor/Chat"
import CustomerChat from '../../scenes/customerChat/Chat'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../theme";
import CompletedComplaint from '../../scenes/completedComplains/completed'
import Resolve from '../../scenes/resolve/Resolve'
import 'bootstrap/dist/css/bootstrap.min.css'
function MainDashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="home" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="bill" element={<BillGeneration />} />
              <Route path="register" element={<Form />} />
              <Route path="complaint/pending" element={<FAQ />} />
              <Route path="complaint/assigned" element={<AssignedComplaint />} />
              <Route path="complaint/completed" element={<CompletedComplaint />} />
              <Route path="complaint/completed/resolve" element={<Resolve />} />
              <Route path="tracking" element={<Tracking />} />
              <Route path="chat" element={<Chat/>} />
              <Route path="chatCustomer" element={<CustomerChat/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MainDashboard;

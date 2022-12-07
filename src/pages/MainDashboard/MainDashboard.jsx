import { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Topbar from '../../scenes/global/Topbar';
import Sidebar from "../../scenes/global/Sidebar";
import Dashboard from "../../scenes/dashboard";
import Team from "../../scenes/team";
import Invoices from "../../scenes/invoices";
import BillGeneration from "../../scenes/BillGeneration";
import Bar from "../../scenes/bar";
import Form from "../../scenes/form";
import Line from "../../scenes/line";
import FAQ from "../../scenes/faq";
import Chat from "../../scenes/chat/Chat"
import Geography from "../../scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../theme";
import Calendar from "../../scenes/calendar/calendar";
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
              <Route path="/invoices" element={<Invoices />} />
              <Route path="register" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="complaint" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="chat" element={<Chat/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MainDashboard;

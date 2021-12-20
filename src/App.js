import PrimarySearchAppBar from "./components/appbar";
import React from "react";
// import Routers from "./router";
import { SitesProvider } from "./contexts/sites";
import { CurrentSiteProvider } from "./contexts/currentsite";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import LogIn from "./pages/login";
import EditSite from "./pages/editsite";
import ShowSite from "./pages/showsite";
import Accountsettings from "./pages/accountsettings/Accountsettings";

function App() {
  return (
    <Router>
      <SitesProvider>
        <CurrentSiteProvider>
          <PrimarySearchAppBar />
          {/* <Routers /> */}
        </CurrentSiteProvider>
      </SitesProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/showsite/:id" element={<ShowSite />} />
        <Route path="/editsite/:id" element={<EditSite />} />
        <Route path="/editsite" element={<EditSite />} />
        <Route path="/accountsettings" element={<Accountsettings />} />
      </Routes>
    </Router>
  );
}

export default App;

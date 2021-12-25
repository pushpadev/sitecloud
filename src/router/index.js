import React from 'react';
import PrimarySearchAppBar from '../components/appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home';
import AccountSettings from '../pages/accountsettings';
import LogIn from '../pages/login';
import ForgotPassWord from "../pages/forgotPassWord"
import EditSite from '../pages/editsite';
import ShowSite from '../pages/showsite';
import LiveAttendence from "../pages/liveAttendence"

import ProtectedRoutes from "./ProtectedRoutes"

const Routers = () => {
  return (
    <Router>
      <PrimarySearchAppBar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<LogIn/>}/>
        <Route exact path="/showsite/:id" element={<ShowSite/>}/>
        <Route exact path="/showsite/accountsetting/:id" element={<ShowSite/>}/>
        <Route exact path="/editsite/:id" element={<EditSite/>}/>
        <Route exact path="/editsite" element={<EditSite/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
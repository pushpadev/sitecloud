import React from 'react';
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
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/forgot_password" element={<ForgotPassWord />} />

          <Route element={<ProtectedRoutes />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/liveAttendence" element={<LiveAttendence />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/showsite/:id" element={<ShowSite />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/editsite/:id" element={<EditSite />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/editsite" element={<EditSite />} />
          </Route>

        </Routes>
      </Router>
    </>
  );
}

export default Routers;
import React from 'react';
// import PrimarySearchAppBar from '../components/appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home';
import LogIn from '../pages/login';
import EditSite from '../pages/editsite';
import ShowSiteLayout from '../pages/showsitelayout';
import AccountSetting from '../components/account';
import LiveAttendence from '../components/showsite/liveattendence';
import ForgotPassWord from "../pages/forgotPassWord"
import ProtectedRoutes from "./ProtectedRoutes"


function Routers() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/forgot_password" element={<ForgotPassWord />} />

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/home" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/accountsetting" element={
            <ShowSiteLayout>
              <AccountSetting />
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/attendence/:id" element={
            <ShowSiteLayout>
              Attendence
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/attendence/:type/:id" element={
            <ShowSiteLayout>
              <LiveAttendence />
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/managesite/:id" element={
            <ShowSiteLayout>
              Manage Site
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/inductions/:id" element={
            <ShowSiteLayout>
              Inductions
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/briefing/:id" element={
            <ShowSiteLayout>
              Pre-Start and Daily Briefing
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>

          <Route exact path="/showsite/notice/:id" element={
            <ShowSiteLayout>
              Safety and Notices
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/workmethod/:id" element={
            <ShowSiteLayout>
              Safety Work Method Statements
            </ShowSiteLayout>
          } />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/permits/:id" element={
            <ShowSiteLayout>
              Site Permits
            </ShowSiteLayout>
          } />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/showsite/hazard/:id" element={
            <ShowSiteLayout>
              Hazard and Issues
            </ShowSiteLayout>
          } />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/editsite/:id" element={<EditSite />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/editsite" element={<EditSite />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routers;
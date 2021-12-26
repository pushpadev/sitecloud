import React from 'react';
import PrimarySearchAppBar from '../components/appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home';
import LogIn from '../pages/login';
import EditSite from '../pages/editsite';
import ShowSiteLayout from '../pages/showsitelayout';
import AccountSetting from '../components/account';
import LiveAttendence from '../components/showsite/liveattendence';

function Routers() {
  return (
    <Router>
      <PrimarySearchAppBar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<LogIn/>}/>
        <Route exact path="/showsite/accountsetting" element={
          <ShowSiteLayout>
            <AccountSetting />
          </ShowSiteLayout>
        }>
        </Route>
        <Route exact path="/showsite/attendence/:id" element={
          <ShowSiteLayout>
            Attendence
          </ShowSiteLayout>
        }/>
        <Route exact path="/showsite/attendence/:type/:id" element={
          <ShowSiteLayout>
            <LiveAttendence />
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/managesite/:id" element={
          <ShowSiteLayout>
            Manage Site
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/inductions/:id" element={
          <ShowSiteLayout>
            Inductions
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/briefing/:id" element={
          <ShowSiteLayout>
            Pre-Start and Daily Briefing
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/notice/:id" element={
          <ShowSiteLayout>
            Safety and Notices
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/workmethod/:id" element={
          <ShowSiteLayout>
            Safety Work Method Statements
          </ShowSiteLayout>
        }/>

        <Route exact path="/showsite/permits/:id" element={
          <ShowSiteLayout>
            Site Permits
          </ShowSiteLayout>
        }/>
        <Route exact path="/showsite/hazard/:id" element={
          <ShowSiteLayout>
            Hazard and Issues 
          </ShowSiteLayout>
        }/>
        <Route exact path="/editsite/:id" element={<EditSite/>}/>
        <Route exact path="/editsite" element={<EditSite/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
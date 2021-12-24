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
        <Route exact path="/showsite/accountsetting/:id" element={
          <ShowSiteLayout>
            <AccountSetting />
          </ShowSiteLayout>
        }>
        </Route>
        <Route exact path="/showsite/attendence/:id" element={
          <ShowSiteLayout>
            <LiveAttendence />
          </ShowSiteLayout>
        }/>
        <Route exact path="/showsite/managesite/:id" element={
          <ShowSiteLayout>
            {/* <LiveAttendence /> */}
          </ShowSiteLayout>
        }/>
        <Route exact path="/editsite/:id" element={<EditSite/>}/>
        <Route exact path="/editsite" element={<EditSite/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
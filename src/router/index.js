import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/home';
import LogIn from '../pages/login';
import EditSite from '../pages/editsite';
import ShowSite from '../pages/showsite';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/login" element={<LogIn/>}/>
        <Route exact path="/showsite/:id" element={<ShowSite/>}/>
        <Route exact path="/editsite/:id" element={<EditSite/>}/>
        <Route exact path="/editsite" element={<EditSite/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;
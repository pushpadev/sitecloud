import React, { useState } from 'react';
import PrimarySearchAppBar from '../components/appbar';
import PolygonMap from '../components/polygonmap';
import { makeStyles } from '@mui/styles';
// import GmailTreeView from '../components/gmailtreeview';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

});

function ShowSite() {
  const classes = useStyles();

  return (
      <>
        <PrimarySearchAppBar/>
        <div className = {classes.root} >
            {/* <GmailTreeView /> */}
        </div>
      </>
  );
}

export default ShowSite;

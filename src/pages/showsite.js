import React, { useState, useRef } from 'react';
import PolygonMap from '../components/polygonmap';
import { makeStyles } from '@mui/styles';
import { SetupSiteBar } from '../components/setup';
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
        <div className = {classes.root} >
            Show Site
        </div>
      </>
  );
}

export default ShowSite;

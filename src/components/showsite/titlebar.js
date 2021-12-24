import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '193px !important',
    padding: '21px 0px 0px 23px',
    backgroundColor: 'white',
    color: '#33323D',
  },

  title: {
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: 700,
  },

  address: {
      fontSize: 13,
      fontStyle: 'bold',
      fontWeight: 700,
      marginTop: 5,
  },
  numberline: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
  },

  number: {
    display: 'flex',
    flexDirection: 'column',
  },

  progress: {
    display: 'flex',
    flexDirection: 'row',
    height: 13,
    width: 465,
    marginTop: 16,
  }
});

function AttendenceTitle({siteInfo}) {
  const classes = useStyles();
  // {`Site Attendence: ${siteInfo?.Sitename}`}
  // {`address: ${siteInfo?.Siteaddress}`}
  return (
    <div className = {classes.root} >
        <div className={classes.title}>{`Site Attendence: Melbourne F1 Track`}</div>
        <div className={classes.address}>{`address: 12 Aughtie Dr, Albert Park VIC 3206, Australia`}</div>
        <div className={classes.numberline}>
            <div className={classes.number}>
                <div style = {{color: '#33323D', fontSize: 18}}>214</div>
                <div style = {{color: '#7A7A7A', fontSize: 12, marginTop: 5}}>People on site</div>
            </div>
            <div className={classes.number} style = {{marginLeft: 41}}>
                <div style = {{color: '#753AF4', fontSize: 18}}>199</div>
                <div style = {{color: '#753AF4', fontSize: 12, marginTop: 5}}>Workers</div>
            </div>
            <div className={classes.number} style = {{marginLeft: 38}}>
                <div style = {{color: '#EC4E86', fontSize: 18}}>15</div>
                <div style = {{color: '#EC4E86', fontSize: 12, marginTop: 5}}>Visitors</div>
            </div>
        </div>
        <div className={classes.progress}>
            <div style={{width: 404, backgroundColor: '#753AF4', borderRadius: 20}}></div>
            <div style={{width: 61, backgroundColor: '#EC4E86', borderRadius: 20}}></div>
        </div>
    </div>
  );
}

export default AttendenceTitle;

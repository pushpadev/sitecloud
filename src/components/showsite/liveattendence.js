import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import AttendenceTitle from './titlebar';
import { SHOWBAR_WIDTH } from '../../constant';
import EnhancedTable from './table';
import { useParams } from "react-router-dom";
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../../constant';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100vw - ${SHOWBAR_WIDTH}px - 10px)`,
    margin: '12px 12px',
  },
});

export default function LiveAttendence({siteInfo}) {
  const classes = useStyles();
  const { id } = useParams();
  const [clickedItem, setClickedItem] = useState('');

  useEffect(() => {
    console.log(id)
    if(id === '1'){
      setClickedItem(CLICK_ATTENDENCE_LIVE);
    }
    else{
      if(id === '2'){
        setClickedItem(CLICK_ATTENDENCE_DAILY);
      }
      else{
        setClickedItem(CLICK_ATTENDENCE_HISTORY);
      }
    }
  }, [id])
  return (
    <div className = {classes.root} >
      {console.log(clickedItem)}
        <AttendenceTitle siteInfo = {siteInfo} />
        <EnhancedTable clickedItem = {clickedItem}/>
    </div>
  );
}

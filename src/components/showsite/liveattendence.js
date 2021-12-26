import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import AttendenceTitle from './titlebar';
import { SHOWBAR_WIDTH } from '../../constant';
import EnhancedTable from './table';
import { useParams } from "react-router-dom";
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../../constant';
import { getSite} from '../../actions'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100vw - ${SHOWBAR_WIDTH}px - 10px)`,
    margin: '12px 12px',
  },
});

export default function LiveAttendence() {
  const classes = useStyles();
  const { type, id } = useParams();
  const [clickedItem, setClickedItem] = useState('');
  const [siteInfo, setSiteInfo] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(type === 'live'){
      setClickedItem(CLICK_ATTENDENCE_LIVE);
    }
    else{
      if(type === 'daily'){
        setClickedItem(CLICK_ATTENDENCE_DAILY);
      }
      else{
        setClickedItem(CLICK_ATTENDENCE_HISTORY);
      }
    }
  }, [type])

  useEffect(() => {
    (async () => {
      if(id !== undefined && id !== null){
        let res = await getSite(id);
        setSiteInfo(res?.data?.data);
      }
      setLoading(false);
    })()
    
  }, [id])

  return (
    <>
      {!isLoading && 
        <div className = {classes.root} >
          <AttendenceTitle siteInfo = {siteInfo} />
          <EnhancedTable clickedItem = {clickedItem}/>
        </div>
      }
    </>
  );
}

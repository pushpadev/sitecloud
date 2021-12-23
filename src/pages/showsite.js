import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import GmailTreeView from '../components/gmailtreeview';
import { useParams } from "react-router-dom";
import { getSite} from '../actions'
import LiveAttendence from '../components/showsite/liveattendence';
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../constant';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    overflow: 'auto',
  },

});

function ShowSite() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState({});
  const { id } = useParams();

  // Attendence
  const [clickedItem, setClickedItem] = useState(null);

  const liveAttendenceClick = () => {
    console.log('live');
    setClickedItem(CLICK_ATTENDENCE_LIVE);
  }

  const dailyAttendenceClick = () => {
    console.log('daily');

    setClickedItem(CLICK_ATTENDENCE_DAILY);
  }

  const historyAttendenceClick = () => {
    console.log('history');

    setClickedItem(CLICK_ATTENDENCE_HISTORY);
  }

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
            <GmailTreeView 
              siteName={siteInfo?.Sitename}
              liveAttendenceClick = {liveAttendenceClick}
              historyAttendenceClick = {historyAttendenceClick}
              dailyAttendenceClick = {dailyAttendenceClick}
            />
            {(clickedItem === CLICK_ATTENDENCE_DAILY || clickedItem === CLICK_ATTENDENCE_LIVE || clickedItem === CLICK_ATTENDENCE_HISTORY)?(
              <LiveAttendence 
                siteInfo = {siteInfo}
                clickedItem = {clickedItem}
              />
            ):(<></>)}
            
        </div>
      }
    </>
       
  );
}

export default ShowSite;

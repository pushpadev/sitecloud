import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import GmailTreeView from '../components/gmailtreeview';
import { useParams } from "react-router-dom";
import { getSite} from '../actions'
import LiveAttendence from '../components/showsite/liveattendence';
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../constant';
import AccountSetting from '../components/account';
import { ShowSiteContext } from '../contexts/showsite';

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
            />
            <AccountSetting />
            <LiveAttendence 
              siteInfo = {siteInfo}
            />
        </div>
      }
    </>
       
  );
}

export default ShowSite;

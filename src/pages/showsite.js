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
  const [isAccount, setIsAccount] = useState(false);
  const [siteId, setSiteId] =  useContext(ShowSiteContext);

  const { id } = useParams();

  // Attendence
  const [clickedItem, setClickedItem] = useState(null);

  const liveAttendenceClick = () => {
    setClickedItem(CLICK_ATTENDENCE_LIVE);
  }

  const dailyAttendenceClick = () => {

    setClickedItem(CLICK_ATTENDENCE_DAILY);
  }

  const historyAttendenceClick = () => {
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
    let pathName = window.location.pathname;
    if(pathName.indexOf('showsite/accountsetting/') >= 0){
      setIsAccount(true);
    }
    else{
      setIsAccount(false);
    }
    setSiteId(id);
  }, [id, setSiteId])

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
            {isAccount?(<AccountSetting />):(
              (clickedItem === CLICK_ATTENDENCE_DAILY || clickedItem === CLICK_ATTENDENCE_LIVE || clickedItem === CLICK_ATTENDENCE_HISTORY)?(
                <LiveAttendence 
                  siteInfo = {siteInfo}
                  clickedItem = {clickedItem}
                />
              ):(<></>)
            )}
        </div>
      }
    </>
       
  );
}

export default ShowSite;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import GmailTreeView from '../components/gmailtreeview';
import { useParams } from "react-router-dom";
import { getSite, saveSite, modifySite} from '../actions'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

});

function ShowSite() {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [siteInfo, setSiteInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if(id !== undefined && id !== null){
        let res = await getSite(id);
        setSiteInfo(res.data);
      }
      setLoading(false);
    })()
  }, [id])

  return (
      <>
        {!isLoading && 
          <div className = {classes.root} >
              <GmailTreeView siteName={siteInfo.Sitename}/>
          </div>
        }
      </>
  );
}

export default ShowSite;

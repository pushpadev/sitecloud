import React, { useState, useRef, useEffect, useContext } from 'react';
import MarkerMap from '../components/markermap';
import { SideBar } from '../components/sidebar';
import { makeStyles } from '@mui/styles';
import { getAllSite } from '../actions';
import { SitesContext } from '../contexts/sites';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

});

function Home() {
  const classes = useStyles();
  const homeEl = useRef(null);
  const [ sites, setSites ] = useContext(SitesContext);
  const [selId, setSelId] = useState(0);

  const getSelectedItem = (id, item) => {
    setSelId(id);
    if(id === 0)
      homeEl.current.goToInitialPos();
    else
      homeEl.current.goToSelectedSite(item);
  }

  useEffect(() => {
    (async () => {
      let res = await getAllSite();
      setSites(res.AllSiteinfo)
    })()

  }, [])

  return (
      <div className = {classes.root} >
        <SideBar 
          sites = {sites} 
          getSelectedItem = {getSelectedItem} 
        />
        <MarkerMap ref = {homeEl} selId = {selId}/>
      </div>
  );
}

export default Home;

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
  const newSiteEl = useRef(null);
  const classes = useStyles();

  const [showMarkup, setShowMarkup] = useState(false);

  const drawPolygon = () => {
    newSiteEl.current.setCreatePolygonMode();
  }

  const editPolygon = () => {

  }

  const markupSite = () => {
    setShowMarkup(true);
  }

  const createSite = () => {
  }

  const deletePolygon = () => {
    newSiteEl.current.deleteSelectedPolyon();
  }

  return (
      <>
        <div className = {classes.root} >
            Show Site
        </div>
      </>
  );
}

export default ShowSite;

import React, { useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import marker from '../marker.png';
import { MAP_VIEW, SIDEBAR_WIDTH, MAP_CENTER_COORDINATE } from "../constant";
import MapPin from './mappin';
import PopOver from './popover'
import { useNavigate } from "react-router-dom";
import { makeStyles, withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { SitesContext } from "../contexts/sites";
// import SearchBox from './searchbox';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../css/style.css';

const useStyles = makeStyles({
  root: {
      padding: 12,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
      position: 'absolute',
      top: 100,
      right: 30,
      zIndex: 10,
      width: '140px',
      height: '35px',
      color: 'white',
      paddingTop: '2px',
      paddingBottom: '2px',
      textTransform: 'none',
      borderRadius: 0,
      backgroundColor: '#0066ffef !important',
      border: '2px solid #0066ffef',
      '&:hover': {
          opacity: '.7',
          borderColor: '#0066ffef !important',
      },
  },
}))(Button);

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

const MarkerMap = forwardRef((props, ref) => {
  const classes = useStyles();
  const [sites] = useContext(SitesContext);
  const [siteInfo, setSiteInfo] = useState({});
  const [mapObj, setMapObj] = useState(null);

  const drawControl = useRef(null);
  let history = useNavigate();

  const image = new Image(60, 60);
  image.src = marker;

  const handleClick = (id) => {
    setSiteInfo(sites[id]);
  }

  const handleDoubleClick = (id) => {
    history(`/editsite/${id}`);
  }
  const addNewSite = () => {
    history('/editsite');
  }

  const onStyleLoaded = (map)  => {
    setMapObj(map);
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g", // Set the access token
      mapboxgl: map, // Set the mapbox-gl instance
      placeholder: 'Search here', // Placeholder text for the search bar
      // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
      // proximity: {
      //   longitude: -122.25948,
      //   latitude: 37.87221
      // } // Coordinates of UC Berkeley
    });
    map.setZoom(6);

    map.addControl(geocoder);
    if(props.selId === 0){
      map.panTo(MAP_CENTER_COORDINATE);
    }
  }

  const goToSelectedSite = (item) => {
    if(mapObj){
      setSiteInfo(item);
      if(item.data.centroid)
        mapObj.panTo([item?.data?.centroid[0], item?.data?.centroid[1]]);
    }
  }
  const goToInitialPos = () => {
    setSiteInfo(MAP_VIEW);
    if(mapObj){
        mapObj.panTo(MAP_CENTER_COORDINATE);
    }
  }
  // [149.012375, -35.473469]
  useImperativeHandle(ref, () => ({ goToSelectedSite, goToInitialPos }), [mapObj])

  useEffect(() => {
    setSiteInfo(MAP_VIEW);
  }, [])
        // center = {[149.012375, -35.473469]}

  return (
    <div className={classes.root}>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        onStyleLoad={onStyleLoaded}
        containerStyle={{
          height: `calc(100vh - 84px)`,
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`
        }}
        center={MAP_CENTER_COORDINATE}
      >
        <DrawControl ref={drawControl} displayControlsDefault={false} />
        {(sites.length > 0)? sites.map((item, index) => {
          return(
            <Marker
              key = {index}
              coordinates={item?.data?.centroid}
              captureClick={false}
              draggable={false}
              offsetTop={-30}
              offsetLeft={-15}
            >
                  <div className='custom-pin'
                    onDoubleClick={() => handleDoubleClick(item.sitemappingId)}
                    onClick={() => handleClick(index)}
                  >
                    <MapPin
                      isSelec = {(item?.sitemappingId === siteInfo?.sitemappingId)?true:false}
                      message={item?.data?.Sitename}
                    />
                  </div>
            </Marker>
          )
        }):(<></>)}
      </Map>
      {(sites.length > 0) && 
      ( <div style={{display: 'flex', justifyContent: 'center'}}>
        <PopOver siteInfo = {siteInfo} />
      </div>)}
     
      <ColorButton onClick={() => addNewSite()}>
        Add New Site
      </ColorButton>
      {/* <div style = {{display: 'flex', justifyContent: 'center'}}><SearchBox /></div> */}
    </div>
  );
})

export default MarkerMap;

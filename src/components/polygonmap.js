import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useContext } from "react";
import ReactMapboxGl, {Layer, Feature, Source, GeoJSONLayer, Marker} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import IconBar from './iconbar';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import { 
  MAP_CENTER_COORDINATE,
  SIDEBAR_WIDTH, 
  SAVE_MARKUP_MSG,
  SAVE_BOUNDARY_MSG,
} from "../constant";
import Dropzone from 'react-dropzone';
import * as turf from "@turf/turf";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import IconPin from './iconpin';
import { CurrentSiteContext } from "../contexts/currentsite";
import {Snackbar} from '@mui/material';
import { useToasts } from 'react-toast-notifications'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../css/style.css';

const useStyles = makeStyles({
    root: {
        padding: 10,
    },
});

const ColorButton = withStyles((theme) => ({
  root: {
      width: (props) => (!props.width?props.width:'100%'),
      height: '35px',
      color: 'white',
      paddingTop: '2px',
      paddingBottom: '2px',
      textTransform: 'none',
      borderRadius: 0,
      backgroundColor: '#18941D !important',
      border: '2px solid #18941D',
      '&:hover': {
          opacity: '.7',
          borderColor: '#18941D !important',
      },
  },
}))(Button);

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

const PolygonMap = forwardRef((props, ref) => {
  const classes = useStyles();
  const [ currentSite ] = useContext(CurrentSiteContext);
  const [polygonOld, setPolygonOld] = useState({});
  const [polygonNew, setPolygonNew] = useState({});
  const [iconListOld, setIconListOld] = useState([]);
  const [iconListNew, setIconListNew] = useState([]);
  const [selItem, setItem] = useState({});
  const [mapObj, setMap] = useState(null);
  const [selIcon, setSelIcon] = useState(null);
  const [msg, setMsg] = useState(SAVE_BOUNDARY_MSG);
  const [msgActive, setMsgActive] = useState(false);

  // Compare New Data
  const [isNewPolygon, setIsNewPolygon] = useState(false);
  const [isNewMarkup, setIsNewMarkup] = useState(false);

  const { addToast } = useToasts();

  const mapRef = useRef();
  const drawControl = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const onDrawCreate = ({ features }) => {
      if (features.length > 0) {
          let polyID = features[0].id;
          let points = features[0].geometry.coordinates;
          var trufpolygon = turf.polygon(points);
          var center = turf.centerOfMass(trufpolygon);
          let poly = {"id": polyID, "points": points, "center": center.geometry.coordinates};
          setPolygonNew(poly);
      }
      props.endDrawPolygon();
  };

  const onDrawUpdate = ({ features }) => {
    if (features.length > 0) {
      let polyID = features[0].id;
      let points = features[0].geometry.coordinates;
      var trufpolygon = turf.polygon(points);
      var center = turf.centerOfMass(trufpolygon);
      let poly = {"id": polyID, "points": points, "center": center.geometry.coordinates};
      setPolygonNew(poly);
    }
  };

  const checkNewPolygon = React.useCallback(
    () => {
      let isNew = (JSON.stringify(polygonNew) !== JSON.stringify(polygonOld));
      setIsNewPolygon(isNew);
      props.setIsSavedPolygon(!isNew);
      },
    [polygonNew, polygonOld, props]
  );

  const checkNewMarkup = React.useCallback(
    () => {
      let isNew = (JSON.stringify(iconListNew) !== JSON.stringify(iconListOld));
      setIsNewMarkup(isNew);
      props.setIsSavedMarkup(!isNew);
      },
    [iconListNew, iconListOld, props]
  );
  
 const onStyleLoaded = (map, event)  => {
    setMap(map);
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g", // Set the access token
      mapboxgl: map, // Set the mapbox-gl instance
      placeholder: 'Search here', // Placeholder text for the search bar
    });
    map.addControl(geocoder);
    map.setZoom(6.5);
    props.setMapLoading(false);
    if( currentSite && Object.keys(currentSite).length !== 0){
      var storedPolygons = currentSite?.polyrings;
      let features = [{type: "Feature", id: storedPolygons?.id, properties: {"name": storedPolygons?.name}, geometry: {type: "Polygon", coordinates: storedPolygons?.points}}];
      let data = {type: "FeatureCollection", features};
      drawControl.current.draw.set(data);
    }
  }

  const dragItem = (item) => {
    setItem(item);
  }

  const dragEnd = (event) => {
    
    if(selItem && Object.keys(selItem).length !== 0){
      if (mapRef.current) {
        const rect = mapRef.current.container;
        const currentCenterPixel = mapObj.project(mapObj.getCenter());
        currentCenterPixel.x = event.clientX - rect.offsetLeft;
        currentCenterPixel.y = event.clientY - rect.offsetTop + window.scrollY;
        let iconInfo = mapObj.unproject(currentCenterPixel);
        if(checkCoordinate(iconInfo.lng, iconInfo.lat) === true) {
          if(iconListNew.length === 0)
            setIconListNew([...iconListNew, {id: iconListNew.length, icon: selItem.value, position: iconInfo}]);
          else
            setIconListNew([...iconListNew, {id: iconListNew[iconListNew.length - 1].id + 1, icon: selItem.value, position: iconInfo}]);
          props.setExistMakrup(true);
        }
      }
    }
    setItem({});
  }

  const checkCoordinate = (lat, lon) => {
    if (lat.length == 0) {
      return;
    } else {
      if (!parseFloat(lat)) {
        return;
      }
    }
  
    if (lon.length == 0) {
      return;
    } else {
      if (!parseFloat(lon)) {
        return;
      }
    }

    if (polygonNew.id === undefined || polygonNew.id === null) {
      addToast('You should add polygon into the map', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }

    let bInside = false;
    let point = turf.point([parseFloat(lat), parseFloat(lon)])
    var geojson = turf.polygon(polygonNew.points);
    var options = {tolerance: 0.005, highQuality: false};
    var simplified = turf.simplify(turf.buffer(geojson, '0.1', {units : 'kilometers'}), options)
    let calculatedRegion = turf.polygon(simplified.geometry.coordinates);
    bInside = turf.inside(point, calculatedRegion);
    if(!bInside)
      addToast('Not inside polygons', {
        appearance: 'warning',
        autoDismiss: true,
      })
    return bInside;
  }

  const handleIcon = (index) => {
    setSelIcon(index);
  }

  const setCreatePolygonMode = () => {
    if(drawControl.current.draw !== null)
      drawControl.current.draw.changeMode('draw_polygon');
  }

  const deleteSelectedPolyon = () => {
    let selectedIDs = drawControl.current.draw.getSelectedIds();
    if(selectedIDs.length === 0){
      addToast('You should select polygon', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return false;
    }
    drawControl.current.draw.delete(selectedIDs);
    setPolygonOld({});
    setPolygonNew({});
    return true;
  }

  const deleteMarkup = () => {
    let bExist = false;
    let newList = iconListNew.filter((item) => {
      if(item.id === selIcon){
        bExist = true;
        return false;
      }
      else
        return true;
    })
    if(!bExist || selIcon === null){
      addToast('You should select markup', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    setIconListNew(newList);
    setSelIcon(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const saveBoundary = (event) => {
    handleClick(event);
    localStorage.setItem("polygon", JSON.stringify(polygonNew));
    setPolygonOld(polygonNew);
    setMsg(SAVE_BOUNDARY_MSG);
    props.setIsSavedPolygon(true);
  }

  const saveMarkup = (event) => {
    handleClick(event);
    localStorage.setItem("markups", JSON.stringify(iconListNew));
    setIconListOld(iconListNew);
    setMsg(SAVE_MARKUP_MSG);
    props.setIsSavedMarkup(true);
    setMsgActive(true)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useImperativeHandle(ref, () => ({ setCreatePolygonMode, deleteSelectedPolyon, deleteMarkup}), [selIcon, setIconListOld, setIconListNew, drawControl]);


  const getPolyAndMark = React.useCallback(
    () => {
      let storedIcon = JSON.parse(localStorage.getItem("markups"));
      let storedPolygon = JSON.parse(localStorage.getItem("polygon"));
      setIconListOld(storedIcon);
      setIconListNew(storedIcon);
      setPolygonOld(storedPolygon);
      setPolygonNew(storedPolygon);
      if(storedPolygon.length > 0)
        props.setExistPolygon(true);
      else
        props.setExistMakrup(false);
      if(storedIcon.length > 0)
        props.setExistMakrup(true);
      else
        props.setExistMakrup(false);
      },
    [props]
  );

  // useEffect(() => {
  //   getPolyAndMark();
  // }, [props, getPolyAndMark])

  useEffect(() => {
    checkNewMarkup();
    checkNewPolygon();
  }, [polygonNew, polygonOld, checkNewMarkup, checkNewPolygon])
  
  useEffect(() => {
    getPolyAndMark();
  }, [])

  return (
    <Dropzone>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()} onDrop={dragEnd}>
            <div className={classes.root}>
              <Map
                ref={mapRef}
                style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                onStyleLoad={onStyleLoaded}
                containerStyle={{
                  height: `calc(100vh - 84px)`,
                  width: `calc(100vw - ${SIDEBAR_WIDTH}px - 20px)`,
                  position: 'relative',
                }}
                center={(props.siteID === undefined || props.siteInfo === null)?MAP_CENTER_COORDINATE:currentSite?.centroid}
              >
                <DrawControl ref={drawControl} displayControlsDefault={false} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate}/>
                {(iconListNew.length > 0)?iconListNew.map((item, index) => {
                  return(
                    <Marker
                      key = {index}
                      coordinates={[item.position.lng, item.position.lat]}
                      captureClick={false}
                      draggable={false}
                      offsetTop={0}
                      offsetLeft={10}
                    >
                          <div className='custom-pin'
                            style={{position: 'relative'}}
                            onClick={() => handleIcon(item.id)}
                          >
                            <IconPin
                              icon = {item.icon}
                              isSelec = {(item.id === selIcon)?true:false}
                            />
                          </div>
                    </Marker>
                  )
                }): (<></>)}
              </Map>
                  {isNewPolygon?(
                    <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', bottom: 30, width: '80%' }}>
                      <div style={{paddingTop: 23, position: 'relative'}} onClick={(event) => saveBoundary(event)}>
                        <ColorButton 
                          variant="contained" 
                          aria-describedby={id}
                        >
                          <CheckCircleRoundedIcon 
                            style = {{marginRight: 10}} 
                          />
                          <span>Save Boundary</span>
                        </ColorButton>
                      </div>
                    </div>):(
                    isNewMarkup?(
                      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', bottom: 30, width: '80%' }}>
                        <div style={{paddingTop: 23}} onClick={(event) => saveMarkup(event)}>
                          <ColorButton 
                            variant="contained" 
                            aria-describedby={id}
                          >
                            <CheckCircleRoundedIcon 
                              style = {{marginRight: 10}} 
                            />
                            <span>Save Markup</span>
                          </ColorButton>
                        </div>
                      </div>):
                    (<></>)
                  )}
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={msgActive}
                    onClose={() => setMsgActive(false)}
                    message={msg}
                    key={'bottom center'}
                  />
                  {/* <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      PaperProps={{
                        style: { width: 350, textAlign: 'center'},
                      }}
                    >
                      <Typography sx={{ p: 2 }}>{msg}</Typography>
                  </Popover> */}
              {(props.showMarkup || props.isExistMarkup) && <IconBar dragItem = {dragItem} />}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
    
  );
})

export default PolygonMap;

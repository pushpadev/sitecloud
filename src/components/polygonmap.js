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
  STATUS_NONE, 
  BOUNDARY_CREATE, 
  MARKUP_CREATE,
  SAVE_MARKUP_MSG,
  SAVE_BOUNDARY_MSG,
} from "../constant";
import Dropzone from 'react-dropzone';
import * as turf from "@turf/turf";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import IconPin from './iconpin';
import { CurrentSiteContext } from "../contexts/currentsite";
// import MapboxGeocoder from 'mapbox-gl-geocoder';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useToasts } from 'react-toast-notifications'

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
  const [polygon, setPolygon] = useState({});
  const [iconList, setIconList] = useState([]);
  const [selItem, setItem] = useState({});
  const [mapObj, setMap] = useState(null);
  const [selIcon, setSelIcon] = useState(null);
  const [msg, setMsg] = useState(SAVE_BOUNDARY_MSG);
  const { addToast } = useToasts();

  const mapRef = useRef();
  const drawControl = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const onDrawCreate = ({ features }) => {
      if (features.length > 0) {
          let polyID = features[0].id;
          let points = features[0].geometry.coordinates;
          console.log(points)
          setPolygon({"id": polyID, "points": points});
          props.setExistPolygon(true);
          props.setEditingStatus(BOUNDARY_CREATE);
      }
      props.endDrawPolygon();
  };

  const onDrawUpdate = ({ features }) => {
    if (features.length > 0) {
      let polyID = features[0].id;
      let points = features[0].geometry.coordinates;
      console.log(points);
      setPolygon({"id": polyID, "points": points});
      props.editPolygon({"id": polyID, "points": points});
    }
  };

 const onStyleLoaded = (map, event)  => {
    setMap(map);
    if(props.siteID === undefined || props.siteID === null)
      map.panTo(MAP_CENTER_COORDINATE);
    else
      map.panTo(currentSite?.centroid);
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
    if (mapRef.current) {
      const rect = mapRef.current.container;
      const currentCenterPixel = mapObj.project(mapObj.getCenter());
      currentCenterPixel.x = event.clientX - rect.offsetLeft;
      currentCenterPixel.y = event.clientY - rect.offsetTop + window.scrollY;
      let iconInfo = mapObj.unproject(currentCenterPixel);
      if(checkCoordinate(iconInfo.lng, iconInfo.lat) === true) {
        setIconList([...iconList, {id: iconList.length, icon: selItem.value, position: iconInfo}]);
        props.setExistMakrup(true);
      }
    }
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

    if (polygon.id === undefined || polygon.id === null) {
      addToast('You should add polygon into the map', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }

    let bInside = false;
    let point = turf.point([parseFloat(lat), parseFloat(lon)])
    var geojson = turf.polygon(polygon.points);
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
    if(selectedIDs.length === 0)
      return false;
    drawControl.current.draw.delete(selectedIDs);
    setPolygon({});
    return true;
  }

  const deleteMarkup = () => {
    let newList = iconList.filter((item) => {
      if(item.id === selIcon)
        return false;
      else
        return true;
    })
    setIconList(newList);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useImperativeHandle(ref, () => ({ setCreatePolygonMode, deleteSelectedPolyon, deleteMarkup}), [iconList, selIcon, setPolygon, setIconList, drawControl])

  useEffect(() => {
    if (currentSite && Array.isArray(currentSite?.markup)) {
      setIconList(currentSite?.markup);
      setPolygon(currentSite?.polyrings);
      props.setEditingStatus(MARKUP_CREATE);
      props.setExistMakrup(true);
    }
  }, [currentSite, props])
  
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
                  width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
                  position: 'relative',
                }}
              >
                <DrawControl ref={drawControl} displayControlsDefault={false} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate}/>
                {(iconList.length > 0)?iconList.map((item, index) => {
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
                            {/* <div style={{position: 'absolute', right: 0, top: 0}}>
                                <img src =  alt="close"/>
                            </div> */}
                          </div>
                    </Marker>
                  )
                }): (<></>)}
              </Map>
              {/* <IconBar dragItem = {dragItem} /> */}
              <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', top: 620, width: '80%' }}>
                <div>
                  {(props.editingStatus === STATUS_NONE)?
                    (<></>):
                    ((props.editingStatus === BOUNDARY_CREATE)?
                    (<ColorButton 
                      aria-describedby={id} 
                      variant="contained" 
                      onClick={(event) => {props.saveBoundary(polygon);setMsg(SAVE_BOUNDARY_MSG);handleClick(event)}}
                    >
                      <CheckCircleRoundedIcon 
                        style = {{marginRight: 10}} 
                      />
                        <span>Save Boundary</span>
                    </ColorButton>):
                    (<ColorButton 
                      aria-describedby={id} 
                      variant="contained" 
                      onClick={(event) => {props.saveMarkup(iconList);setMsg(SAVE_MARKUP_MSG);handleClick(event)}}
                    >
                      <CheckCircleRoundedIcon 
                        style = {{marginRight: 10}} 
                      />
                      <span>Save Markup</span>
                    </ColorButton>))
                  }
                  <Popover
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
                      style: { width: 350, textAlign: 'center' },
                    }}
                  >
                    <Typography sx={{ p: 2 }}>{msg}</Typography>
                  </Popover>
                </div>
              </div>
              {(props.showMarkup || props.isExistMarkup) && <IconBar dragItem = {dragItem} />}
            </div>
          </div>
        </section>
      )}
    </Dropzone>
    
  );
})

export default PolygonMap;

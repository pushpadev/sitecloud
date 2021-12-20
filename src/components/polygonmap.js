import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useContext } from "react";
import ReactMapboxGl, {Layer, Feature, Source, GeoJSONLayer, Marker} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import IconBar from './iconbar';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import { 
  BOUNDARY_SAVE,
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
      backgroundColor: '#39c46aef !important',
      border: '2px solid #39c46aef',
      '&:hover': {
          opacity: '.7',
          borderColor: '#39c46aef !important',
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

  const mapRef = useRef();
  const drawControl = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const onDrawCreate = ({ features }) => {
      if (features.length > 0) {
          let polyID = features[0].id;
          let points = features[0].geometry.coordinates;
          setPolygon({"id": polyID, "points": points});
          props.setExistPolygon(true);
          props.setEditingStatus(BOUNDARY_CREATE);
      }
  };

  const onDrawUpdate = ({ features }) => {
    if (features.length > 0) {
      let polyID = features[0].id;
      let points = features[0].geometry.coordinates;
      setPolygon({"id": polyID, "points": points});
      props.setExistPolygon(true);
    }
  };

 const onStyleLoaded = (map, event)  => {
    setMap(map);
    props.setMapLoading(false);
    console.log(currentSite);
    if( currentSite && Object.keys(currentSite).length !== 0){
      var storedPolygons = currentSite?.polyrings;
      let features = [{type: "Feature", id: storedPolygons?.id, properties: {"name": storedPolygons?.name}, geometry: {type: "Polygon", coordinates: storedPolygons?.points}}];
      let data = {type: "FeatureCollection", features};
      drawControl.current.draw.set(data);
    }

    // const geocoder = new MapboxGeocoder({
    //   // Initialize the geocoder
    //   accessToken: "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g", // Set the access token
    //   mapboxgl: map, // Set the mapbox-gl instance
    //   placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
    //   bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
    //   proximity: {
    //     longitude: -122.25948,
    //     latitude: 37.87221
    //   } // Coordinates of UC Berkeley
    // });

    // map.addControl(geocoder);
    
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
      alert("Please put latitude!");
      return;
    } else {
      if (!parseFloat(lat)) {
        alert("Please put decimals only!");
        return;
      }
    }
  
    if (lon.length == 0) {
      alert("Please put longitude!");
      return;
    } else {
      if (!parseFloat(lon)) {
        alert("Please put decimals only!");
        return;
      }
    }
    if (polygon.id === undefined || polygon.id === null) {
      alert("You should add polygon into the map");
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
      alert("Not inside polygons");
    return bInside;
    // alert(bInside ? "Your coordinate is inside current polygons!" : "Not inside polygons");
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
    drawControl.current.draw.delete(selectedIDs);
    setPolygon({});
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
  }, [currentSite])
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
                  height: "600px",
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

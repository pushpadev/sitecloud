import React, { useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import marker from '../marker.png';
import { MAP_VIEW, MAP_CENTER_COORDINATE, SHOWBAR_WIDTH } from "../constant";
import MapPin from './mappin';
import PopOver from './popover';
import IconBar from './iconbar';
import { useNavigate } from "react-router-dom";
import { makeStyles, withStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import { SitesContext } from "../contexts/sites";
import { ReactComponent as EditMarkUpIcon } from "../images/svg/edit_markUp.svg";
import { ReactComponent as EditBoundaryIcon } from "../images/svg/editBoundary.svg"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../css/style.css';

const useStyles = makeStyles({
    root: {
        width: `calc(100vw - ${SHOWBAR_WIDTH}px)`,
    },
});


const ButtonContainer = withStyles((theme) => ({
    root: {
        position: 'absolute',
        bottom: '190px',
        right: '7%',
        zIndex: 10,
        margin: 'auto',
        width: `calc(100vw - ${SHOWBAR_WIDTH}px)`,
        display: 'flex',
        justifyContent: 'end'
    },
}))(Grid);

const EditMarkUp = withStyles((theme) => ({
    root: {
        marginLeft: '10px',
        float: 'right',
        minWidth: '155px',
        minHeight: '43px',
        color: 'white',
        paddingTop: '5px',
        paddingBottom: '5px',
        textTransform: 'none',
        backgroundColor: '#753AF4; !important',
        border: '2px solid #753AF4;',
        '&:hover': {
            backgroundColor: '#753AF4; !important',
            color: 'white',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.25rem #753af44a'
        },
    },
}))(Button);

const EditBoundary = withStyles((theme) => ({
    root: {
        minWidth: '155px',
        minHeight: '43px',
        color: 'white',
        float: 'right',
        paddingTop: '5px',
        paddingBottom: '5px',
        textTransform: 'none',
        backgroundColor: '#753AF4; !important',
        border: '2px solid #753AF4;',
        '&:hover': {
            backgroundColor: '#753AF4; !important',
            color: 'white',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.25rem #753af44a'
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
    const [showIconBar, setShowIconBar] = useState(false);

    const drawControl = useRef(null);
    let history = useNavigate();

    const image = new Image(60, 60);
    image.src = marker;


    const handleClickIconBar = () => {
        setShowIconBar(!showIconBar);
    }
    const handleClick = (id) => {
        setSiteInfo(sites[id]);
    }

    const handleDoubleClick = (id) => {
        history(`/editsite/${id}`);
    }
    const addNewSite = () => {
        history('/editsite');
    }

    const onStyleLoaded = (map) => {
        setMapObj(map);

        map.setZoom(6);

        if (props.selId === 0) {
            map.panTo(MAP_CENTER_COORDINATE);
        }
    }

    const goToSelectedSite = (item) => {
        if (mapObj) {
            setSiteInfo(item);
            if (item.data.centroid)
                mapObj.panTo([item?.data?.centroid[0], item?.data?.centroid[1]]);
        }
    }
    const goToInitialPos = () => {
        setSiteInfo(MAP_VIEW);
        if (mapObj) {
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
                    height: `calc(100vh - 64px)`,
                }}
                center={MAP_CENTER_COORDINATE}
            >
                <DrawControl ref={drawControl} displayControlsDefault={false} />
                {(sites.length > 0) ? sites.map((item, index) => {
                    return (
                        <Marker
                            key={index}
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
                                    isSelec={(item?.sitemappingId === siteInfo?.sitemappingId) ? true : false}
                                    message={item?.data?.Sitename}
                                />
                            </div>
                        </Marker>
                    )
                }) : (<></>)}
            </Map>
            {
                (sites.length > 0) &&
                (<div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PopOver siteInfo={siteInfo} />
                </div>)
            }
            <ButtonContainer>
                <EditBoundary>
                    <div className="edit_markupbtn">
                        <EditBoundaryIcon />
                        Edit Boundary
                    </div>
                </EditBoundary>
                <EditMarkUp onClick={() => handleClickIconBar()}>
                    <div className="edit_markupbtn" >
                        <EditMarkUpIcon />
                        Edit Markup
                    </div>
                </EditMarkUp>
            </ButtonContainer>

            {
                showIconBar == true &&
                <div className="drag_dropBar">
                    <IconBar />
                </div>
            }

        </div >
    );
})

export default MarkerMap;

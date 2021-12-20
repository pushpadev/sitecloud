import React, { useState, useRef, useEffect } from "react";
import ReactMapboxGl, {Layer, Feature, Source, GeoJSONLayer} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import IconBar from '../components/iconbar';
import { makeStyles } from '@mui/styles';
import { SIDEBAR_WIDTH } from "../constant";

const useStyles = makeStyles({
    root: {
        padding: 10,
    },
});

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

function MapBox() {
  const classes = useStyles();
  const [polygon, setPolygon] = useState({});
  const [polygons, setPolygons] = useState([]);

  const drawControl = useRef(null);
  
  useEffect(() => {
    console.log(polygons)
  }, [polygons])

  const gotPolygonName = (name) => {
    let {id, points} = polygon;
    setPolygons(prevState => {
      return [...prevState, {"id": id, "name": name, "points": points}];
    })
  }

    const onDrawCreate = ({ features }) => {
        if (features.length > 0) {
            let polyID = features[0].id;
            let points = features[0].geometry.coordinates;

            setPolygon({"id": polyID, "points": points});
        }
    };

  const onDrawUpdate = ({ features }) => {
    if (features.length > 0) {
      let polyID = features[0].id;
      let points = features[0].geometry.coordinates;

      setPolygons(prevState => {
        const oldPolygons = [...prevState];
        let newPolygons = oldPolygons.map((item) => {
          if (item.id === polyID) {
            return {...item, "points": points};
          } else {
            return item;
          }
        })

        return newPolygons;
      })
    }
  };

  const setCreatePolygonMode = () => {
    console.log(drawControl.current.draw);
    drawControl.current.draw.changeMode('draw_polygon');
  }
 
  const deleteSelectedPolyon = () => {
    let selectedIDs = drawControl.current.draw.getSelectedIds();
    drawControl.current.draw.delete(selectedIDs);

    let polyID = selectedIDs[0];

    setPolygons(prevState => {
      const oldPolygons = [...prevState];
      let newPolygons = oldPolygons.filter((item) => {
        if (item.id === polyID) {
          return false;
        } else {
          return true;
        }
      })

      return newPolygons;
    })
  }

 const onRender = ()  => {
    var storedPolygons = JSON.parse(localStorage.getItem("polygons")); 
    if (storedPolygons !== null) {
      setPolygons(storedPolygons);

      let features = storedPolygons.map((item, index) => {
        return {type: "Feature", id: item.id, properties: {"name": item.name}, geometry: {type: "Polygon", coordinates: item.points}};
      });
  
      let data = {type: "FeatureCollection", features};
      drawControl.current.draw.set(data);
    }
  }

  const savePolygons = () => {
    localStorage.setItem("polygons", JSON.stringify(polygons)); 
  }

  return (
    <div className={classes.root}>
      {/* <div>
        <button onClick={setCreatePolygonMode}>Create a Polygon</button>
        <button onClick={deleteSelectedPolyon}>Delete a Polygon</button>
        <button onClick={savePolygons}>Save</button>
      </div> */}
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        onStyleLoad={onRender}
        containerStyle={{
          height: "600px",
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          position: 'relative',
        }}
      >
        <DrawControl ref={drawControl} displayControlsDefault={false} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate}/>

      </Map>
      <IconBar />
    </div>
  );
}

export default MapBox;

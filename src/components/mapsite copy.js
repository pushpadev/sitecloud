import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {Modal, Button, Form} from 'react-bootstrap';
import ReactMapboxGl, {Layer, Feature, Source, GeoJSONLayer, Marker} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from "@turf/turf";
import marker from '../marker.png';


const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

function InfoModal(props) {
  const inputName = useRef(null);

  const onClickedSave = () => {
    if (inputName.current.value.length == 0) {
      alert("Please input the name correctly!");
      return
    }

    props.onHide(inputName.current.value);
  }

  return (
    <Modal
      {...props}
      size="sm"
      backdrop="static"      
      centered
    >
      <Modal.Body>
        <p>
          Please input the name!
        </p>
        <Form.Control type="name" ref={inputName} placeholder="Enter Name" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClickedSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MapSite() {
  const [polygon, setPolygon] = useState({});
  const [polygons, setPolygons] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const drawControl = useRef(null);
  const inputLat = useRef(null);
  const inputLon = useRef(null);
  
  const image = new Image(60, 60);
  image.src = marker;
  const images = ['marker', image];

  useEffect(() => {
    console.log(polygons)
  }, [polygons])

  const gotPolygonName = (name) => {
    setModalShow(false)    

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
      setModalShow(true);
    }
  };

  const onDrawUpdate = ({ features }) => {
    if (features.length > 0) {
      let polyID = features[0].id;
      let points = features[0].geometry.coordinates;

      setPolygons(prevState => {
        const oldPolygons = [...prevState];
        let newPolygons = oldPolygons.map((item) => {
          if (item.id == polyID) {
            return {...item, "points": points};
          } else {
            return item;
          }
        })

        return newPolygons;
      })
    }
  };

  const checkCoordinate = () => {
    let lat = inputLat.current.value;
    let lon = inputLon.current.value;

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

    if (polygons.length == 0) {
      alert("You should add polygon into the map");
      return;
    }

    let bInside = false;
    let point = turf.point([parseFloat(lat), parseFloat(lon)])
    polygons.forEach((polygon) => {
      let calculatedRegion = turf.polygon(polygon.points);
      bInside = turf.inside(point, calculatedRegion);

      if (bInside) {
        return;
      }
    });

     alert(bInside ? "Your coordinate is inside current polygons!" : "Not inside polygons")
  }

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
        if (item.id == polyID) {
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
    <>
      <div>
        <div>
          <button onClick={setCreatePolygonMode}>Create a Polygon</button>
          <button onClick={deleteSelectedPolyon}>Delete a Polygon</button>
        </div>

        <label>
          Latitude:
          <input type="text" ref={inputLat} />
        </label>
        <label>
          &nbsp;Longitude:
          <input type="text" ref={inputLon} />
        </label>

        <button onClick={checkCoordinate}>Check</button>
        <button onClick={savePolygons}>Save</button>
        
      </div>
      <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        onStyleLoad={onRender}
        containerStyle={{
          height: "500px",
          width: "100%"
        }}
      >
        
        <DrawControl ref={drawControl} displayControlsDefault={false} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate}/>

        <Marker 
          coordinates={[-0.481747846041145, 51.3233379650232]}
          captureClick={false}
          draggable={false}
          offsetTop={-30}
          offsetLeft={-15}>
              <div className='custom-pin' 
                onDoubleClick={() => {console.log("vcvcvc")}}
                onClick={() => {console.log("sdsdsd")}}>
                <img src={marker} alt='Gem' style={{width: 30, height: 30}}/>
                <label style={{color: 'red'}}>sdsd</label>
              </div>
        </Marker>   

      </Map>

      <InfoModal
        onHide={(name) => gotPolygonName(name)}
        show={modalShow}
      />   

    </>
  );
}

export default MapSite;

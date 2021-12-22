import React, { useState, useRef, useContext, useEffect } from 'react';
import PolygonMap from '../components/polygonmap';
import { makeStyles } from '@mui/styles';
import { SetupSiteBar } from '../components/setup';
import { useParams } from "react-router-dom";
import { 
  BOUNDARY_EDIT, 
  BOUNDARY_NONE, 
  BOUNDARY_SET, 
  MARKUP_NONE, 
  MARKUP_SET, 
  MARKUP_EDIT, 
  STATUS_NONE, 
  MARKUP_SAVE,
  BOUNDARY_SAVE,
  BOUNDARY_CREATE,
} from '../constant';
import { CurrentSiteContext } from "../contexts/currentsite";
import { getSite, saveSite, modifySite} from '../actions'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

});

function EditSite() {
  const polygonEl = useRef(null);
  const setupEl = useRef(null);
  const classes = useStyles();
  const [showMarkup, setShowMarkup] = useState(false);
  const { id } = useParams();
  const [siteInfo, setSiteInfo] = useState({});
  const [editingStatus, setEditingStatus] = useState(STATUS_NONE);
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [currentSite, setCurrentSite] = useContext(CurrentSiteContext);
  const [isLoading, setLoading] = useState(true);
  const [isMapLoading, setMapLoading] = useState(true);
  const [isExistPolygon, setExistPolygon] = useState(false);
  const [isExistMarkup, setExistMakrup] = useState(false);
  const { addToast } = useToasts();
  const history = useNavigate();


  const drawPolygon = () => {
    polygonEl.current.setCreatePolygonMode();
    setupEl.current.setMkStatus(MARKUP_NONE);
  }

  const endDrawPolygon = () => {
    setupEl.current.setBdStatus(BOUNDARY_NONE);
  }

  const editPolygon = (polygon) => {
    setExistPolygon(true);
    setEditingStatus(BOUNDARY_CREATE);
  }

  const markupSite = () => {
    setShowMarkup(true);
  }

  const createSite = async () => {
    if( !siteName || !siteAddress ){
      addToast('input site name and site address!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    if(!currentSite || !currentSite.polyrings ){
      addToast('you should save polygon!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    if(!currentSite || !currentSite.markup ){
      addToast('you should save markup!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    let rt;
    let info = {
      "Sitename": siteName, 
      "Siteaddress": siteAddress, 
      "polyrings": currentSite?.polyrings, 
      "markup": currentSite?.markup, 
      "centroid": currentSite?.centroid
    };

    setCurrentSite(info);
    console.log(info);

    if(id === undefined || id === null){
      rt = await saveSite(info);
      if(rt.status === 'success'){
        addToast('save success', {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      else{
        addToast('save error', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    }
    else{
      rt = await modifySite(id, info);
      if(rt === 'updated success'){
        addToast('update success', {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      else{
        addToast('update error', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    }
    history('/');
  }

  const deletePolygon = () => {
    if(polygonEl.current.deleteSelectedPolyon()){
      setEditingStatus(STATUS_NONE);
      setExistPolygon(false);
    }
  }
  const deleteMarkup = () => {
    polygonEl.current.deleteMarkup();
  }
  
  const saveBoundary = (polygon) => {
    if(!polygon || Object.keys(polygon).length === 0){
      addToast('You should draw the polygon', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    setCurrentSite({Sitename: siteName, Siteaddress: siteAddress, polyrings: polygon, markup: (currentSite)?currentSite?.iconList:[], centroid: polygon.points[0][0]});
    setEditingStatus(BOUNDARY_SAVE);
  }

  const saveMarkup = (iconList) => {
    setCurrentSite({Sitename: siteName, Siteaddress: siteAddress, polyrings: (currentSite)?currentSite?.polyrings:{}, markup: iconList, centroid: (currentSite)?currentSite?.centroid:[]});
    setEditingStatus(MARKUP_SAVE);
  }

  const handleSiteName = (value) => {
    setSiteName(value);
  }

  const handleAddress = (value) => {
    setSiteAddress(value);
  }

  useEffect(() => {
    (async () => {
      if(id !== undefined && id !== null){
        let res = await getSite(id);
        setCurrentSite(res?.data);
        setSiteInfo(res?.data);
        setSiteName(res?.data?.Sitename);
        setSiteAddress(res?.data?.Siteaddress);
        setExistPolygon(true);
        setExistMakrup(true);
      }
      setLoading(false);
    })()
  }, [])

  useEffect(() => {
    // console.log(editingStatus);
  }, [editingStatus])

  return (
      <>
      {(isLoading)?(<></>):(
        <div className = {classes.root} >
            <SetupSiteBar 
              ref = {setupEl}
              drawPolygon = {drawPolygon} 
              editPolygon = {editPolygon} 
              markupSite = {markupSite} 
              createSite = {createSite}
              deletePolygon = {deletePolygon}
              deleteMarkup = {deleteMarkup}
              getAddress = {handleAddress}
              getSiteName = {handleSiteName}
              siteName = {siteName}
              siteAddress = {siteAddress}
              siteInfo = {siteInfo}
              isMapLoading = {isMapLoading}
              isExistPolygon = {isExistPolygon}
              isExistMarkup = {isExistMarkup}
              siteID = {id}
            />
            <PolygonMap
              ref = {polygonEl}
              showMarkup = {showMarkup}
              editingStatus = {editingStatus}
              setEditingStatus = {setEditingStatus}
              saveBoundary = {saveBoundary}
              saveMarkup = {saveMarkup}
              setMapLoading = {setMapLoading}
              setExistPolygon = {setExistPolygon}
              setExistMakrup = {setExistMakrup}
              isExistMarkup = {isExistMarkup}
              endDrawPolygon = {endDrawPolygon}
              editPolygon = {editPolygon}
              siteID = {id}
            />
        </div>
      )}
        
      </>
  );
}

export default EditSite;

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
    flexGrow: 1,
    overflow: 'hidden'
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

  const [isSavedPolygon, setIsSavedPolygon] = useState(true);
  const [isSavedMarkup, setIsSavedMarkup] = useState(true);


  const { addToast } = useToasts();
  const history = useNavigate();


  const drawPolygon = () => {
    polygonEl.current.setCreatePolygonMode();
    setupEl.current.setMkStatus(MARKUP_NONE);
  }

  const endDrawPolygon = () => {
    setupEl.current.setBdStatus(BOUNDARY_NONE);
    setExistPolygon(true);
  }

  const editPolygon = () => {
    setExistPolygon(true);
    setEditingStatus(BOUNDARY_CREATE);
  }

  const markupSite = () => {
    setShowMarkup(true);
  }

  const createSite = async () => {
    let storedIcon = JSON.parse(localStorage.getItem("markups"));
    let storedPolygon = JSON.parse(localStorage.getItem("polygon"));
    let rt;
    let info = {
      "Sitename": siteName, 
      "Siteaddress": siteAddress, 
      "polyrings": storedPolygon, 
      "markup": storedIcon, 
      "centroid": storedPolygon?.center
    };
    setCurrentSite(info);

    if( !isExistPolygon ){
      addToast('You should draw polygon!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }

    if( !siteName || !siteAddress ){
      addToast('input site name and site address!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    if(!isSavedPolygon ){
      addToast('you should save polygon!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }
    if(!isSavedMarkup ){
      addToast('you should save markup!', {
        appearance: 'warning',
        autoDismiss: true,
      })
      return;
    }

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
    setIsSavedPolygon(false);
    setIsSavedMarkup(false);
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
  
  const saveBoundary = () => {
    setEditingStatus(BOUNDARY_SAVE);
  }

  const saveMarkup = () => {
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
        if(res.status === 200){
          setCurrentSite(res?.data?.data);
          setSiteInfo(res?.data?.data);
          setSiteName(res?.data?.data?.Sitename);
          setSiteAddress(res?.data?.data?.Siteaddress);
          setExistPolygon(true);
          setExistMakrup(true);
          localStorage.setItem("markups", JSON.stringify(res?.data?.data.markup));
          localStorage.setItem("polygon", JSON.stringify(res?.data?.data.polyrings));
          setIsSavedMarkup(true);
          setIsSavedPolygon(true);
        }
        else{
          localStorage.setItem("markups", JSON.stringify([]));
          localStorage.setItem("polygon", JSON.stringify([]));
          setIsSavedMarkup(false);
          setIsSavedPolygon(false);
        }
      }
      else{
        localStorage.setItem("markups", JSON.stringify([]));
        localStorage.setItem("polygon", JSON.stringify([]));
        setIsSavedMarkup(false);
        setIsSavedPolygon(false);
      }
      setLoading(false);
    })()
  }, [])

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
              endDrawPolygon = {endDrawPolygon}
              editPolygon = {editPolygon}
              setIsSavedMarkup = {setIsSavedMarkup}
              setIsSavedPolygon = {setIsSavedPolygon}
              siteID = {id}
              isExistMarkup = {isExistMarkup}
            />
        </div>
      )}
        
      </>
  );
}

export default EditSite;

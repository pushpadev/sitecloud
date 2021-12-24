import React, { useState, useRef, useEffect } from 'react';
import GmailTreeView from '../components/gmailtreeview';
import MarkerMap from '../components/manageSiteMap';
import { makeStyles } from '@mui/styles';
import { getSite } from '../actions'
import { useParams } from "react-router-dom";


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },

});

const ManageSite = () => {
    const classes = useStyles();

    const homeEl = useRef(null);
    const [siteInfo, setSiteInfo] = useState({});
    const [isLoading, setLoading] = useState(true);

    const [selId, setSelId] = useState(0);
    const { id } = useParams();

    const getSelectedItem = (id, item) => {
        setSelId(id);
        if (id === 0)
            homeEl.current.goToInitialPos();
        else
            homeEl.current.goToSelectedSite(item);
    }

    useEffect(() => {
        (async () => {
            if (id !== undefined && id !== null) {
                let res = await getSite(id);
                setSiteInfo(res?.data?.data);
            }
            setLoading(false);
        })()

    }, [])


    return (
        <React.Fragment>
            {!isLoading &&
                <div className={classes.root} >
                    <GmailTreeView siteName={siteInfo?.Sitename} />
                    <MarkerMap ref={homeEl} selId={selId} />
                </div>
            }
        </React.Fragment>
    );
}

export default ManageSite;


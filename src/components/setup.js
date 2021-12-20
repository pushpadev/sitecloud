import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SIDEBAR_WIDTH} from '../constant';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import { 
    BOUNDARY_NONE,
    BOUNDARY_EDIT,
    BOUNDARY_SET,
    MARKUP_NONE,
    MARKUP_SET,
    MARKUP_DELETE,
    MARKUP_EDIT,
    BG_COLOR_WHITE, 
    BG_COLOR_GRAY,
    BG_COLOR_BLACK,
    BG_COLOR_BULE
} from '../constant';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    Root: {
        width: SIDEBAR_WIDTH,
        marginTop: 10,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    setupbar: {
        height: 80,
        color: 'black',
        borderBottom: '1px solid black',
        alignItems: 'end',
    },

    text: {
        marginTop: 20,
        width: '100%',
    },
    fullWidth: {
        width: '100%',
    },
    end: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

const ColorButton = withStyles((theme) => ({
    root: {
        width: (props) => (props.width?props.width:'100%'),
        height: '45px',
        color: (props) => (props.txtcolor),
        paddingTop: '2px',
        paddingBottom: '2px',
        textTransform: 'none',
        backgroundColor: (props) => (`${props.bgcolor} !important`),
        border: (props) => (`2px solid ${props.bgcolor} !important`),
        '&:hover': {
            opacity: '.7',
            borderColor: (props) => (`${props.brcolor} !important`),
        },
    },
}))(Button);

export const SetupSiteBar = forwardRef((props, ref) => {
    const {
        drawPolygon, 
        deletePolygon,
        createSite, 
        markupSite, 
        siteInfo, 
        deleteMarkup, 
        getSiteName, 
        getAddress, 
        siteName, 
        siteAddress, 
        isMapLoading,
        isExistPolygon,
        isExistMarkup,
    } = props;
    const classes = useStyles();
    const [bdStatus, setBdStatus] = useState(BOUNDARY_NONE);
    const [mkStatus, setMkStatus] = useState(MARKUP_NONE);
    const [bgcolor, setbgcolor] = useState(BG_COLOR_WHITE);
    const history = useNavigate();

    const editPolygon = () => {

    }

    const setPolygon = () => {
        setBdStatus(BOUNDARY_SET);
        drawPolygon(true);
        setMkStatus(MARKUP_NONE);
    }

    useImperativeHandle(ref, () => ({ setBdStatus, setMkStatus }), [ ])
    
    const handleSiteName = (event) => {
        getSiteName(event.target.value);
    }

    const handleSiteAddress = (event) => {
        getAddress(event.target.value);
    }

    const cancelSite = () => {
        history('/');
    }
    useEffect(() => {
        if(bdStatus !== BOUNDARY_NONE || mkStatus !== MARKUP_NONE)
            setbgcolor(BG_COLOR_GRAY);
        else
            setbgcolor(BG_COLOR_WHITE);
    }, [ bdStatus, mkStatus, siteInfo, getSiteName, getAddress ])

    return (
        <>
            <div className={classes.Root} style={{backgroundColor: bgcolor}}>
                <div className={classes.container}>
                    <div className={classes.setupbar}>
                        {(siteInfo && Object.keys(siteInfo).length === 0)? <h3>Setup New Site</h3>:<h3>Edit Site</h3>}
                    </div>

                    <div className={classes.text}>
                        <p>Site Name</p>
                        <OutlinedInput className = {classes.fullWidth} placeholder="Please Site Name" value={siteName} onChange={handleSiteName} />
                    </div>

                    <div className={classes.text}>
                        <p>Site Address</p>
                        <OutlinedInput className = {classes.fullWidth} placeholder="Please Site Address" value={siteAddress} onChange={handleSiteAddress} />
                    </div>
                    {!isMapLoading && 
                        <div className = {classes.end}>
                            {(isExistPolygon === true)?(
                                <>
                                    <ColorButton 
                                        onClick={() => editPolygon()} 
                                        bgcolor = {BG_COLOR_GRAY}
                                        brcolor = {BG_COLOR_BULE}
                                        txtcolor = {BG_COLOR_BLACK}
                                    >
                                        Edit Site Boundary
                                    </ColorButton>
                                    <IconButton aria-label="delete" onClick = {() => {deletePolygon(); setBdStatus(BOUNDARY_NONE);}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            ):(<>
                                <ColorButton 
                                    onClick={() => setPolygon()} 
                                    width = '100%' 
                                    bgcolor = {(bdStatus === BOUNDARY_NONE)?((mkStatus === MARKUP_NONE)?BG_COLOR_WHITE:BG_COLOR_GRAY):BG_COLOR_BULE} 
                                    brcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_GRAY:BG_COLOR_BULE}
                                    txtcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_BLACK:BG_COLOR_WHITE}
                                >
                                    Set Site Boundary
                                </ColorButton>
                            </>)}
                        </div>
                    }
                    <div className={classes.end}>
                        {(isExistMarkup === false)?(
                            <ColorButton 
                                onClick={() => {markupSite();setMkStatus(MARKUP_SET);}} 
                                width = '100%' 
                                bgcolor = {(mkStatus === MARKUP_NONE)?((bdStatus === BOUNDARY_NONE)?BG_COLOR_WHITE:BG_COLOR_GRAY):BG_COLOR_BULE} 
                                brcolor = {(mkStatus === MARKUP_NONE)?BG_COLOR_GRAY:BG_COLOR_BULE}
                                txtcolor = {(mkStatus === MARKUP_NONE)?BG_COLOR_BLACK:BG_COLOR_WHITE}
                            >
                                <span>Markup Site</span>
                                <CollectionsBookmarkOutlinedIcon />
                            </ColorButton>
                        ):(
                            <>
                                <ColorButton 
                                    onClick={() => editPolygon()} 
                                    bgcolor = {BG_COLOR_GRAY}
                                    brcolor = {BG_COLOR_BULE}
                                    txtcolor = {BG_COLOR_BLACK}
                                >
                                    Edit Site Markup
                                </ColorButton>
                                <IconButton aria-label="delete" onClick = {() => {deleteMarkup();}}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </div>
                    <div className={classes.end}>
                        <ColorButton onClick={() => createSite()} width = '40%' bgcolor = {BG_COLOR_BULE} txtcolor={BG_COLOR_WHITE}>
                            <span>Create Site</span>
                        </ColorButton>
                        <ColorButton 
                            width = '40%'
                            onClick={() => cancelSite()} 
                            bgcolor = {BG_COLOR_GRAY}
                            brcolor = {BG_COLOR_BULE}
                            txtcolor = {BG_COLOR_BLACK}
                        >
                            Cancel
                        </ColorButton>
                    </div>

                </div>
            </div>
        </>
    )
})
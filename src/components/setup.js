import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { SIDEBAR_WIDTH} from '../constant';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
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
import { ReactComponent as Star } from '../images/star.svg'
import { ReactComponent as EditIcon } from '../images/edit.svg'
import { ReactComponent as MarkupIcon } from '../images/markup.svg'
import { ReactComponent as DeleteIcon } from '../images/delete.svg'
import Loading from './Spinner';

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
        display: 'flex',
        height: 50,
        color: 'black',
        borderBottom: '1px solid black',
        paddingBottom: 10,
        fontSize: 20,
        alignItems: 'end',
        marginBottom: 20
    },

    text: {
        marginTop: 40,
        width: '100%',
        fontSize: 14,
    },
    fullWidth: {
        width: '100%',
        height: 53,
        marginTop: 10,
        backgroundColor: '#ECF4FF',
    },
    end: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    markup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    star:{
        position: 'absolute',
        top: -3,
        right: -8,
    }
});

const ColorButton = withStyles((theme) => ({
    root: {
        width: (props) => (props.width?props.width:'100%'),
        height: (props) => (props.height?props.height:'53px'),
        color: (props) => (props.txtcolor),
        paddingTop: '2px',
        paddingBottom: '2px',
        textTransform: 'none',
        backgroundColor: (props) => (props.bgcolor),
        border: (props) => (`1px solid ${props.brcolor} !important`),
        '&:hover': {
            opacity: '.7',
            borderColor: (props) => (`${props.brcolor} !important`),
        },
    },
}))(Button);

const SaveButton = withStyles((theme) => ({
    root: {
        width: '40%',
        height: 40,
        color: 'white',
        paddingTop: '2px',
        paddingBottom: '2px',
        textTransform: 'none',
        backgroundColor: '#0066ffef !important',
        border: '#0066ffef !important',
        '&:hover': {
            opacity: '.7',
            borderColor: '#0066ffef !important',
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
        siteID,
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
        setMkStatus(MARKUP_NONE);
        drawPolygon(true);
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
                        {(siteInfo && Object.keys(siteInfo).length === 0)?'Setup a new site':'Edit Site'}
                    </div>

                    <div className={classes.text}>
                        <span style = {{position: 'relative'}}>Site Name<Star className = {classes.star}/></span>
                        <OutlinedInput className = {classes.fullWidth} value={siteName} onChange={handleSiteName} />
                    </div>

                    <div className={classes.text}>
                        <span style = {{position: 'relative'}}>Site Address<Star className = {classes.star}/></span>
                        <OutlinedInput className = {classes.fullWidth} value={siteAddress} onChange={handleSiteAddress} />
                    </div>
                    {isMapLoading?<Loading />:(
                        <div className = {classes.end}>
                            {(isExistPolygon === true)?(
                                <>
                                    <ColorButton 
                                        width = '80%'
                                        onClick={() => editPolygon()} 
                                        bgcolor = {BG_COLOR_WHITE}
                                        brcolor = {BG_COLOR_BULE}
                                        txtcolor = {BG_COLOR_BLACK}
                                    >
                                        Edit Site Boundary
                                        <EditIcon style = {{marginLeft: 10}}/>
                                    </ColorButton>
                                    <IconButton aria-label="delete" onClick = {() => {deletePolygon(); setBdStatus(BOUNDARY_NONE);}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            ):(<>
                                <ColorButton 
                                    onClick={() => setPolygon()} 
                                    width = '100%' 
                                    bgcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_WHITE:BG_COLOR_BULE}
                                    brcolor = {BG_COLOR_GRAY}
                                    txtcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_BLACK:BG_COLOR_WHITE}
                                >
                                    Set site boundary
                                    <EditIcon style = {{marginLeft: 10}}/>
                                </ColorButton>
                            </>)}
                        </div>
                    )}
                    
                    <span style={{fontSize: 10, fontWeight: 300, color: BG_COLOR_BLACK, marginTop: 40, paddingBottom: 10}}>Site boundary must be set before markup can be added</span>
                    <div className={classes.markup}>
                        {(isExistMarkup === false)?(
                            <ColorButton 
                                onClick={() => {markupSite();}} 
                                width = '100%' 
                                bgcolor = {BG_COLOR_WHITE}
                                brcolor = {BG_COLOR_GRAY}
                                txtcolor = {BG_COLOR_BLACK}
                            >
                                <span>Markup site</span>
                                <MarkupIcon  s  tyle = {{marginLeft: 10}}/>
                            </ColorButton>
                        ):(
                            <>
                                <ColorButton 
                                    onClick={() => editPolygon()} 
                                    width = '80%' 
                                    bgcolor = {BG_COLOR_WHITE}
                                    brcolor = {BG_COLOR_BULE}
                                    txtcolor = {BG_COLOR_BLACK}
                                >
                                    Edit Site Markup
                                    <MarkupIcon  style = {{marginLeft: 10}}/>
                                </ColorButton>
                                <IconButton aria-label="delete" onClick = {() => {deleteMarkup();}}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </div>
                    <div className={classes.end} style = {{padding: '0 10px 0 10px'}}>
                        <SaveButton 
                            onClick={() => createSite()} 
                            width = '45%'
                            bgcolor = {BG_COLOR_BULE} 
                            brcolor = {BG_COLOR_BULE} 
                            txtcolor={BG_COLOR_WHITE}
                        >
                            <span>{(siteID === null || siteID === undefined)?"Create site":"Update site"}</span>
                        </SaveButton>
                        <ColorButton 
                            width = '45%'
                            height = '40px'
                            onClick={() => cancelSite()} 
                            bgcolor = {BG_COLOR_WHITE}
                            brcolor = {BG_COLOR_WHITE}
                            txtcolor = '#1875F0'
                        >
                            Cancel
                        </ColorButton>
                    </div>
                </div>
            </div>
        </>
    )
})
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { BG_COLOR_LITTLE_GRAY, SIDEBAR_WIDTH} from '../constant';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { 
    BOUNDARY_NONE,
    BOUNDARY_SET,
    MARKUP_NONE,
    BG_COLOR_WHITE, 
    BG_COLOR_GRAY,
    BG_COLOR_BLACK,
    BG_COLOR_BULE,
    BG_COLOR_BULE_LITTLE
} from '../constant';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../images/star.svg';
import { ReactComponent as EditIcon } from '../images/edit.svg';
import { ReactComponent as MarkupIcon } from '../images/markup.svg';
import { ReactComponent as DeleteIcon } from '../images/delete.svg';
import { ReactComponent as WhiteEditIcon } from '../images/whiteedit.svg';

import Loading from './Spinner';

const useStyles = makeStyles({
    root: {
        width: SIDEBAR_WIDTH,
        marginTop: 10,
        height: '100%',
        overflow: 'auto',
        paddingLeft: 23,
        paddingRight: 27,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    setupbar: {
        display: 'flex',
        height: 50,
        color: 'black',
        borderBottom: '1px solid #E5E5E5',
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
    input: {
        width: '100%',
        height: 53,
        marginTop: 10,
        backgroundColor: '#ECF4FF',
        '& > fieldset': {
            backgroundColor: (props) => (props.bgcolor),
            border: (props) => (`1px solid ${props.brcolor} !important`),
            borderWidth: '1px !important',
            borderColor: `${BG_COLOR_LITTLE_GRAY} !important`,
        },
        '&:hover > fieldset': {
            opacity: '.7',
            borderColor: `${BG_COLOR_BULE} !important`,
        },
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
        top: -1,
        right: -5,
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
            borderColor: (props) => (`${props.hrcolor} !important`),
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
            <div className={classes.root} style={{backgroundColor: bgcolor}}>
                <div className={classes.container}>
                    <div className={classes.setupbar}>
                        {(siteInfo && Object.keys(siteInfo).length === 0)?'Setup a new site':'Edit Site'}
                    </div>

                    <div className={classes.text}>
                        <span style = {{position: 'relative'}}>Site Name<Star className = {classes.star}/></span>
                        <OutlinedInput className = {classes.input} value={siteName} onChange={handleSiteName} />
                    </div>

                    <div className={classes.text}>
                        <span style = {{position: 'relative'}}>Site Address<Star className = {classes.star}/></span>
                        <OutlinedInput className = {classes.input} value={siteAddress} onChange={handleSiteAddress} />
                    </div>
                    {isMapLoading?<Loading />:(
                        <div className = {classes.end}>
                            {(isExistPolygon === true)?(
                                <>
                                    <ColorButton 
                                        width = '80%'
                                        onClick={() => editPolygon()} 
                                        bgcolor = {BG_COLOR_WHITE}
                                        brcolor = {BG_COLOR_LITTLE_GRAY}
                                        txtcolor = {BG_COLOR_BLACK}
                                        hrcolor = {BG_COLOR_BULE_LITTLE}
                                    >
                                        Edit Site Boundary
                                        <EditIcon style = {{marginLeft: 35}}/>
                                    </ColorButton>
                                    <IconButton aria-label="delete" onClick = {() => {deletePolygon(); setBdStatus(BOUNDARY_NONE);}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            ):(<>
                                <ColorButton 
                                    onClick={() => setPolygon()} 
                                    width = '305px' 
                                    bgcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_WHITE:BG_COLOR_BULE}
                                    brcolor = {BG_COLOR_GRAY}
                                    txtcolor = {(bdStatus === BOUNDARY_NONE)?BG_COLOR_BLACK:BG_COLOR_WHITE}
                                    hrcolor = {BG_COLOR_BULE_LITTLE}
                                >
                                    Set site boundary 
                                    {(bdStatus === BOUNDARY_NONE)?<EditIcon style = {{marginLeft: 14}}/>:<WhiteEditIcon style = {{marginLeft: 14}} />}
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
                                hrcolor = {BG_COLOR_BULE}
                            >
                                <span>Markup site</span>
                                <MarkupIcon  style = {{marginLeft: 19}}/>
                            </ColorButton>
                        ):(
                            <>
                                <ColorButton 
                                    onClick={() => editPolygon()} 
                                    width = '80%' 
                                    bgcolor = {BG_COLOR_WHITE}
                                    brcolor = {BG_COLOR_LITTLE_GRAY}
                                    txtcolor = {BG_COLOR_BLACK}
                                    hrcolor = {BG_COLOR_BULE}
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
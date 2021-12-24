import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import { Container, Row, Col } from 'react-grid-system';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';

import { ReactComponent as WorkersIcon } from '../images/workers.svg';
import { ReactComponent as VisitorsIcon } from '../images/visitors.svg';
import { ReactComponent as WarningIcon } from '../images/warning.svg';
import { ReactComponent as PinIcon } from '../images/pin.svg';
import { ReactComponent as WhiteArrowIcon } from '../images/whitearrow.svg';

import '../css/style.css';

const ColorButton = withStyles((theme) => ({
    root: {
        width: (props) => (!props.width?props.width:'100%'),
        height: '35px',
        color: 'white',
        paddingTop: '2px',
        paddingBottom: '2px',
        textTransform: 'none',
        borderRadius: 0,
        backgroundColor: '#0066ffef !important',
        border: '2px solid #0066ffef',
        '&:hover': {
            opacity: '.7',
            borderColor: '#0066ffef !important',
        },
    },
  }))(Button);

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        height: 150,
        width: '70%',
        textAlign: 'center',
        // boxShadow: '3px 3px 2px 1px rgb(242, 242,242)',
        position: 'absolute',
        bottom: 30,
        borderRadius: 10,
        ['@media (max-width:1250px)']: { // eslint-disable-line no-useless-computed-key
            height:180,
            width:'65%'
        },
        ['@media (max-width:1175px)']: { // eslint-disable-line no-useless-computed-key
            height:190,
            width:'65%'
        },
        ['@media (max-width:1100px)']: { // eslint-disable-line no-useless-computed-key
            height:200,
            width:'62%'
        },
        ['@media (max-width:1055px)']: { // eslint-disable-line no-useless-computed-key
            height:220,
            width:'60%'
        },
        ['@media (max-width:950px)']: { // eslint-disable-line no-useless-computed-key
            height:250,
            width:'55%'
        },
        ['@media (max-width:945px)']: { // eslint-disable-line no-useless-computed-key
            display: 'none'
        },
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20px 0 0 10px',
        margin: 0,
    },
    icon: {
        marginRight: 10,
    }
});

const workers = 320;
const visitors = 52;
const hazards = 2;

export default function PopOver(props){
    const siteInfo = props.siteInfo;
    const sitemappingId  = props.siteInfo.sitemappingId;
    const isRoot = (siteInfo?.data?.Sitename === 'Site Overview'?true: false);

    const classes = useStyles();
    let history = useNavigate();

    const manageSite = () => {
        history(`/showsite/managesite/${sitemappingId}`);
    }
    return (
        <div className={classes.root}>
            <Container>
                <Row>
                    <Col sm = {11} xs = {11} md = {isRoot?8:6} lg = {isRoot?8:6}>
                        <div className={classes.column}>
                            <div className={classes.row}><p style = {{fontSize: 20, fontWeight: 'bold'}}>{isRoot?("\"Company Name\" " + siteInfo?.data?.Sitename):("Site Overview: " + siteInfo?.data?.Sitename)}</p></div>
                            <div className={classes.row}>
                                <PinIcon className={classes.icon}/><p>{isRoot?("Company Address: " + siteInfo?.data?.Siteaddress):("Address: " + siteInfo?.data?.Siteaddress)}</p>
                            </div>
                            <div className={classes.row}>
                                {isRoot?(<><BookmarkBorderOutlinedIcon className={classes.icon} /><p>{"Sites managed: " + 5}</p></>):
                                    (<><DateRangeOutlinedIcon  className={classes.icon}/><p>{"Start Date: 01-03-2018"}</p></>)}
                            </div>
                        </div>
                    </Col>
                    <Col sm = {12} xs = {12} md = {isRoot?4:4} lg = {isRoot?4:4}>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Divider orientation="vertical" flexItem style = {{marginTop: 30}}/>
                            <div style = {{marginLeft: 20}} className={classes.column}>
                                <div className={classes.row}>
                                    <WorkersIcon className={classes.icon}/>
                                    <p style={{color: '#1875F0'}}>{"Total workers on Sites: " + workers}</p>
                                </div>
                                <div className={classes.row}>
                                    <VisitorsIcon className={classes.icon}/>
                                    <p style={{color: '#1875F0'}}>{"Total visitors on Sites: " + visitors}</p>
                                </div>
                                <div className={classes.row}>
                                    <WarningIcon className={classes.icon} />
                                    <p style = {{color: '#EF4F4F'}}>{"Total open hazards on Sites: " + hazards}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {!isRoot && 
                        <Col sm = {12} xs = {12} md = {2} lg = {2} style={{display: isRoot?'none':'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <ColorButton onClick={() => manageSite()}>
                                <SettingsIcon style = {{marginRight: 10}} /><span>Manage</span><WhiteArrowIcon style = {{marginLeft: 10}} />
                            </ColorButton>
                        </Col>
                    }
                </Row>
            </Container>
        </div>
    )
}
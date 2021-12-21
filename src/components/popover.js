import Button from '@mui/material/Button';
import { makeStyles, withStyles } from '@mui/styles';
import { Container, Row, Col } from 'react-grid-system';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../css/style.css';

const ColorButton = withStyles((theme) => ({
    root: {
        width: (props) => (!props.width?props.width:'100%'),
        height: '35px',
        color: 'white',
        paddingTop: '2px',
        paddingBottom: '2px',
        textTransform: 'none',
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
        boxShadow: '3px 3px 2px 1px rgb(242, 242,242)',
        position: 'absolute',
        top: 500,
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
export default function PopOver(props){
    const siteInfo = props.siteInfo;
    const sitemappingId  = props.sitemappingId;
    const isRoot = (siteInfo?.Sitename === 'Site Overview'?true: false);

    const classes = useStyles();
    let history = useNavigate();

    const manageSite = () => {
        history(`/showsite/${sitemappingId}`);
    }
    return (
        <div className={classes.root}>
            <Container>
                <Row>
                    <Col sm = {11} xs = {11} md = {isRoot?8:6} lg = {isRoot?8:6}>
                        <div className={classes.column}>
                            <div className={classes.row}><p style = {{fontSize: 20, fontWeight: 'bold'}}>{isRoot?("\"Company Name\": " + siteInfo?.data?.Sitename):("Site Overview: " + siteInfo?.data?.Sitename)}</p></div>
                            <div className={classes.row}>
                                <AddLocationOutlinedIcon className={classes.icon}/><p>{isRoot?("Company Address: " + siteInfo?.data?.Siteaddress):("Address: " + siteInfo?.data?.Siteaddress)}</p>
                            </div>
                            <div className={classes.row}>
                                {isRoot?(<><BookmarkBorderOutlinedIcon className={classes.icon} /><p>{"Sites managed: " + 5}</p></>):
                                    (<><DateRangeOutlinedIcon  className={classes.icon}/><p>{"Start Date: 01-03-2018"}</p></>)}
                            </div>
                        </div>
                    </Col>
                    <Col sm = {12} xs = {12} md = {isRoot?4:4} lg = {isRoot?4:4}>
                        <div style = {{display: 'flex', flexDirection: 'row'}}>
                            <Divider orientation="vertical" flexItem />
                            <div style = {{marginLeft: 20}} className={classes.column}>
                                <div className={classes.row}>
                                    <GroupsIcon className={classes.icon}/>
                                    <p style={{color: 'blue'}}>{"Total workers on Sites: " + siteInfo?.data?.worker}</p>
                                </div>
                                <div className={classes.row}>
                                    <VisibilityOutlinedIcon className={classes.icon}/>
                                    <p style={{color: 'blue'}}>{"Total visitors on Sites: " + siteInfo?.data?.visitor}</p>
                                </div>
                                <div className={classes.row}>
                                    <ReportGmailerrorredOutlinedIcon className={classes.icon} />
                                    <p style = {{color: 'red'}}>{"Total open hazards on Sites: " + siteInfo?.data?.hazard}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm = {12} xs = {12} md = {2} lg = {2} style={{display: isRoot?'none':'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <ColorButton onClick={() => manageSite()}>
                            <SettingsIcon style = {{marginRight: 10}} /><span>Manage</span><ArrowForwardIosIcon style = {{marginLeft: 10}} />
                        </ColorButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
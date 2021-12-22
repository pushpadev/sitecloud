import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EventIcon from '@mui/icons-material/Event';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MENUBAR_WIDTH } from '../constant';
import { makeStyles } from '@mui/styles';
import { useNavigate, Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: MENUBAR_WIDTH,
        padding: 0,
        marginTop: 0,
    },
    selected: {
        backgroundColor: '#0066ffef',
        borderColor: '#0066ffef',
        color: 'white',
        '&:hover': {
            opacity: '.7',
            borderColor: '#39c46aef',
            color: 'black'
        },
    },
    hrselected: {
        backgroundColor: '#0066ffef',
        borderColor: '#0066ffef',
        color: 'white',
    }
});



export const MenuBar = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [openSubMenu, setOpenSubMenu] = useState(false);
    const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
    };

    return (
        <div
            //  ref = {sideBarEl} 
            className={classes.root}
        >
            <span className="sideMenu_bar">
                <List className="list" component="nav" >
                    <ListItem button >
                        <ListItemIcon>
                            <ArrowBackIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.siteName} />
                    </ListItem>
                    <Divider />
                    <ListItem button >
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Site" />
                    </ListItem>

                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Attendence" />

                        {openSubMenu ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                    </ListItem>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {/* Sub element 1st Starts */}
                            <Link to="/liveAttendence" className='link_text'>
                                <ListItem button >
                                    <ListItemIcon>
                                        <AccessTimeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Live Attendence" />
                                </ListItem>
                            </Link>

                            {/* Sub element 1st ends */}

                            {/* Sub element 2nd Starts */}
                            <ListItem button >
                                <ListItemIcon>
                                    <DateRangeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Daily Attendence" />
                            </ListItem>
                            {/* Sub element 2nd ends */}

                            {/* Sub element 3rd Starts */}

                            <ListItem button >
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Attendence History" />
                            </ListItem>

                            {/* Sub element 3rd ends */}

                            {/* Sub element 4th Starts */}
                            <ListItem button >
                                <ListItemIcon>
                                    <LoginOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Manual Sign-in" />
                            </ListItem>
                            {/* Sub element 4th ends */}
                        </List>
                    </Collapse>

                    <ListItem button >
                        <ListItemIcon>
                            <PlaylistAddCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inductions" />
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pre-Start and Daily Briefing" />
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon>
                            <AddCommentOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Safety and Notices" />
                    </ListItem>

                    <ListItem button >
                        <ListItemIcon>
                            <FeedOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Safety Work Method Statements" />
                    </ListItem>

                    <ListItem button >
                        <ListItemIcon>
                            <EditRoadOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Site Permits" />
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon>
                            <ErrorOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hazard and Issues" />
                    </ListItem>
                </List>
            </span>
        </div>
    )
}
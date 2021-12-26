import React, { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SIDEBAR_WIDTH, SITE_LIST, MAP_VIEW} from '../constant';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const useStyles = makeStyles({
    root: {
        width: SIDEBAR_WIDTH,
        overflow: 'auto'
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

const mapStyle = {
    height: 80,
}

export const SideBar = ({ getSelectedItem, sites }) => {
    const classes = useStyles();
    const history = useNavigate();
    // const sideBarEl = useRef(null);

    const [selectedIndex, setSelected] = useState(0);

    const isSelected = (item) => {
        return selectedIndex === item;
    }

    const onSelected = (id, item) => {
        setSelected(id);
        getSelectedItem(id, item);
    }
    
    // useEffect(() => {
    //     console.log('width', sideBarEl.current ? sideBarEl.current.offsetWidth : 0);
    // }, [])
    return (
        <div
            // ref = {sideBarEl} 
            className={classes.root}
        >
            <List className="list" component="nav" >
                <ListItem
                    className={isSelected(0) ? classes.hrselected : null}
                    style = {mapStyle}
                    onClick={() => onSelected(0, MAP_VIEW)}
                >
                    {isSelected(0)?<img src = '/map.png' alt='map' />:<></>}
                    <ListItemText primary='Map View'></ListItemText>
                </ListItem>
                <Divider/>
                {(sites.length > 0) && sites.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                {/* {console.log("item " + i + '====' + isSelected(i) ? 'selected' : null)} */}
                                <ListItem
                                    button={true} 
                                    className={isSelected(i + 1) ? classes.selected : null} 
                                    onClick={() => onSelected(i + 1, item)}
                                    onDoubleClick={() => history(`/showsite/managesite/${item.sitemappingId}`)}
                                >
                                    <ListItemText primary={item.data.Sitename} ></ListItemText>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        )
                    })
                }
            </List>
        </div>
    )
}
import React, { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { SIDEBAR_WIDTH, SITE_LIST} from '../constant';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: SIDEBAR_WIDTH,
        // ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
        //     display: 'none'
        // },
        // ['@media (min-width:790px)']: { // eslint-disable-line no-useless-computed-key
        //     display: 'block'
        // }
    },
    siteBar: {
        backgroundColor: '#0066ffef',
        height: 80,
        color: 'white'
    },
    selected: {
        backgroundColor: '#0066ffef',
    }
});

export const SideBar = ({ getSelectedItem, sites }) => {
    const classes = useStyles();
    const history = useNavigate();
    const sideBarEl = useRef(null);

    const [selectedIndex, setSelected] = useState(null);

    const isSelected = (item) => {
        return selectedIndex === item;
    }

    const onSelected = (id, item) => {
        setSelected(id);
        getSelectedItem(item);
    }

    
    useEffect(() => {
        console.log('width', sideBarEl.current ? sideBarEl.current.offsetWidth : 0);
    }, [])
    return (
        <div ref = {sideBarEl} className={classes.root}>
            <List className="list" component="nav">
                <ListItem
                    className={classes.siteBar}
                >
                    <img src = '/map.png' alt='map'></img>
                    <ListItemText primary='Map View' ></ListItemText>
                </ListItem>
                {(sites.length > 0) && sites.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                {/* {console.log("item " + i + '====' + isSelected(i) ? 'selected' : null)} */}
                                <ListItem
                                    button={true} 
                                    className={isSelected(i) ? classes.selected : null} 
                                    onClick={() => onSelected(i, item)}
                                    onDoubleClick={() => history(`/showsite/${item.sitemappingId}`)}
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
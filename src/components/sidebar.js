import React, { useState } from 'react';
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
    },
    siteBar: {
        backgroundColor: '#0066ffef',
        height: 80,
        color: 'white'
    },
});

export const SideBar = ({ getSelectedItem, sites }) => {
    const classes = useStyles();
    const history = useNavigate();

    const [selectedIndex, setSelected] = useState(null);

    const isSelected = (item) => {
        return selectedIndex === item;
    }

    const onSelected = (id, item) => {
        setSelected(id);
        getSelectedItem(item);
    }

    return (
        <div className={classes.root}>
            <List className="list" component="nav">
                <ListItem
                    className={classes.siteBar}
                >
                    <img src = '/map.png' alt='map'></img>
                    <ListItemText primary='Map View' ></ListItemText>
                </ListItem>
                {(sites.length > 0) && sites.map((item, i) => {
                        return (
                            <React.Fragment key={item.sitemappingId}>
                                <ListItem
                                    button 
                                    className={isSelected(i) ? 'selected' : null} 
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
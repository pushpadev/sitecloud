import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ICON_LIST, ICONBAR_WIDTH, SIDEBAR_WIDTH} from '../constant';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        width: ICONBAR_WIDTH, 
        backgroundColor: 'white',
        position: 'absolute',
        top: 85,
        left: SIDEBAR_WIDTH,
    },
    siteBar: {
        backgroundColor: '#0066ffef',
        height: 80,
        color: 'white'
    },
    itemSpace: {
        marginLeft: 10,
    },
    font20: {
        fontSize: 20,
    }
});

export default function IconBar({dragItem}){
    const classes = useStyles();

    const [selectedIndex, setSelected] = useState(null);

    const isSelected = (item) => {
        return selectedIndex === item;
    }

    const onSelected = (item) => {
        setSelected(item);
    }

    return (
        <div className={classes.root}>
            <List className="list" component="nav">
                <ListItem
                >
                    <ListItemText primary='Drag and Drop to add item' />
                </ListItem>
                {ICON_LIST.map((item, i) => {
                    return (
                        <div draggable onDragStart={()=> dragItem(item)} key={item.id}>
                            <ListItem
                                button
                                className={isSelected(i) ? 'selected' : null} 
                                onClick={() => onSelected(i)}
                            >
                                {item.icon}
                                <ListItemText className = {classes.itemSpace} primary={item.value} ></ListItemText>
                            </ListItem>
                            {(ICON_LIST.length - 1) === i?<></>:<Divider/>}
                        </div>
                    )
                })}
            </List>
        </div>
    )
}
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ICON_LIST, ICONBAR_WIDTH, SIDEBAR_WIDTH} from '../constant';
import { makeStyles } from '@mui/styles';
import { ReactComponent as DetailIcon } from '../images/markups/detail.svg';
import { ReactComponent as LeftArrowIcon } from '../images/markups/leftarrow.svg';
import { ReactComponent as RigthArrowIcon } from '../images/markups/rightarrow.svg';
import { ReactComponent as UpArrowIcon } from '../images/markups/uparrow.svg';
import { ReactComponent as DownArrowIcon } from '../images/markups/downarrow.svg';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    root: {
        width: ICONBAR_WIDTH, 
        position: 'absolute',
        top: 85,
        left: SIDEBAR_WIDTH + 20,
        backgroundColor: '#FAFAFA',
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
    },
    markupItem: {
        padding: 5, 
        borderRadius: 8, 
        border: '1px solid white', 
        backgroundColor: 'white', 
        marginLeft: 8, 
        marginTop: 5, 
        marginRight: 8, 
        height: 45,
        '&:hover': {
            opacity: '.7',
            borderColor: '#1875F0',
            backgroundColor: '#FAFAFA',
        },
    },
    arrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        padding: '0, 8px, 0, 8px',
    },
    arrowBtn: {
        width: 45,
        height: 45,
        minWidth: 45,
        minHeight: 45,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default function IconBar({dragItem}){
    const classes = useStyles();

    const [selectedIndex, setSelected] = useState(null);

    const arrowBtn = (
        <div className={classes.arrow}>
            <Button className={classes.arrowBtn}><RigthArrowIcon /></Button>
            <Button className={classes.arrowBtn}><UpArrowIcon /></Button>
            <Button className={classes.arrowBtn}><LeftArrowIcon /></Button>
            <Button className={classes.arrowBtn}><DownArrowIcon /></Button>
        </div>);
    
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
                        <div className={classes.markupItem}>
                            <ListItem
                                className={isSelected(i) ? 'selected' : null} 
                                onClick={() => onSelected(i)}
                                draggable onDragStart={()=> dragItem(item)} key={item.id}
                            >
                                {item.icon}
                                <ListItemText className = {classes.itemSpace} primary={item.value} ></ListItemText>
                                <DetailIcon />
                            </ListItem>
                        </div>
                    )
                })}
                {arrowBtn}
            </List>
        </div>
    )
}
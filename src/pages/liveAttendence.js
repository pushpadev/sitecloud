import React from 'react';
import AttendenceDetails from '../components/AttendenceDetails';
import { MenuBar } from '../components/MenuNavBar';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },

});

const LiveAttendence = () => {
    const classes = useStyles();


    return (
        <div className={classes.root} >
            <MenuBar siteName="Site 1" />
            <AttendenceDetails />
        </div>
    );
}

export default LiveAttendence;


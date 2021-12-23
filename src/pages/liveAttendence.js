import React from 'react';
import AttendenceDetails from '../components/AttendenceDetails';
import { MenuBar } from '../components/MenuNavBar';
import { makeStyles } from '@mui/styles';
import AttendanceTable from '../components/AttendanceTable';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },

});

const LiveAttendence = () => {
    const classes = useStyles();


    return (
        <>

            <div className={classes.root} >
                <MenuBar siteName="Site 1" />
                <AttendenceDetails />
                {/* <AttendanceTable /> */}
            </div>
        </>
    );
}

export default LiveAttendence;


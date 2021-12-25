import React from 'react'
import { MenuBar } from '../components/MenuNavBar';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },

});

const Profile = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <MenuBar siteName="Site 1" />
            My Profile
        </div>
    )
}

export default Profile

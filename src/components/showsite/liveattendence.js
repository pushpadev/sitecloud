import React from 'react';
import { makeStyles } from '@mui/styles';
import AttendenceTitle from './titlebar';
import { SHOWBAR_WIDTH } from '../../constant';
import EnhancedTable from './table';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100vw - ${SHOWBAR_WIDTH}px - 10px)`,
    margin: '12px 12px',
  },
});

export default function LiveAttendence({siteInfo}) {
  const classes = useStyles();

  return (
    <div className = {classes.root} >
        <AttendenceTitle siteInfo = {siteInfo} />
        <EnhancedTable />
    </div>
  );
}

import React from "react";
import { createStyles, makeStyles } from '@mui/styles';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';

const useStyles = makeStyles((theme) =>
  createStyles({
    messageBlue: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: "relative",
        marginLeft: "20px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#0066ffef",
        color: 'white',
        width: 160,
        height: 25,
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        border: "1px solid #0066ffef",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "25px solid #0066ffef",
            borderLeft: "15px solid transparent",
            bottom: '-25px',
            right: '-1px'
        },
    },
    messageWhite: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "white",
      width: 160,
      height: 25,
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid white",
      "&:after": {
          content: "''",
          position: "absolute",
          width: "0",
          height: "0",
          borderTop: "25px solid white",
          borderLeft: "15px solid transparent",
          bottom: '-25px',
          right: '-1px'
      },
  },
    messageContent: {
      padding: 0,
      marginLeft: 10
    },
    displayName: {
      marginLeft: "20px"
    }
  })
);

export default function MapPin(props){
  const message = props.message;
  const classes = useStyles();
  return (
    <>
          <div className={(props.isSelec === true)?classes.messageBlue:classes.messageWhite}>
            <CollectionsBookmarkOutlinedIcon />
            <p className={classes.messageContent}>{message}</p>
          </div>
    </>
  );
};

import React from "react";
import { createStyles, makeStyles } from '@mui/styles';
import { ReactComponent as MapPinIcon } from '../images/mappin.svg';
import { ReactComponent as WhiteMapPinIcon } from '../images/whitemappin.svg';

import { BG_COLOR_WHITE } from '../constant';

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
    messageContentBlue: {
      padding: 0,
      marginLeft: 10,
      color: BG_COLOR_WHITE,
    },
    messageContentWhite: {
      padding: 0,
      marginLeft: 10,
      color: 'black',
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
            {(props.isSelec === true)?<WhiteMapPinIcon />: <MapPinIcon />}
            <span className={(props.isSelec === true)?classes.messageContentBlue:classes.messageContentWhite}>{message}</span>
          </div>
    </>
  );
};

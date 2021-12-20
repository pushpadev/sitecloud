import React, {useEffect, useState} from "react";
import { createStyles, makeStyles } from '@mui/styles';
import { ICON_LIST } from "../constant";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageBlue: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginLeft: "20px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: "#0066ffef",
        color: 'white',
        width: 25,
        height: 10,
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: "16px solid #0066ffef",
            borderLeft: "14px solid transparent",
            bottom: -10,
            right: 0
        },
        
    },
    messageWhite: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "white",
      width: 25,
      height: 10,
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      position: 'absolute',
      bottom: 0,
      right: 0,
      "&:after": {
          content: "''",
          position: "absolute",
          width: "0",
          height: "0",
          borderTop: "16px solid white",
          borderLeft: "14px solid transparent",
          bottom: -10,
          right: 0
      },
      
  },
  })
);

export default function IconPin(props){
  const classes = useStyles();
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    ICON_LIST.forEach(item => {
      if(item.value === props.icon)
        setIcon(item.icon);
    })
  }, [props])
  return (
    <div className={(props.isSelec === true)?classes.messageBlue:classes.messageWhite}>
      {icon && icon}
    </div>
  );
};

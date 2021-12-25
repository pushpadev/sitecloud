import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { ReactComponent as PhoneIcon } from '../../images/account/phone.svg';
import { ReactComponent as MsgIcon } from '../../images/account/message.svg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '420px !important',
    padding: '27px 49px 23px 26px',
    backgroundColor: 'white',
    color: '#33323D',
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 700,
  },
  
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 31, 
    position: 'relative',
    borderBottom: '1px solid #DDE4EE',
    paddingBottom: 16,
  },

  date: {
    color: '#7A7A7A',
    fontSize: 11,
    fontWeight: 400,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  txt: {
      fontSize: 13,
      fontWeight: 700,
  },
});


const itemList = [
    {
        id: 1,
        description: 'Customer Support Number',
        icon: <PhoneIcon />,
        txt: '+1 14384 13135',
    },
    {
        id: 1,
        description: 'Customer Support Email',
        icon: <MsgIcon />,
        txt: 'gethelp@company.com',
    },
]

function NeedHelp({siteInfo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className = {classes.column}>
        <div className={classes.title}>Need Help ?</div>
        {itemList.map((item, index) => 
            <div key = {index} className={classes.item}>
                <div className={classes.date}>{item.description}</div>
                <div className={`${classes.row} ${classes.txt}`}>
                    <div>{item.icon}</div>
                    <div style = {{marginLeft: 20}}>{item.txt}</div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default NeedHelp;

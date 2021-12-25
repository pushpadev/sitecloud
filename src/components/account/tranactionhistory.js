import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

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


const tranactionItem = [
    {
        id: 1,
        date: '12 Aug 2021',
        number: '#534864343 ',
        comment: '-Monthly Charges',
    },
    {
        id: 2,
        date: '12 Aug 2021',
        number: '#534864343 ',
        comment: '-Monthly Charges',
    },
    {
        id: 3,
        date: '12 Aug 2021',
        number: '#534864343 ',
        comment: '-Monthly Charges',
    },
    {
        id: 4,
        date: '12 Aug 2021',
        number: '#534864343 ',
        comment: '-Monthly Charges',
    }
]

function TranactionHistory({siteInfo}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className = {classes.column}>
        <div className={classes.title}>Transaction History</div>
        {tranactionItem.map((item, index) => 
            <div key = {index} className={classes.item}>
                <div className={classes.date}>{item.date}</div>
                <div className={`${classes.row} ${classes.txt}`}>
                    <div>{item.number}</div>
                    <div style = {{marginLeft: 74}}>{item.comment}</div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default TranactionHistory;

import React, { useState } from 'react';
import { ReactComponent as EditIcon } from '../../images/account/edit.svg';
import { ReactComponent as PlusIcon } from '../../images/account/plus.svg';
import { ReactComponent as CardIcon } from '../../images/account/card.svg';
import { makeStyles, withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { ReactComponent as PlanIcon } from '../../images/account/plan.svg';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import OutlinedInput from '@mui/material/OutlinedInput';
import { BG_COLOR_WHITE, BG_COLOR_BOUNDARY_BTN, BG_COLOR_BULE_LITTLE, BG_COLOR_WARNING } from '../../constant';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '302px !important',
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

  description: {
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
      marginLeft: 19,
      fontSize: 13,
      fontWeight: 700,
  },

  // Dialog
  paper: { minWidth: "754px" },

  dialogContainer: {
    padding: '0px 82px 0px 82px',
  },

  dialogHeader: {
    paddingTop: '40px',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: '29px'
  },

  contentTxt: {
    color: '#7A7A7A',
    fontSize: 13,
    fontWeight: 400,
  },

  input: {
    marginTop: 18,
    width: '100%',
    height: 53,
    backgroundColor: 'white',
    '& > fieldset': {
        backgroundColor: (props) => (props.bgcolor),
        border: (props) => (`1px solid ${props.brcolor} !important`),
        borderWidth: '1px !important',
        borderColor: `#DBDBDB !important`,
    },
    '&:hover > fieldset': {
        opacity: '.7',
  }
},

});

const ColorButton = withStyles((theme) => ({
  root: {
      fontSize: 13,
      width: (props) => (props.width?props.width:'100%'),
      height: (props) => (props.height?props.height:'53px'),
      color: (props) => (props.txtcolor),
      paddingTop: '2px',
      paddingBottom: '2px',
      textTransform: 'none',
      borderRadius: 0,
      backgroundColor: (props) => (props.bgcolor),
      border: (props) => (`1px solid ${props.brcolor} !important`),
      '&:hover': {
          opacity: '.7',
          backgroundColor: (props) => (props.bgcolor),
          borderColor: (props) => (`${props.hrcolor} !important`),
      },
  },
}))(Button);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const editCardDialog = {
    title: 'Edit Card Information',
    cardNumber: 'Card number',
    expiryDate: 'Expiry Date',
    nameOnCard: 'Name on Card',
}

function Subscription({siteInfo}) {
  const classes = useStyles();

  const [accountName, setAccountName] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountName = (event) => {
    setAccountName(event.target.value);
  }

  const editCardInfo = (event) => {
    handleClickOpen(event);
  }

  const changePassword = (event) => {
    handleClickOpen(event);
  }

  const cardBody = (
  <>
    <div style={{marginTop: 35}}>
        <p className={classes.contentTxt}>{editCardDialog.cardNumber}</p>
        <OutlinedInput className = {classes.input} value={accountName} onChange={handleAccountName} />
    </div>
    <div style={{marginTop: 24}}>
        <p className={classes.contentTxt}>{editCardDialog.expiryDate}</p>
        <OutlinedInput className = {classes.input} value={accountName} onChange={handleAccountName} />
    </div>
    <div style={{marginTop: 24}}>
        <p className={classes.contentTxt}>{editCardDialog.nameOnCard}</p>
        <OutlinedInput className = {classes.input} value={accountName} onChange={handleAccountName} />
    </div>
  </>
  );

  return (
    <div className={classes.root}>
      <div className = {classes.column}>
        <div className={classes.title}>Subscription plan</div>
        <div className={classes.item}>
            <div className={classes.description}>Current Plan</div>
            <div className={classes.row}>
                <PlanIcon />
                <div className={classes.txt}>Gold Membership</div>
            </div>
            <ColorButton 
              style = {{position: 'absolute', top: 0, right: 0}} 
              brcolor = {BG_COLOR_WHITE}
              bgcolor = {BG_COLOR_WHITE}
              txtcolor = {BG_COLOR_BOUNDARY_BTN}
              hrcolor = {BG_COLOR_BULE_LITTLE}
              width = '155px'
              height = '35px'
            >
              <EditIcon style = {{marginRight: 14}} /><span>Change Plan</span>
            </ColorButton>
        </div>

        <div className={classes.item}>
            <div className={classes.description}>Card Info</div>
            <div className={classes.row}>
                <CardIcon />
                <div className={classes.txt}>****  -  ****  -  ****  -  2147</div>
            </div>
            <ColorButton 
              style = {{position: 'absolute', top: 0, right: 0}} 
              brcolor = {BG_COLOR_WHITE}
              bgcolor = {BG_COLOR_WHITE}
              txtcolor = {BG_COLOR_BOUNDARY_BTN}
              hrcolor = {BG_COLOR_BULE_LITTLE}
              width = '155px'
              height = '35px'
              onClick={editCardInfo}
            >
              <EditIcon style = {{marginRight: 14}} /><span>Edit Card Info</span>
            </ColorButton>
        </div>
        <div className={classes.row}>
            <ColorButton 
                brcolor = {BG_COLOR_WHITE}
                bgcolor = {BG_COLOR_WHITE}
                txtcolor = {BG_COLOR_BOUNDARY_BTN}
                hrcolor = {BG_COLOR_BULE_LITTLE}
                width = '245px'
                height = '35px'
                onClick={changePassword}
            >
              <PlusIcon style = {{marginRight: 14}} /><span>Add New Payment Method</span>
            </ColorButton>
        </div>
      </div>
      <BootstrapDialog
        classes={{ paper: classes.paper}}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
          <div className={classes.dialogContainer}>
            <div className={classes.dialogHeader}>
                <div style={{fontSize: 18, fontWeight: 700}}>
                    {editCardDialog.title}
                </div>
            </div>
          </div>
          <div className={classes.dialogContainer}>
            {cardBody}
            <div style = {{
                marginTop: 35,
                marginBottom: 40,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ColorButton 
                    brcolor = {BG_COLOR_WHITE}
                    bgcolor = {BG_COLOR_WHITE}
                    txtcolor = {BG_COLOR_WARNING}
                    hrcolor = {BG_COLOR_WHITE}
                    width = '146px'
                    height = '40px'
                    onClick={handleClose}
                  >
                    Cancel
                </ColorButton>
                <ColorButton 
                    brcolor = {BG_COLOR_BOUNDARY_BTN}
                    bgcolor = {BG_COLOR_BOUNDARY_BTN}
                    txtcolor = {BG_COLOR_WHITE}
                    hrcolor = {BG_COLOR_BOUNDARY_BTN}
                    width = '146px'
                    height = '40px'
                    onClick={handleClose}
                    style = {{marginLeft: 30}}
                  >
                    Save
                </ColorButton>
            </div>
          </div>
      </BootstrapDialog>
    </div>
    
  );
}

export default Subscription;

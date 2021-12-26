import React, { useState } from 'react';
import BasicInfoCard from "./basicinfo";
import { SHOWBAR_WIDTH } from '../../constant';
import Subscription from './subscription';
import TranactionHistory from './tranactionhistory';
import NeedHelp from './help';
import { makeStyles, withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { BG_COLOR_WHITE, BG_COLOR_BOUNDARY_BTN, BG_COLOR_BULE_LITTLE, BG_COLOR_WARNING } from '../../constant';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100vw - ${SHOWBAR_WIDTH}px - 10px)`,
    margin: '12px 12px',
    overflow: 'auto',
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

const changePasswordDialog = {
    title: 'Change Password',
    currentPassword: 'Enter Current Password',
    newPassword: 'Enter New Password',
    rePassword: 'Enter New Password',
}

export default function AccountSetting({siteInfo, clickedItem}) {
  const classes = useStyles();
    const [open, setOpen] = useState(false);
    const history = useNavigate();

    const changePassword = () => {
        setOpen(true);
    }
    const logOut = () => {
        history('/login');
    }

    const handleClose = () => {
        setOpen(false);
    };

    const changeBody = (
        <>
          <div style={{marginTop: 35}}>
              <p className={classes.contentTxt}>{changePasswordDialog.currentPassword}</p>
              <OutlinedInput className = {classes.input} type = 'password'/>
          </div>
          <div style={{marginTop: 24}}>
              <p className={classes.contentTxt}>{changePasswordDialog.newPassword}</p>
              <OutlinedInput className = {classes.input} type = 'password'/>
          </div>
          <div style={{marginTop: 24}}>
              <p className={classes.contentTxt}>{changePasswordDialog.rePassword}</p>
              <OutlinedInput className = {classes.input} type = 'password'/>
              {/* value={accountName} onChange={handleAccountName} */}
          </div>
        </>
    );
    
  return (
    <div className = {classes.root} >
        <BasicInfoCard />
        <Subscription />
        <TranactionHistory />
        <NeedHelp />

        {/* Dialog */}
        <BootstrapDialog
            classes={{ paper: classes.paper}}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <div className={classes.dialogContainer}>
                <div className={classes.dialogHeader}>
                    <div style={{fontSize: 18, fontWeight: 700}}>
                        {changePasswordDialog.title}
                    </div>
                </div>
            </div>
            <div className={classes.dialogContainer}>
                {changeBody}
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

        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <ColorButton 
                brcolor = {BG_COLOR_BULE_LITTLE}
                bgcolor = {BG_COLOR_WHITE}
                txtcolor = {BG_COLOR_BOUNDARY_BTN}
                hrcolor = {BG_COLOR_BULE_LITTLE}
                width = '164px'
                height = '45px'
                onClick={() => changePassword()}
            >
              Change Password
            </ColorButton>
            <ColorButton 
                brcolor = {BG_COLOR_BULE_LITTLE}
                bgcolor = {BG_COLOR_WHITE}
                txtcolor = {BG_COLOR_BOUNDARY_BTN}
                hrcolor = {BG_COLOR_BULE_LITTLE}
                width = '164px'
                height = '45px'
                onClick={() => logOut()}
            >
              Logout
            </ColorButton>
        </div>
    </div>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { APP_NAME } from '../constant';
import { useNavigate } from 'react-router-dom';

export default function PrimarySearchAppBar() {

  const pathName = window.location.pathname;
  const history = useNavigate();

  
  const accountClick = () => {
    history(`/showsite/accountsetting/`)
  }

  return (
    <>
    {pathName !== '/login' &&
      <Box>
        <AppBar position="static" style = {{backgroundColor: 'white', color: 'black'}}>
          <Toolbar>
            <Box sx={{display: {xs: 'flex', md: 'flex'}}} style = {{alignItems: 'center'}}>
              <a href = '/'><img style = {{width: '40px', marginRight: 5}} src = '/logo.png' alt = 'logo'/></a>
              <span>{APP_NAME}</span>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }} style = {{alignItems: 'center'}}>
              <Typography>Account Settings</Typography>
                <AccountCircle style={{marginLeft: 10}}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    }
    </>
    
  );
}

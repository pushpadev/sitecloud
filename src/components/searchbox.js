import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { BG_COLOR_BLACK, BG_COLOR_GRAY, BG_COLOR_WHITE } from '../constant';

const Search = styled('div')(({ theme }) => ({
    zIndex: 100,
    top: 84,
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: BG_COLOR_WHITE,
    '&:hover': {
      backgroundColor: BG_COLOR_GRAY,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
        display: 'none',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function SearchBox(){

    return (
        <Search>
            <SearchIconWrapper>
              <SearchIcon style = {{color: BG_COLOR_BLACK}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
    )
}
import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { ReactComponent as SearchIcon } from '../images/search.svg';


const useStyles = makeStyles({
  root: {
    width: 182,
    paddingLeft: 39,
    marginTop: 5
  },
});

export default function SearchBox() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id="input-with-icon-textfield"
        placeholder='Search'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </div>
  );
}
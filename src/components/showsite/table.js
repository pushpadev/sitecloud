import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from '@mui/styles';

import { ReactComponent as OnlineIcon } from '../../images/table/online.svg';
import { ReactComponent as OfflineIcon } from '../../images/table/offline.svg';
import { 
  CLICK_ATTENDENCE_DAILY, 
  CLICK_ATTENDENCE_LIVE, 
  CLICK_ATTENDENCE_HISTORY 
} from '../../constant';
import SearchBox from '../searchbox';

const useStyles = makeStyles({
    tableHeader: {
       height: 46,
       backgroundColor: '#FAFAFA',
       border: 'none',
    },
    tableRow: {
        height: 65,
        textAlign: 'center',  
    },
    name: {
        color: '#1875F0',
        fontWeight: 900,
        fontSize: 12,
        marginLeft: 27,
    },
    company: {
        color: '#33323D',
        fontWeight: 900,
        fontSize: 12,
    },
    normal: {
        color: '#33323D',
        fontWeight: 400,
        fontSize: 12,
    },

    avatar: {
        borderRadius: 27.5,
        width: 30, 
        objectFit: 'cover'
    },

    searchbar: {
      backgroundColor: '#FAFAFA',
      height: 46,
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '1px solid #DDE4EE',
    }
 });

function createData(imageId, name, company, worker, inducted, daily, timein, timeout, hours) {
  return {
    imageId,
    name,
    company,
    worker,
    inducted,
    daily,
    timein,
    timeout,
    hours
  };
}

const headCells = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'company',
      label: 'Company Name',
    },
    {
      id: 'worker',
      label: 'Worker/Visitor',
    },
    {
      id: 'inducted',
      label: 'Inducted',
    },
    {
      id: 'daily',
      label: 'Daily Prestart',
    },
    {
        id: 'timein',
        label: 'Time-In'
    },
    {
        id: 'timeout',
        label: 'Time-Out'
    },
    {
        id: 'hours',
        label: 'Hours On Site'
    },
  ];
  
const rows = [
  createData('1', 'Jane Cooper1', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
  createData('2', 'Jane Cooper2', 'CPB Contractors', 'Worker', true, false, '09:30 AM', '6:10PM', '08:30'),
  createData('3', 'Jane Cooper3', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
  createData('4', 'Jane Cooper4', 'CPB Contractors', 'Worker', false, true, '09:30 AM', '6:10PM', '08:30'),
  createData('5', 'Jane Cooper5', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
  createData('1', 'Jane Cooper6', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
  createData('3', 'Jane Cooper7', 'CPB Contractors', 'Worker', false, true, '09:30 AM', '6:10PM', '08:30'),
  createData('4', 'Jane Cooper8', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
  createData('5', 'Jane Cooper9', 'CPB Contractors', 'Worker', true, false, '09:30 AM', '6:10PM', '08:30'),
  createData('2', 'Jane Cooper10', 'CPB Contractors', 'Worker', true, true, '09:30 AM', '6:10PM', '08:30'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, clickedItem} =
        props;

    const classes = useStyles();

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {headCells.map((headCell, index) => {
          if(clickedItem === CLICK_ATTENDENCE_LIVE){
            if(index > 4)
              return <></>
          }
          if(clickedItem === CLICK_ATTENDENCE_DAILY){
            if(index > 6)
              return <></>
          }
          return(
              <TableCell
                key={headCell.id}
                align={'center'}
                // padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.searchbar}>
      <SearchBox />
    </div>
  )
}

export default function EnhancedTable({clickedItem}) {
    const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {clickedItem === CLICK_ATTENDENCE_HISTORY?<SearchBar></SearchBar>:<></>}
      <Box sx={{ width: '100%', boxShadow: 'none', border: 'none', overflow: 'auto'}}>
        <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none', border: 'none'}}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                clickedItem = {clickedItem}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        className={classes.tableRow}
                      >
                          <TableCell align="left">
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 28}}>
                                  <img src = {`/avatars/${row.imageId}.png`} alt='avatar' className={classes.avatar}/>
                                  <div className={classes.name}>{row.name}</div>
                              </div>
                          </TableCell>
                          <TableCell align="center"><div className={classes.company}>{row.company}</div></TableCell>
                          <TableCell align="center"><div className={classes.worker}>{row.worker}</div></TableCell>
                          <TableCell align="center">{row.inducted?<OnlineIcon/>:<OfflineIcon/>}</TableCell>
                          <TableCell align="center">{row.daily?<OnlineIcon/>:<OfflineIcon/>}</TableCell>
                          {(clickedItem === CLICK_ATTENDENCE_DAILY || clickedItem === CLICK_ATTENDENCE_HISTORY)?(
                            <>
                              <TableCell align="center"><div className={classes.normal}>{row.timein}</div></TableCell>
                              <TableCell align="center"><div className={classes.normal}>{row.timeout}</div></TableCell>
                            </>):(<></>)}
                          {(clickedItem === CLICK_ATTENDENCE_HISTORY)?(<TableCell align="center"><div className={classes.normal}>{row.hours}</div></TableCell>):(<></>)}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SHOW_SITE_BAR, SHOWBAR_WIDTH, SHOW_SITE_BAR_CHILD, BG_COLOR_BLACK, BG_COLOR_WHITE, BG_COLOR_BULE, BG_COLOR_BULE_LITTLE } from '../constant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../constant';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: '#33323d',
  backgroundColor: 'white',
  [`& .${treeItemClasses.content}`]: {
    color: '#33323d',
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    '&.MuiTreeItem-content': {
      padding: 0,
      margin: 0,
    },
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const rootItem = {
  nodeId: '0',
  icon: ArrowBackIcon,
}
export default function GmailTreeView({
  siteName,
  liveAttendenceClick,
  historyAttendenceClick,
  dailyAttendenceClick,
}) {
  const history = useNavigate();
  const handleClick = (txt) => {
    if (txt === CLICK_ATTENDENCE_LIVE)
      liveAttendenceClick();
    else {
      if (txt === CLICK_ATTENDENCE_DAILY)
        dailyAttendenceClick();
      else {
        if (txt === CLICK_ATTENDENCE_HISTORY) {
          historyAttendenceClick();
        }
        else {
          console.log('others');
        }
      }
    }

  }
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ width: SHOWBAR_WIDTH }}
      className='menubar_site'
    >
      <StyledTreeItem
        nodeId={rootItem.nodeId}
        labelText={siteName}
        labelIcon={rootItem.icon}
        color={BG_COLOR_WHITE}
        bgColor={BG_COLOR_BULE_LITTLE}
        onClick={() => history('/')}
      />
      {SHOW_SITE_BAR.map((item) => {
        return (
          <div key={item.lableText}>
            {item.nodeId === '2' ? (
              <StyledTreeItem nodeId={item.nodeId} labelText={item.lableText} labelIcon={item.icon} color={BG_COLOR_WHITE} bgColor={BG_COLOR_BULE}>
                {SHOW_SITE_BAR_CHILD.map((item, index) => {
                  return (
                    <StyledTreeItem
                      style={{ width: 244 }}
                      key={index}
                      nodeId={item.nodeId}
                      labelText={item.lableText}
                      labelIcon={item.icon}
                      color={BG_COLOR_WHITE}
                      bgColor={BG_COLOR_BULE_LITTLE}
                      onClick={() => handleClick(item.lableText)}
                    />
                  )
                })}
              </StyledTreeItem>
            ) : (
              <StyledTreeItem
                nodeId={item.nodeId}
                labelText={item.lableText}
                labelIcon={item.icon}
                color={BG_COLOR_WHITE}
                bgColor={BG_COLOR_BULE}
              />
            )}
          </div>
        )
      })}
    </TreeView>

  );
}

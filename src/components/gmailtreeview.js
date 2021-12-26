import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { 
  SHOW_SITE_BAR,
  SHOWBAR_WIDTH,
  SHOW_SITE_BAR_CHILD,
  BG_COLOR_WHITE,
  BG_COLOR_BULE,
  BG_COLOR_BULE_LITTLE,
  CLICK_MANAGE_SITE,
  CLICK_INDUCTIONS,
  CLICK_BRIEFING,
  CLICK_NOTICE,
  CLICK_WORK_METHOD,
  CLICK_PERMITS,
  CLICK_ATTENDENCE,
  CLICK_HAZARD,
} from '../constant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CLICK_ATTENDENCE_LIVE, CLICK_ATTENDENCE_DAILY, CLICK_ATTENDENCE_HISTORY } from '../constant';
import { useParams } from "react-router-dom";

const StyledTreeItemRoot = styled(TreeItem)(({ theme, ...props }) => ({
  color: '#33323D',
  // backgroundColor: 'white',
  [`& .${treeItemClasses.content}`]: {
    color: (props.active === 'true')? 'white': '#33323D',
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (props.active === 'true')?  BG_COLOR_BULE: 'white',
    '&.MuiTreeItem-content': {
      padding: 0,
      margin: 0,
    },
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      opacity: '.7',
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

const StyledChildTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: 'white',
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
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
      backgroundColor: `#CEE2FF`,
      color: '#1875F0',
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
    active,
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
      active={active}
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

function StyledChildTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledChildTreeItemRoot
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

StyledChildTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  active: PropTypes.bool
};

const rootItem = {
  nodeId: '0',
  icon: ArrowBackIcon,
}
export default function GmailTreeView({
  siteName
}) {
  
  const history = useNavigate();
  const { id } = useParams();
  const url = window.location.pathname;
  const [currentItem, setItem] = useState(CLICK_MANAGE_SITE);

  const handleClick = (txt) => {
    if(txt === CLICK_ATTENDENCE_LIVE)
      history(`/showsite/attendence/live/${id}`);
    else{
      if(txt === CLICK_ATTENDENCE_DAILY)
        history(`/showsite/attendence/daily/${id}`);
      else{
        if(txt === CLICK_ATTENDENCE_HISTORY){
          history(`/showsite/attendence/history/${id}`);
        }
        else{
          if(txt === CLICK_MANAGE_SITE){
            history(`/showsite/managesite/${id}`);
          }
          else{
            if(txt === CLICK_INDUCTIONS){
              history(`/showsite/inductions/${id}`);
            }
            else{
              if(txt === CLICK_BRIEFING){
                history(`/showsite/briefing/${id}`);
              }
              else{
                if(txt === CLICK_NOTICE){
                  history(`/showsite/notice/${id}`);
                }
                else{
                  if(txt === CLICK_WORK_METHOD){
                    history(`/showsite/workmethod/${id}`);
                  }
                  else{
                    if(txt === CLICK_PERMITS){
                      history(`/showsite/permits/${id}`);
                    }
                    else{
                      if(txt === CLICK_HAZARD){
                        history(`/showsite/hazard/${id}`);
                      }
                      else{
                        if(txt === CLICK_ATTENDENCE){
                          history(`/showsite/attendence/${id}`);
                        }
                        else{
                          console.log('others');
                        } 
                      } 
                    } 
                  } 
                } 
              } 
            } 
          }        
        }
      }
    }
  }

  useEffect(() => {
    if(url.indexOf('attendence') >= 0){
      setItem(CLICK_ATTENDENCE);
    }
    else{
      if(url.indexOf('managesite') >= 0){
        setItem(CLICK_MANAGE_SITE);
      }
      else{
        if(url.indexOf('inductions') >= 0){
          setItem(CLICK_INDUCTIONS);
        }
        else{
          if(url.indexOf('breifing') >= 0){
            setItem(CLICK_BRIEFING);
          }
          else{
            if(url.indexOf('notice') >= 0){
              setItem(CLICK_NOTICE);
            }
            else{
              if(url.indexOf('workmethod') >= 0){
                setItem(CLICK_WORK_METHOD);
              }
              else{
                if(url.indexOf('permits') >= 0){
                  setItem(CLICK_PERMITS);
                }
                else{
                  if(url.indexOf('hazard') >= 0){
                    setItem(CLICK_HAZARD);
                  }
                  else{
                    setItem('');
                  }
                }
              }
            }
          }
        }
      }
    }
  }, [url, id])

  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ width: SHOWBAR_WIDTH }}
    >
      <StyledTreeItem
        nodeId={rootItem.nodeId} 
        labelText= {siteName}
        labelIcon={rootItem.icon}
        color={BG_COLOR_WHITE}
        bgColor={BG_COLOR_BULE_LITTLE}
        onClick = {() => history('/')}
      />
      {SHOW_SITE_BAR.map((item) => {
        return (
          <div key = {item.lableText}>
            {item.nodeId === '2'?(
              <StyledTreeItem 
                nodeId={item.nodeId} 
                labelText={item.lableText} 
                labelIcon={item.icon} 
                color={BG_COLOR_WHITE} 
                bgColor={BG_COLOR_BULE}
                onClick = {() => handleClick(item.lableText)}
                active = {(item.lableText === currentItem)?'true':'false'}
              >
                {SHOW_SITE_BAR_CHILD.map((item, index) => {
                  return (
                    <StyledChildTreeItem
                      key = {index}
                      nodeId={item.nodeId}
                      labelText={item.lableText}
                      labelIcon={item.icon}
                      color={BG_COLOR_WHITE}
                      bgColor={BG_COLOR_BULE_LITTLE}
                      onClick = {() => handleClick(item.lableText)}
                    />
                  )
                })}
              </StyledTreeItem>
            ):(
              <StyledTreeItem
                nodeId={item.nodeId} 
                labelText={item.lableText} 
                labelIcon={item.icon}
                color={BG_COLOR_WHITE}
                bgColor={BG_COLOR_BULE}
                onClick = {() => handleClick(item.lableText)}
                active = {(item.lableText === currentItem)?'true':'false'}
              />
            )}
          </div>
        )
      })}
    </TreeView>
  );
}

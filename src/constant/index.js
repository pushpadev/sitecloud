import GroupsIcon from '@mui/icons-material/Groups';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Icon } from '@iconify/react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import LabelIcon from '@mui/icons-material/Label';
import HighlightIcon from '@mui/icons-material/Highlight';

export const APP_NAME = 'Site Management System';
export const SERVER_URL = 'https://vuvqkquws0.execute-api.ap-southeast-1.amazonaws.com/test/sitemap';
export const SITE_LIST = [
    {
        "data":{
            "polyrings":[],
            "markup":[],
            "Sitename":"Site Overview",
            "Siteaddress":"sdnn",
            "centroid":[-1.81747846041145,53.3233379650232],
            'worker': 12,
            'visitor': 13,
            'hazard': 23,
        },
        "sitemappingId":"1138fe25-21e2-4bad-8c11-ed201c4093fe"
    },
    {
        "data":{
            "polyrings":[],
            "markup":[],
            "Sitename":"Site One",
            "Siteaddress":"sdnn",
            "centroid":[-0.21747846041145,59.3233379650232],
            'worker': 12,
            'visitor': 13,
            'hazard': 23,
        },
        "sitemappingId":"1138fe25-21e2-4bad-8c11-ed201c4093ff"
    },
    {
        "data":{
            "polyrings":[],
            "markup":[],
            "Sitename":"Site Two",
            "Siteaddress":"sdnn",
            "centroid":[-1.5747846041145,60.3233379650232],
            'worker': 12,
            'visitor': 13,
            'hazard': 23,
        },
        "sitemappingId":"1138fe25-21e2-4bad-8c11-ed201c4093fd"
    },
    {
        "data":{
            "polyrings":[],
            "markup":[],
            "Sitename":"Site Third",
            "Siteaddress":"sdnn",
            "centroid":[-0.91747846041145,55.3233379650232],
            'worker': 12,
            'visitor': 13,
            'hazard': 23,
        },
        "sitemappingId":"1138fe25-21e2-4bad-8c11-ed201c4093fa"
    },
]
export const ICON_LIST = [
    {
        'id': 1,
        'value': 'Mustter Points',
        'icon':  <GroupsIcon />,
    },
    {
        'id': 2,
        'value': 'Entry',
        'icon':  <PrecisionManufacturingIcon />,
    },
    {
        'id': 3,
        'value': 'Parking',
        'icon':  <LocalParkingIcon />,
    },
    {
        'id': 4,
        'value': 'Hazards',
        'icon':  <Icon icon="mdi:radioactive" />,
    },
    {
        'id': 5,
        'value': 'Cross',
        'icon':  <AddTwoToneIcon />,
    },
    {
        'id': 6,
        'value': 'Stop',
        'icon':  <RemoveCircleOutlineTwoToneIcon />,
    },
    {
        'id': 7,
        'value': 'Add Label',
        'icon':  <LabelIcon />,
    },
    {
        'id': 8,
        'value': 'Highlight',
        'icon':  <HighlightIcon />,
    },

]
export const SAVE_MARKUP_MSG = 'Site markup will be visibile to workers and visitors on the mobile application';
export const SAVE_BOUNDARY_MSG = 'The site boundary must be a contained area';
export const SIDEBAR_WIDTH = 320;
export const ICONBAR_WIDTH = 180;

export const STATUS_NONE = -1;
export const BOUNDARY_NONE = 0;
export const BOUNDARY_SET = 1;
export const BOUNDARY_EDIT = 2;
export const BOUNDARY_DELETE = 3;
export const BOUNDARY_SAVE = 4;
export const BOUNDARY_CREATE = 10;


export const MARKUP_NONE = 5;
export const MARKUP_SET = 6;
export const MARKUP_EDIT = 7;
export const MARKUP_DELETE = 8;
export const MARKUP_SAVE= 9;
export const MARKUP_CREATE = 11;

export const BG_COLOR_WHITE = '#ffffff';
export const BG_COLOR_GRAY = '#aaafb8ef';
export const BG_COLOR_BULE = '#0066ffef';
export const BG_COLOR_BLACK = '#000000';

import { ReactComponent as MustterIcon } from '../images/markups/mustter.svg';
import { ReactComponent as EntryIcon } from '../images/markups/entry.svg';
import { ReactComponent as ParkingIcon } from '../images/markups/parking.svg';
import { ReactComponent as HazardsIcon } from '../images/markups/hazards.svg';
import { ReactComponent as CrossIcon } from '../images/markups/cross.svg';
import { ReactComponent as StopIcon } from '../images/markups/stop.svg';
import { ReactComponent as LabelIcon } from '../images/markups/label.svg';
import { ReactComponent as HighlightIcon } from '../images/markups/highlight.svg';

import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import MessageIcon from '@mui/icons-material/Message';
import DescriptionIcon from '@mui/icons-material/Description';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import UpdateIcon from '@mui/icons-material/Update';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


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
        'icon':  <MustterIcon />,
    },
    {
        'id': 2,
        'value': 'Entry',
        'icon':  <EntryIcon />,
    },
    {
        'id': 3,
        'value': 'Parking',
        'icon':  <ParkingIcon />,
    },
    {
        'id': 4,
        'value': 'Hazards',
        'icon':  <HazardsIcon />,
    },
    {
        'id': 5,
        'value': 'Cross',
        'icon':  <CrossIcon />,
    },
    {
        'id': 6,
        'value': 'Stop',
        'icon':  <StopIcon />,
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

export const MAP_VIEW = {
    data:{
        Sitename: 'Site Overview',
        Siteaddress: '12 Aughtie Dr, Albert Park VIC 3206, Australia',
    }
}

export const SHOW_SITE_BAR = [
    {
        nodeId: '1',
        lableText: 'Manage Site',
        icon: SettingsIcon,
    },
    {
        nodeId: '2',
        lableText: 'Attendence',
        icon: PersonIcon,
    },
    {
        nodeId: '3',
        lableText: 'Inductions',
        icon: PlaylistAddCheckIcon,
    },
    {
        nodeId: '4',
        lableText: 'Pre-Start and Daily Briefing',
        icon: InsertInvitationIcon,
    },
    {
        nodeId: '5',
        lableText: 'Safety and Notices',
        icon: MessageIcon,
    },
    {
        nodeId: '6',
        lableText: 'Safety Work Method Statements',
        icon: DescriptionIcon,
    },
    {
        nodeId: '7',
        lableText: 'Site Permits',
        icon: NoteAddIcon,
    },
    {
        nodeId: '8',
        lableText: 'Hazard and Issues',
        icon: ErrorOutlineIcon,
    },
   
]

export const SHOW_SITE_BAR_CHILD = [
    {
        nodeId: '9',
        lableText: 'Live Attendence',
        icon: AccessTimeIcon,
    },
    {
        nodeId: '10',
        lableText: 'Daily Attendence',
        icon: DateRangeIcon,
    },
    {
        nodeId: '11',
        lableText: 'Attendence History',
        icon: UpdateIcon,
    },
    {
        nodeId: '12',
        lableText: 'Manual Sign-In',
        icon: ExitToAppIcon,
    },
]

export const SAVE_MARKUP_MSG = 'Site markup will be visibile to workers and visitors on the mobile application';
export const SAVE_BOUNDARY_MSG = 'The site boundary must be a contained area';
export const SIDEBAR_WIDTH = 365;
export const SHOWBAR_WIDTH = 260;
export const ICONBAR_WIDTH = 230;

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
export const BG_COLOR_BLACK = '#413B5A';
export const BG_COLOR_BULE_LITTLE = '#CEE2FF';

export const MAP_CENTER_COORDINATE = [149.012375, -35.473469];

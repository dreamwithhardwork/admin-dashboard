import SellReqIcon from '../static/car.svg';
import MakeIcon from '../static/make.svg';
import BookingIcon from '../static/bookins.svg';
import {ListItemIcon,Typography,MenuItem} from '@material-ui/core';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import PeopleIcon from '@material-ui/icons/People';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import DashboardIcon from '@material-ui/icons/Dashboard'

export function Make() {
    return (
        <MenuItem >
            <ListItemIcon>
                <object className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" style={{color:"white"}} data={MakeIcon} type="image/svg+xml"> </object>
            </ListItemIcon>
            <Typography variant="inherit" >Make</Typography>
        </MenuItem>
    )
}

export function Dashboard() {
    return(
        <MenuItem className="MuiPaper-elevation10">  
        <ListItemIcon >
           <DashboardIcon fontSize="small" style={{color:"white"}}/>
        </ListItemIcon>
        <Typography>
            Dashboard
        </Typography>
        </MenuItem>
    )
}

export function Cars() {
    return (
        <MenuItem>
            <ListItemIcon>
                <DriveEtaIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>Cars</Typography>
        </MenuItem>
    )
}

export function Bikes() {
    return (
        <MenuItem>
            <ListItemIcon>
                <MotorcycleIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>Bikes </Typography>
        </MenuItem>
    )
}

export function Users() {
    return (
        <MenuItem>
            <ListItemIcon>
                <PeopleIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Users</Typography>
        </MenuItem>
    )
}

export function RTO() {
    return (
        <MenuItem>
            <ListItemIcon>
                <LocationOnIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap> RTO </Typography>
        </MenuItem>
    )
}

export function SellRequest() {
    return (
        <MenuItem>
            <ListItemIcon>
                <object className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" data={SellReqIcon} type="image/svg+xml"> </object>
            </ListItemIcon>
            <Typography variant="inherit" noWrap>Sell Requests</Typography>
        </MenuItem>
    )
}

export function BookingRequest() {
    return (
        <MenuItem>
            <ListItemIcon>
                <object className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" data={BookingIcon} type="image/svg+xml"> </object>
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
                Booking Requests
                   </Typography>
        </MenuItem>
    )
}

export function CarProperties() {
    return (
        <MenuItem>
            <ListItemIcon>
                <SettingsApplicationsIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
                Bike Properties
          </Typography>
        </MenuItem>
    )
}

export function BikeProperties() {
    return (
        <MenuItem>
            <ListItemIcon>
                <SettingsApplicationsIcon style={{color:"white"}} fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
                Car Properties
          </Typography>
        </MenuItem>
    )
}
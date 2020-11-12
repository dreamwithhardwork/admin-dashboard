import React, { useReducer } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';
import { connect } from 'react-redux';
import UserProfile from './userprofile';
import logo from '../../logo2.png';
import {reducer,initialState,ACTION_TYPES} from './headerService';
import SideNav from '../sidenav/sinenav';
import LoginForm from '../login/loginform';
import CustomizedSnackbars from '../messages/toastmessage';

function Header(props){
    const classes = useStyles();
    const [state, localDispatch] = useReducer(reducer,initialState);
    return(
        <div className={classes.root}>
            <AppBar color="default" position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" 
                    onClick = {() => {props.toggleSidenav()}}>
                        <MenuIcon />
                    </IconButton>
                    <Button><img style={{width:"140px",marginLeft:"5px"}} src={logo}></img></Button>
                    <Typography variant="h6" className={classes.title}></Typography>
                    {
                        props.login ? <UserProfile /> : <Button color="inherit" className={props.login ? classes.displayNone : classes.displayBlock} 
                        onClick = {() => localDispatch({type:ACTION_TYPES.LOGIN_OPEN})} >Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <CustomizedSnackbars />
            <LoginForm open = {state.loginOpen} close= {localDispatch}></LoginForm>
        </div>
    )
}

const mapDispatchToPros = (dispatch) => {
    return {
        logout: () => {
            dispatch({type:"LOGOUT"})
        },
        toggleSidenav: () => {
            dispatch({type:ACTION_TYPES.SIDENAVBAR})
        }
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps,mapDispatchToPros)(Header);
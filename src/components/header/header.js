import React, { useEffect, useReducer } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
//import LoginForm from './loginform';
import { useStyles } from './styles';
import { connect, useStore } from 'react-redux';
import UserProfile from './userprofile';
import logo from '../../logo2.png';
import {reducer,initialState,ACTION_TYPES} from './headerService';
import SideNav from '../sidenav/sinenav';
import LoginForm from '../login/loginform';
import CustomizedSnackbars from '../messages/toastmessage';

function Header(props){
    const classes = useStyles();
    const [state, localDispatch] = useReducer(reducer,initialState);
    const store = useStore();
    const rootState = store.getState();
    console.log("rendereeeeeee")
    return(
        <div className={classes.root}>
            <AppBar color="default" position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick = {() => {localDispatch({type:ACTION_TYPES.SIDENAVBAR})}}>
                        <MenuIcon  />
                    </IconButton>
                    <Button><img style={{width:"140px",marginLeft:"5px"}} src={logo}></img></Button>
                    <Typography variant="h6" className={classes.title}></Typography>
                    {
                        rootState.login ? <UserProfile store = {store} /> : <Button color="inherit" className={rootState.login ? classes.displayNone : classes.displayBlock} 
                        onClick = {() => localDispatch({type:ACTION_TYPES.LOGIN_OPEN})} >Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <LoginForm open = {state.loginOpen} close= {localDispatch}></LoginForm>
            <SideNav toggle = {state.sideNavOpen}/>
            <CustomizedSnackbars />
        </div>
    )
}

export default Header;
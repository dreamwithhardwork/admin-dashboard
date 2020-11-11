import React from 'react';
import {MenuList,Paper,Divider} from '@material-ui/core';
import { Make, Cars, Bikes, Users, RTO, SellRequest, BookingRequest,CarProperties,BikeProperties, Dashboard } from './sidenavicons';
import {Link, Route, Switch} from 'react-router-dom';
import {useStyles} from './styles';
import Makes from '../main/brand/make';
import Main from '../main/main';

function SideNav(props){
    const classes = useStyles();
    return(
        <div style={{display:"flex"}}>
        <Paper className={props.toggle?classes.open:classes.close}>
            <MenuList>
                <Link className={classes.decoration} to ="/"> <Dashboard/> </Link>
                <Link className={classes.decoration} to = "/make" > <Make /> </Link>
                <Link className={classes.decoration} to = "/cars" >  <Cars /> </Link>
                <Link className={classes.decoration} to = "/bikes" >  <Bikes /> </Link>
                <Divider/><Divider/><Divider/><Divider/>
                <Link className={classes.decoration} to = "/sellrequest" > <SellRequest /> </Link> 
                <BookingRequest />
                <Divider/>  <Divider/><Divider/><Divider/>
                <Link className={classes.decoration} to = "/users" > <Users /> </Link>
                <Divider/><Divider/>
                <Link className={classes.decoration} to = "/rto" > <RTO/> </Link>
                <Divider/><Divider/>
                <CarProperties></CarProperties>
                <BikeProperties></BikeProperties>
                <Divider/>
            </MenuList>
        </Paper>
        <Switch>
            
            <Route path="/make"> <Main/> </Route>
            <Route path="*"><UnderConstruction/></Route>
        </Switch>
        
        </div>
    )
}

function UnderConstruction(){
    return(
        <div style={{display:"flex",width:"100%",color:"red",backgroundColor:"lavenderblush",justifyContent:"center",alignItems:"center"}}>
           <h2>Get back after a while, this page is under construction...........</h2>
        </div>
    )
}

export default SideNav;
import React from 'react';
import {MenuList,Paper,Divider} from '@material-ui/core';
import { Make, Cars, Bikes, Users, RTO, SellRequest, BookingRequest,CarProperties,BikeProperties, Dashboard } from './sidenavicons';
import {Link} from 'react-router-dom';
import {useStyles} from './styles';

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
        </div>
    )
}

export default SideNav;